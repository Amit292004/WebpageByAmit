import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Search, X, BookOpen, LogIn } from "lucide-react";
import { Notes } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { apiRequest, queryClient, getQueryFn } from "@/lib/queryClient";

// Function to get class badge color based on class number
const getClassBadgeColor = (classNum: string) => {
  const colorMap: Record<string, { 
    bg: string, 
    text: string, 
    hover: string, 
    border: string, 
    shadow: string,
    gradient: string,
    glow: string,
    animation: string
  }> = {
    "10": { 
      bg: "bg-blue-100", 
      text: "text-blue-800", 
      hover: "hover:bg-blue-200", 
      border: "border-blue-300", 
      shadow: "shadow-blue-100",
      gradient: "bg-gradient-to-r from-blue-400 to-blue-600",
      glow: "shadow-[0_0_15px_rgba(59,130,246,0.5)]",
      animation: "animate-pulse"
    },
    "11": { 
      bg: "bg-purple-100", 
      text: "text-purple-800", 
      hover: "hover:bg-purple-200", 
      border: "border-purple-300", 
      shadow: "shadow-purple-100",
      gradient: "bg-gradient-to-r from-purple-400 to-purple-600",
      glow: "shadow-[0_0_15px_rgba(147,51,234,0.5)]",
      animation: "animate-pulse"
    },
    "12": { 
      bg: "bg-green-100", 
      text: "text-green-800", 
      hover: "hover:bg-green-200", 
      border: "border-green-300", 
      shadow: "shadow-green-100",
      gradient: "bg-gradient-to-r from-green-400 to-green-600",
      glow: "shadow-[0_0_15px_rgba(22,163,74,0.5)]",
      animation: "animate-pulse"
    },
    "9": { 
      bg: "bg-orange-100", 
      text: "text-orange-800", 
      hover: "hover:bg-orange-200", 
      border: "border-orange-300", 
      shadow: "shadow-orange-100",
      gradient: "bg-gradient-to-r from-orange-400 to-orange-600",
      glow: "shadow-[0_0_15px_rgba(249,115,22,0.5)]",
      animation: "animate-pulse"
    },
    "8": { 
      bg: "bg-pink-100", 
      text: "text-pink-800", 
      hover: "hover:bg-pink-200", 
      border: "border-pink-300", 
      shadow: "shadow-pink-100",
      gradient: "bg-gradient-to-r from-pink-400 to-pink-600",
      glow: "shadow-[0_0_15px_rgba(236,72,153,0.5)]",
      animation: "animate-pulse"
    },
  };
  
  return colorMap[classNum] || { 
    bg: "bg-gray-100", 
    text: "text-gray-800", 
    hover: "hover:bg-gray-200", 
    border: "border-gray-300", 
    shadow: "shadow-gray-100",
    gradient: "bg-gradient-to-r from-primary to-accent",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.5)]",
    animation: "animate-pulse"
  };
};

