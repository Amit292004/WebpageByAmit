import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Video as VideoIcon, Play, ExternalLink, X } from "lucide-react";
import { Video } from "@shared/schema";
import { queryClient, getQueryFn } from "@/lib/queryClient";

// Helper function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  
  // Handle various YouTube URL formats
  const patterns = [
    // Standard watch URLs
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})(?:[\&\?].*)?/,
    // Short youtu.be URLs
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})(?:[\?].*)?/,
    // Embed URLs
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})(?:[\?].*)?/,
    // Short URLs with additional parameters
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})(?:[\?].*)?/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1] && match[1].length === 11) {
      return match[1];
    }
  }
  
  return null;
}

export default function Videos() {
  const [filters, setFilters] = useState({
    class: "all",
    subject: "all"
  });
  
  // State for video player modal
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    videoId: ""
  });

  const { data: videos, isLoading, error } = useQuery({
    queryKey: ["/api/videos", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') params.append(key, value);
      });
      
      // Use the queryClient's built-in fetch mechanism which already uses the API config
      return await queryClient.fetchQuery({
        queryKey: [`/api/videos?${params}`],
        queryFn: getQueryFn({ on401: "returnNull" })
      }) as Video[];
    }
  });

  const clearFilters = () => {
    setFilters({ class: "all", subject: "all" });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== "all");
  
  // Function to open video modal
  const openVideoModal = (youtubeUrl: string) => {
    const videoId = getYouTubeVideoId(youtubeUrl);
    if (videoId) {
      setVideoModal({
        isOpen: true,
        videoId
      });
    }
  };
  
  // Function to close video modal
  const closeVideoModal = () => {
    setVideoModal({
      isOpen: false,
      videoId: ""
    });
  };

  // Group videos by subject for the category display
  const videosBySubject = videos?.reduce((acc, video) => {
    if (!acc[video.subject]) {
      acc[video.subject] = [];
    }
    acc[video.subject].push(video);
    return acc;
  }, {} as Record<string, Video[]>) || {};

  const subjectCategories = [
    { name: "Mathematics", icon: "📐", color: "bg-pink-50 border-pink-200", count: videosBySubject["Mathematics"]?.length || 0 },
    { name: "Physics", icon: "📚", color: "bg-green-50 border-green-200", count: videosBySubject["Physics"]?.length || 0 },
    { name: "Chemistry", icon: "🌍", color: "bg-purple-50 border-purple-200", count: videosBySubject["Chemistry"]?.length || 0 },
    { name: "Biology", icon: "🧬", color: "bg-yellow-50 border-yellow-200", count: videosBySubject["Biology"]?.length || 0 },
    { name: "General", icon: "📝", color: "bg-blue-50 border-blue-200", count: videosBySubject["General"]?.length || 0 },
    { name: "Solved PYQs", icon: "✅", color: "bg-red-50 border-red-200", count: videosBySubject["Solved PYQs"]?.length || 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      {/* Video Player Modal */}
      {videoModal.isOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-black rounded-lg shadow-xl w-full max-w-4xl overflow-hidden">
            {/* Video player */}
            <div className="aspect-video w-full relative">
              {/* Close button */}
              <button 
                onClick={closeVideoModal}
                className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${videoModal.videoId}?autoplay=1&modestbranding=1&rel=0`}
                title="YouTube video player"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              
              {/* YouTube-style progress bar (decorative) */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                <div className="h-full bg-red-600 w-[13%]"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Concept Videos</h1>
          <p className="text-lg text-gray-600">Learn with carefully curated YouTube videos</p>
        </div>

        {/* Subject Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {subjectCategories.map((category) => (
            <Card key={category.name} className={`hover:shadow-md transition-shadow ${category.color}`}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.count} Videos</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Video Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                <Select value={filters.class} onValueChange={(value) => setFilters(prev => ({ ...prev, class: value }))}>
                  <SelectTrigger>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <Select value={filters.subject} onValueChange={(value) => setFilters(prev => ({ ...prev, subject: value }))}>
                  <SelectTrigger>
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
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Solved PYQs">Solved PYQs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              variant="ghost"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="text-gray-600 hover:text-primary"
            >
              <X className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading videos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <VideoIcon className="text-red-500 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to load videos</h3>
            <p className="text-gray-600 mb-6">Please try again or check your connection.</p>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Retry Loading
            </Button>
          </div>
        ) : !videos || videos.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <VideoIcon className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or check back later for new content.</p>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  {/* Video Thumbnail with Player UI */}
                  <div className="aspect-video bg-gray-200 relative">
                    <div 
                      onClick={() => openVideoModal(video.youtubeUrl)}
                      className="block w-full h-full cursor-pointer"
                    >
                      {video.thumbnailUrl ? (
                        <img 
                          src={video.thumbnailUrl} 
                          alt={video.title || "Video thumbnail"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // If the thumbnail fails to load, extract video ID and try a different format
                            const target = e.target as HTMLImageElement;
                            const currentSrc = target.src;
                            if (currentSrc.includes('maxresdefault.jpg')) {
                              // Try mqdefault instead
                              target.src = currentSrc.replace('maxresdefault.jpg', 'mqdefault.jpg');
                            } else if (currentSrc.includes('mqdefault.jpg')) {
                              // Try hqdefault instead
                              target.src = currentSrc.replace('mqdefault.jpg', 'hqdefault.jpg');
                            } else if (currentSrc.includes('hqdefault.jpg')) {
                              // Try default instead
                              target.src = currentSrc.replace('hqdefault.jpg', 'default.jpg');
                            } else {
                              // If all else fails, show the fallback
                              target.onerror = null; // Prevent infinite loop
                              target.style.display = 'none';
                              const fallback = target.parentNode as HTMLElement;
                              if (fallback) {
                                const div = document.createElement('div');
                                div.className = 'w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/40';
                                div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-12 h-12 text-primary"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>';
                                fallback.appendChild(div);
                              }
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/40">
                          <VideoIcon className="w-12 h-12 text-primary" />
                        </div>
                      )}
                    </div>
                    
                    {/* Duration display in top-right corner */}
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration ? `${video.duration}:00` : '0:00'}
                    </div>
                    
                    {/* Play Button Overlay - Only show when not playing */}
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openVideoModal(video.youtubeUrl);
                        }}
                        className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors pointer-events-auto"
                      >
                        <Play className="w-8 h-8 text-white ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      Class {video.class}-{video.subject}
                    </Badge>
                    {video.category && (
                      <Badge variant="outline" className="text-xs">
                        {video.category}
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title || "Untitled Video"}</h3>
                  
                  {video.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{video.description}</p>
                  )}
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-500">{video.views || "1"} views</div>
                    <div className="text-sm text-gray-500">{video.uploadDate || "23/7/2025"}</div>
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <a 
                      href="https://youtube.com/@BounceBackAcademy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-800 text-sm flex items-center"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Subscribe now
                    </a>
                    <button 
                      onClick={() => openVideoModal(video.youtubeUrl)}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Watch on YouTube
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
