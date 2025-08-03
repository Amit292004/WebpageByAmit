import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Search, X, LogIn } from "lucide-react";
import { QuestionPaper } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";

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
    "7": { 
      bg: "bg-indigo-100", 
      text: "text-indigo-800", 
      hover: "hover:bg-indigo-200", 
      border: "border-indigo-300", 
      shadow: "shadow-indigo-100",
      gradient: "bg-gradient-to-r from-indigo-400 to-indigo-600",
      glow: "shadow-[0_0_15px_rgba(99,102,241,0.5)]",
      animation: "animate-pulse"
    },
    "6": { 
      bg: "bg-yellow-100", 
      text: "text-yellow-800", 
      hover: "hover:bg-yellow-200", 
      border: "border-yellow-300", 
      shadow: "shadow-yellow-100",
      gradient: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      glow: "shadow-[0_0_15px_rgba(234,179,8,0.5)]",
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

// Function to get phase badge color
const getPhaseBadgeColor = (phase: string) => {
  const phaseMap: Record<string, { 
    bg: string, 
    text: string, 
    border: string, 
    gradient: string, 
    shadow: string,
    glow: string,
    animation: string,
    hoverEffect: string
  }> = {
    "Phase 1": { 
      bg: "bg-blue-50", 
      text: "text-blue-700", 
      border: "border-blue-300", 
      gradient: "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600", 
      shadow: "shadow-blue-100",
      glow: "shadow-[0_0_15px_rgba(59,130,246,0.5)]",
      animation: "animate-pulse",
      hoverEffect: "hover:scale-105 hover:rotate-1"
    },
    "Phase 2": { 
      bg: "bg-purple-50", 
      text: "text-purple-700", 
      border: "border-purple-300", 
      gradient: "bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600", 
      shadow: "shadow-purple-100",
      glow: "shadow-[0_0_15px_rgba(147,51,234,0.5)]",
      animation: "animate-pulse",
      hoverEffect: "hover:scale-105 hover:rotate-1"
    },
    "Board Exam": { 
      bg: "bg-red-50", 
      text: "text-red-700", 
      border: "border-red-300", 
      gradient: "bg-gradient-to-r from-red-500 via-red-400 to-red-600", 
      shadow: "shadow-red-100",
      glow: "shadow-[0_0_15px_rgba(239,68,68,0.5)]",
      animation: "animate-pulse",
      hoverEffect: "hover:scale-105 hover:rotate-1"
    },
  };
  
  return phaseMap[phase] || { 
    bg: "bg-white", 
    text: "text-gray-700", 
    border: "border-gray-300", 
    gradient: "bg-gradient-to-r from-primary via-blue-400 to-accent", 
    shadow: "shadow-gray-100",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    animation: "animate-pulse",
    hoverEffect: "hover:scale-105 hover:rotate-1"
  };
};

export default function QuestionPapers() {
  const [filters, setFilters] = useState({
    class: "all",
    subject: "all",
    year: "all",
    phase: "all"
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

  const { data: papers, isLoading, error, refetch } = useQuery({
    queryKey: ["/api/question-papers", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "all") params.append(key, value);
      });
      
      try {
        // Use the apiRequest function which handles authentication and errors
        const response = await apiRequest("GET", `/api/question-papers?${params}`, undefined);
        const data = await response.json();
        return data as QuestionPaper[];
      } catch (err) {
        console.error("Error fetching question papers:", err);
        throw new Error(err instanceof Error ? err.message : "Failed to fetch question papers");
      }
    },
    retry: 1,
    retryDelay: 1000
  });
  
  // Function to handle downloads
  const handleDownload = async (paperId: string, fileUrl: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to download question papers",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }
    
    try {
      // Use the authenticated download endpoint
      const response = await apiRequest("GET", `/api/question-papers/download/${paperId}`, undefined);
      const data = await response.json();
      
      // Make sure the URL is absolute
      const absoluteUrl = data.fileUrl.startsWith('http') 
        ? data.fileUrl 
        : window.location.origin + data.fileUrl;
      
      console.log('Download URL:', absoluteUrl);
      
      // Create download link
      const a = document.createElement('a');
      a.href = absoluteUrl;
      a.download = data.fileUrl.split('/').pop() || 'document.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download Failed",
        description: "Failed to download the file. Please try again.",
        variant: "destructive"
      });
    }
  };

  const clearFilters = () => {
    setFilters({ class: "all", subject: "all", year: "all", phase: "all" });
  };

  const applyFilters = () => {
    // Filters are automatically applied via the useQuery dependency
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== "all");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="bg-white rounded-lg p-5 shadow-md">
              <FileText className="h-12 w-12 text-blue-500 mx-auto" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-blue-500 mb-4">Question Papers</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Browse and download NBSE previous year question papers for your exam preparation</p>
        </div>

        {/* Filters */}
        <Card className="mb-10 border border-blue-200 shadow-lg rounded-xl overflow-hidden">
          <div className="bg-blue-50 px-6 py-4 border-b border-blue-200">
            <h2 className="text-xl font-semibold text-blue-600 flex items-center">
              <Search className="w-6 h-6 mr-3 text-blue-500" />
              <span>Filter Question Papers</span>
            </h2>
          </div>
          <CardContent className="p-6 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Social Science">Social Science</SelectItem>
                    <SelectItem value="EVS">EVS</SelectItem>
                    <SelectItem value="FIT">FIT</SelectItem>
                    <SelectItem value="ITES">ITES</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Alternative English">Alternative English</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Book Keeping">Book Keeping</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <Select value={filters.year} onValueChange={(value) => setFilters(prev => ({ ...prev, year: value }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="2016">2016</SelectItem>
                    <SelectItem value="2017">2017</SelectItem>
                    <SelectItem value="2018">2018</SelectItem>
                    <SelectItem value="2019">2019</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                    <SelectItem value="2028">2028</SelectItem>
                    <SelectItem value="2029">2029</SelectItem>
                    <SelectItem value="2030">2030</SelectItem>
                    <SelectItem value="2031">2031</SelectItem>
                    <SelectItem value="2032">2032</SelectItem>
                    <SelectItem value="2033">2033</SelectItem>
                    <SelectItem value="2034">2034</SelectItem>
                    <SelectItem value="2035">2035</SelectItem>
                    <SelectItem value="2036">2036</SelectItem>
                    <SelectItem value="2037">2037</SelectItem>
                    <SelectItem value="2038">2038</SelectItem>
                    <SelectItem value="2039">2039</SelectItem>
                    <SelectItem value="2040">2040</SelectItem>
                    <SelectItem value="2041">2041</SelectItem>
                    <SelectItem value="2042">2042</SelectItem>
                    <SelectItem value="2043">2043</SelectItem>
                    <SelectItem value="2044">2044</SelectItem>
                    <SelectItem value="2045">2045</SelectItem>
                    <SelectItem value="2046">2046</SelectItem>
                    <SelectItem value="2047">2047</SelectItem>
                    <SelectItem value="2048">2048</SelectItem>
                    <SelectItem value="2049">2049</SelectItem>
                    <SelectItem value="2050">2050</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">Phase</label>
                <Select value={filters.phase} onValueChange={(value) => setFilters(prev => ({ ...prev, phase: value }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Phases" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Phases</SelectItem>
                    <SelectItem value="Phase 1">Phase 1</SelectItem>
                    <SelectItem value="Phase 2">Phase 2</SelectItem>
                    <SelectItem value="Board Exam">Board Exam</SelectItem>
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
                className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
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
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-4 border-transparent border-t-blue-400 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-4 border-4 border-transparent border-t-blue-300 rounded-full animate-spin-slower"></div>
              <FileText className="absolute inset-0 m-auto w-8 h-8 text-blue-500 animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-blue-600 mb-2">Loading Question Papers</h3>
            <p className="text-gray-600 max-w-md mx-auto">Please wait while we fetch the latest question papers for you...</p>
            <div className="mt-4 max-w-xs mx-auto bg-blue-50 rounded-lg p-3 border border-blue-100">
              <p className="text-sm text-blue-700">Applying filters: {Object.entries(filters).filter(([_, v]) => v !== 'all').map(([k, v]) => `${k}: ${v}`).join(', ') || 'None'}</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 text-red-500">
              <FileText className="w-full h-full" />
            </div>
            <h3 className="text-xl font-bold text-red-600 mb-2">Failed to Load Question Papers</h3>
            <p className="text-gray-600 mb-6">We encountered an error while loading the question papers. Please try again or adjust your filters.</p>
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <p className="text-sm text-red-700">
                {error instanceof Error ? error.message : "Unknown error occurred"}
              </p>
            </div>
            <Button onClick={() => refetch()} className="bg-blue-600 hover:bg-blue-700 text-white">
              Retry Loading
            </Button>
          </div>
        ) : !papers || papers.length === 0 ? (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-50 rounded-full flex items-center justify-center border-2 border-gray-200">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-3">No Question Papers Found</h3>
            <p className="text-gray-600 mb-6">We couldn't find any question papers matching your current filters. Try adjusting your filters or clear them to see all available papers.</p>
            
            {hasActiveFilters && (
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-700 mb-2">Active Filters:</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {Object.entries(filters).map(([key, value]) => {
                    if (value !== 'all') {
                      return (
                        <Badge key={key} className="bg-white border border-blue-200 text-blue-700 px-3 py-1">
                          {key}: {value}
                          <button 
                            className="ml-2 text-blue-500 hover:text-blue-700"
                            onClick={() => setFilters(prev => ({ ...prev, [key]: 'all' }))}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}
            
            <div className="flex gap-4 justify-center">
              <Button onClick={clearFilters} className="border border-blue-500 text-blue-600 hover:bg-blue-50">
                <X className="w-4 h-4 mr-2" />
                <span>Clear All Filters</span>
              </Button>
              <Button 
                onClick={() => setFilters({ class: "all", subject: "all", year: "all", phase: "all" })}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Search className="w-4 h-4 mr-2" />
                <span>Show All Papers</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {papers.map((paper) => {
              const classColors = getClassBadgeColor(paper.class.toString());
              const phaseColors = getPhaseBadgeColor(paper.phase);
              
              return (
                <Card key={paper.id} className={`overflow-hidden border ${classColors.border} rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01]`}>
                  <div className={`h-2 ${classColors.gradient}`}></div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={`${classColors.bg} ${classColors.text} border ${classColors.border} px-2 py-1 rounded-md`}>
                        Class {paper.class}
                      </Badge>
                      <Badge className={`${phaseColors.bg} ${phaseColors.text} border ${phaseColors.border} px-2 py-1 rounded-md`}>
                        {paper.phase}
                      </Badge>
                    </div>
                    
                    <h3 className="font-bold text-lg text-gray-800 mb-4">{paper.title}</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center text-sm p-2 rounded-md bg-gray-50">
                        <span className="font-medium text-gray-600">Subject:</span>
                        <span className="font-semibold text-gray-800">{paper.subject}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm p-2 rounded-md bg-gray-50">
                        <span className="font-medium text-gray-600">Year:</span>
                        <span className="font-semibold text-gray-800">{paper.year}</span>
                      </div>
                      <div className={`flex justify-between items-center text-sm p-2 rounded-md ${phaseColors.bg} bg-opacity-20`}>
                        <span className="font-medium text-gray-600">Phase:</span>
                        <span className={`font-semibold ${phaseColors.text}`}>{paper.phase}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="outline"
                        className={`flex items-center justify-center ${classColors.border} ${classColors.text} ${classColors.hover}`}
                        onClick={() => handleDownload(paper.id, paper.fileUrl)}
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
                        onClick={() => window.open(`/view-pdf?url=${encodeURIComponent(paper.fileUrl)}&id=${paper.id}&type=question-paper`, '_self')}
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
