import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { Star, MessageSquare, Users, TrendingUp, Send } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Feedback } from "@shared/schema";

interface Stats {
  totalPapers: number;
  totalVideos: number;
  totalUsers: number;
  totalFeedback: number;
}

const feedbackSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters"),
  rating: z.number().min(1).max(5),
});

type FeedbackForm = z.infer<typeof feedbackSchema>;

export default function FeedbackPage() {
  const { toast } = useToast();
  const [selectedRating, setSelectedRating] = useState(0);

  const form = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      rating: 0,
    },
  });

  // Fetch feedback and stats
  const { data: feedback = [], isLoading: feedbackLoading } = useQuery<Feedback[]>({
    queryKey: ["/api/feedback"],
  });

  const { data: stats = { totalPapers: 0, totalVideos: 0, totalUsers: 0, totalFeedback: 0 } } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  // Submit feedback mutation
  const submitFeedbackMutation = useMutation({
    mutationFn: async (data: FeedbackForm) => {
      return await apiRequest("POST", "/api/feedback", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/feedback"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      toast({
        title: "Feedback submitted!",
        description: "Thank you for your valuable feedback.",
      });
      form.reset();
      setSelectedRating(0);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit feedback",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FeedbackForm) => {
    if (selectedRating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a star rating",
        variant: "destructive",
      });
      return;
    }
    submitFeedbackMutation.mutate({ ...data, rating: selectedRating });
  };

  // Calculate feedback statistics
  const feedbackStats = feedback ? {
    totalFeedback: feedback.length,
    averageRating: feedback.reduce((acc: number, item: Feedback) => acc + (item.rating || 0), 0) / feedback.filter((item: Feedback) => item.rating).length,
    ratingDistribution: [1, 2, 3, 4, 5].map(rating => 
      feedback.filter((item: Feedback) => item.rating === rating).length
    )
  } : null;

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Feedback Matters</h1>
          <p className="text-lg text-gray-600">Help us improve Bounce Back Academy for all students</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Share Your Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email (Optional)</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Star Rating */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Rating *</Label>
                      <div className="flex items-center gap-2 mb-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => {
                              setSelectedRating(rating);
                              form.setValue("rating", rating);
                            }}
                            className={`text-2xl transition-colors ${
                              rating <= selectedRating ? "text-yellow-400" : "text-gray-300"
                            } hover:text-yellow-400`}
                          >
                            <Star className="w-6 h-6 fill-current" />
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {selectedRating > 0 && `${selectedRating} star${selectedRating !== 1 ? 's' : ''}`}
                        </span>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Feedback *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Share your thoughts, suggestions, or experiences with Bounce Back Academy..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                      disabled={submitFeedbackMutation.isPending}
                    >
                      {submitFeedbackMutation.isPending ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Feedback
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Statistics Sidebar */}
          <div className="space-y-6">
            {/* Overall Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Feedback Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{stats.totalFeedback || 0}</div>
                  <div className="text-sm text-gray-600">Total Feedback</div>
                </div>
                
                {feedbackStats && feedbackStats.averageRating && (
                  <div className="text-center border-t pt-4">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 fill-current ${
                            index < Math.round(feedbackStats.averageRating) 
                              ? "text-yellow-400" 
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {feedbackStats.averageRating.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                )}

                <div className="text-center border-t pt-4">
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">{stats.totalUsers || 0}+ Happy Students</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rating Distribution */}
            {feedbackStats && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Rating Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = feedbackStats.ratingDistribution[rating - 1];
                      const percentage = feedbackStats.totalFeedback > 0 
                        ? (count / feedbackStats.totalFeedback) * 100 
                        : 0;
                      
                      return (
                        <div key={rating} className="flex items-center gap-2">
                          <div className="flex items-center gap-1 w-12">
                            <span className="text-sm">{rating}</span>
                            <Star className="w-3 h-3 fill-current text-yellow-400" />
                          </div>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-8">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Recent Feedback */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            {feedbackLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Loading feedback...</p>
              </div>
            ) : !feedback || feedback.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No feedback yet. Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {feedback.slice(0, 6).map((item: Feedback) => (
                  <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      {item.rating && (
                        <div className="flex items-center gap-1">
                          {Array.from({ length: item.rating }).map((_, index) => (
                            <Star key={index} className="w-4 h-4 fill-current text-yellow-400" />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.message}</p>
                    {item.createdAt && (
                      <p className="text-gray-400 text-xs mt-2">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
