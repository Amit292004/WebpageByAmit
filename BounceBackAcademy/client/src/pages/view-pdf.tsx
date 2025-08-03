import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, FileText, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export default function ViewPDF() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fileId, setFileId] = useState<string | null>(null);

  useEffect(() => {
    // Parse the URL to get the PDF URL and file ID from the query parameter
    const searchParams = new URLSearchParams(window.location.search);
    const url = searchParams.get('url');
    const id = searchParams.get('id');
    const type = searchParams.get('type');
    
    if (!url) {
      setError('No PDF URL provided');
      setLoading(false);
      return;
    }

    // Set the PDF URL and file ID
    setPdfUrl(url);
    setFileId(id);
    setLoading(false);
    
    // Check if user is authenticated
    const userAuth = localStorage.getItem("userAuth");
    if (userAuth) {
      try {
        const auth = JSON.parse(userAuth);
        if (auth.id) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error parsing user auth", error);
        localStorage.removeItem("userAuth");
      }
    }
  }, []);

  const handleDownload = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to download this document",
        variant: "destructive"
      });
      setLocation("/login");
      return;
    }
    
    if (pdfUrl && fileId) {
      try {
        // Determine the endpoint based on URL pattern
        let endpoint = "";
        const searchParams = new URLSearchParams(window.location.search);
        const type = searchParams.get('type');
        
        if (type === "question-paper") {
          endpoint = `/api/question-papers/download/${fileId}`;
        } else if (type === "note") {
          endpoint = `/api/notes/download/${fileId}`;
        } else {
          // If type is not specified, try to determine from URL
          if (pdfUrl.includes('question-papers')) {
            endpoint = `/api/question-papers/download/${fileId}`;
          } else if (pdfUrl.includes('notes')) {
            endpoint = `/api/notes/download/${fileId}`;
          } else {
            // Fallback to direct download if we can't determine the type
            // Make sure the URL is absolute
            const absoluteUrl = pdfUrl.startsWith('http') 
              ? pdfUrl 
              : window.location.origin + pdfUrl;
            
            console.log('Direct download URL:', absoluteUrl);
            
            const a = document.createElement('a');
            a.href = absoluteUrl;
            a.download = pdfUrl.split('/').pop() || 'document.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            return;
          }
        }
        
        // Use the authenticated download endpoint
        const response = await apiRequest("GET", endpoint, undefined);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        console.log('Download URL:', url);
        
        // Create download link
        const a = document.createElement('a');
        a.href = url;
        a.download = endpoint.split('/').pop() || 'document.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (error) {
        console.error('Download error:', error);
        toast({
          title: "Download Failed",
          description: "Please login to download this document",
          variant: "destructive"
        });
        setLocation("/login");
      }
    } else if (pdfUrl) {
      // Fallback for when we have URL but no ID
      try {
        // Make sure the URL is absolute
        const absoluteUrl = pdfUrl.startsWith('http') 
          ? pdfUrl 
          : window.location.origin + pdfUrl;
        
        console.log('Fallback download URL:', absoluteUrl);
        
        const a = document.createElement('a');
        a.href = absoluteUrl;
        a.download = pdfUrl.split('/').pop() || 'document.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.error('Download error:', error);
        toast({
          title: "Download Failed",
          description: "There was an error downloading the document",
          variant: "destructive"
        });
      }
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading PDF</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={handleBack} className="bg-primary hover:bg-primary/90 text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-3 sm:p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex justify-between items-center">
          <Button variant="ghost" onClick={handleBack} className="flex items-center text-sm sm:text-base">
            <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
            Back
          </Button>
          <Button onClick={handleDownload} className="bg-primary hover:bg-primary/90 text-white text-sm sm:text-base">
            {isAuthenticated ? (
              <>
                <Download className="w-4 h-4 mr-1 sm:mr-2" />
                Download
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-1 sm:mr-2" />
                Login to Download
              </>
            )}
          </Button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-grow w-full p-4 flex flex-col items-center justify-center">
        {pdfUrl ? (
          <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-gray-100 border-b flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary mr-2" />
              <span className="font-medium">PDF Document</span>
            </div>
            <div className="p-4 text-center">
              <p className="mb-4">The PDF is ready to view or download.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={() => {
                    // Make sure the URL is absolute
                    const absoluteUrl = pdfUrl.startsWith('http') 
                      ? pdfUrl 
                      : window.location.origin + pdfUrl;
                    window.open(absoluteUrl, '_self');
                  }} 
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Open PDF
                </Button>
                <Button 
                  onClick={handleDownload} 
                  className="bg-accent hover:bg-accent/90 text-white"
                >
                  {isAuthenticated ? (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Login to Download
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}