export default function NotesPage() {
  const [filters, setFilters] = useState({
    class: "all",
    subject: "all"
  });
  
  const [appliedFilters, setAppliedFilters] = useState({
    class: "all",
    subject: "all"
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const [, navigate] = useLocation();

  // Check if user is authenticated
  useEffect(() => {
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

  const { data: notes, isLoading, error, refetch } = useQuery({
    queryKey: ["/api/notes", appliedFilters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(appliedFilters).forEach(([key, value]) => {
        if (value && value !== "all") params.append(key, value);
      });
      
      // Use the queryClient's built-in fetch mechanism which already uses the API config
      return await queryClient.fetchQuery({
        queryKey: [`/api/notes?${params}`],
        queryFn: getQueryFn({ on401: "returnNull" })
      }) as Notes[];
    }
  });
  
  // Function to handle downloads
  const handleDownload = async (noteId: string, fileUrl: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to download notes",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }
    
    try {
      // Use the authenticated download endpoint
      const response = await apiRequest("GET", `/api/notes/download/${noteId}`, undefined);
      const data = await response.json();
      
      // Create download link
      const a = document.createElement('a');
      a.href = data.fileUrl;
      a.download = fileUrl.split('/').pop() || 'document.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download Failed",
        description: "Please login to download notes",
        variant: "destructive"
      });
      navigate("/login");
    }
  };

  const clearFilters = () => {
    setFilters({ class: "all", subject: "all" });
    setAppliedFilters({ class: "all", subject: "all" });
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
    refetch();
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== "all");

  // Load notes on initial render
  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="bg-white rounded-lg p-5 shadow-md">
              <BookOpen className="h-12 w-12 text-green-500 mx-auto" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-green-500 mb-4">Study Notes</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Access comprehensive study notes for all subjects to enhance your learning</p>
        </div>

        {/* Filters */}
        <Card className="mb-10 border border-green-200 shadow-lg rounded-xl overflow-hidden">
          <div className="bg-green-50 px-6 py-4 border-b border-green-200">
            <h2 className="text-xl font-semibold text-green-600 flex items-center">
              <Search className="w-6 h-6 mr-3 text-green-500" />
              <span>Filter Notes</span>
            </h2>
          </div>
          <CardContent className="p-6 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                <Select value={filters.class} onValueChange={(value) => setFilters(prev => ({ ...prev, class: value }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Classes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="8">Class 8</SelectItem>
                    <SelectItem value="9">Class 9</SelectItem>
                    <SelectItem value="10">Class 10</SelectItem>
                    <SelectItem value="11">Class 11</SelectItem>
                    <SelectItem value="12">Class 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <Select value={filters.subject} onValueChange={(value) => setFilters(prev => ({ ...prev, subject: value }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Social Science">Social Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
              <Button
                variant="ghost"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className="text-gray-600 hover:text-primary w-full sm:w-auto border border-gray-300 hover:border-primary/50"
              >
                <X className="w-4 h-4 mr-2" />
                <span>Clear Filters</span>
              </Button>
              <Button 
                onClick={applyFilters} 
                className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
              >
                <Search className="w-4 h-4 mr-2" />
                <span>Apply Filters</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-t-green-500 border-green-200 rounded-full animate-spin"></div>
            <h3 className="text-xl font-bold text-green-600 mb-2">Loading Notes</h3>
            <p className="text-gray-600">Please wait while we fetch the latest study notes for you...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 text-red-500">
              <FileText className="w-full h-full" />
            </div>
            <h3 className="text-xl font-bold text-red-600 mb-2">Failed to Load Notes</h3>
            <p className="text-gray-600 mb-6">We encountered an error while loading the notes. Please try again or adjust your filters.</p>
            <Button onClick={applyFilters} className="bg-green-600 hover:bg-green-700 text-white">
              Retry Loading
            </Button>
          </div>
        ) : !notes || notes.length === 0 ? (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-500">
              <Search className="w-full h-full" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No Notes Found</h3>
            <p className="text-gray-600 mb-6">We couldn't find any notes matching your current filters. Try adjusting your filters or clear them to see all available notes.</p>
            <Button onClick={clearFilters} className="border border-green-500 text-green-600 hover:bg-green-50">
              <X className="w-4 h-4 mr-2" />
              <span>Clear All Filters</span>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => {
              const classColors = getClassBadgeColor(String(note.class));
              
              return (
                <Card key={note.id} className={`overflow-hidden border ${classColors.border} rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01]`}>
                  <div className={`h-2 ${classColors.gradient}`}></div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={`${classColors.bg} ${classColors.text} border ${classColors.border} px-2 py-1 rounded-md`}>
                        Class {note.class}
                      </Badge>
                    </div>
                    
                    <h3 className="font-bold text-lg text-gray-800 mb-4">{note.title}</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center text-sm p-2 rounded-md bg-gray-50">
                        <span className="font-medium text-gray-600">Subject:</span>
                        <span className="font-semibold text-gray-800">{note.subject}</span>
                      </div>
                      <div className="p-2 rounded-md bg-gray-50">
                        <p className="text-sm text-gray-700">{note.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="outline"
                        className={`flex items-center justify-center ${classColors.border} ${classColors.text} ${classColors.hover}`}
                        onClick={() => handleDownload(note.id, note.fileUrl)}
                      >
                        {isAuthenticated ? (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            <span>Download</span>
                          </>
                        ) : (
                          <>
                            <LogIn className="w-4 h-4 mr-2" />
                            <span>Login to Download</span>
                          </>
                        )}
                      </Button>
                      <Button 
                        className={`flex items-center justify-center ${classColors.gradient} text-white hover:opacity-90`}
                        onClick={() => window.open(`/view-pdf?url=${encodeURIComponent(note.fileUrl)}&id=${note.id}&type=note`, '_self')}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        <span>View</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}