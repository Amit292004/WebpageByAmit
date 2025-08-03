import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, BookOpen, Video, MessageSquare, Plus, Trash2, Eye, FileText, UserPlus, Lock } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { QuestionPaper, Video as VideoType, Feedback, Notes, Enrollment } from "@shared/schema";

interface User {
  id: string;
  username: string;
  mobile: string;
  role: string;
}

interface Stats {
  totalPapers: number;
  totalVideos: number;
  totalUsers: number;
  totalFeedback: number;
  totalNotes: number;
  totalEnrollments: number;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "amitsharma72020@gmail.comBtechCSE" && password === "Amit@292004BtechCSE") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const { data: stats } = useQuery<Stats>({
    queryKey: ["/api/stats"],
    enabled: isAuthenticated,
  });

  const { data: papers } = useQuery<QuestionPaper[]>({
    queryKey: ["/api/question-papers"],
    enabled: isAuthenticated,
  });

  const { data: videos } = useQuery<VideoType[]>({
    queryKey: ["/api/videos"],
    enabled: isAuthenticated,
  });

  const { data: feedbacks } = useQuery<Feedback[]>({
    queryKey: ["/api/feedback"],
    enabled: isAuthenticated,
  });
  
  const { data: notes } = useQuery<Notes[]>({
    queryKey: ["/api/notes"],
    enabled: isAuthenticated,
  });
  
  const { data: enrollments } = useQuery<Enrollment[]>({
    queryKey: ["/api/enrollments"],
    enabled: isAuthenticated,
  });
  
  const { data: users } = useQuery<User[]>({
    queryKey: ["/api/users"],
    enabled: isAuthenticated,
  });

  const addPaperMutation = useMutation({
    mutationFn: async (data: { title: string; class: number; subject: string; year: number; phase: string; fileUrl: File | null }) => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('class', data.class.toString());
      formData.append('subject', data.subject);
      formData.append('year', data.year.toString());
      formData.append('phase', data.phase);
      if (data.fileUrl) {
        formData.append('file', data.fileUrl);
      }
      return apiRequest('POST', '/api/question-papers', formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/question-papers'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
  });
  
  const addNoteMutation = useMutation({
    mutationFn: async (data: { title: string; class: number; subject: string; fileUrl: File | null }) => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('class', data.class.toString());
      formData.append('subject', data.subject);
      if (data.fileUrl) {
        formData.append('file', data.fileUrl);
      }
      return apiRequest('POST', '/api/notes', formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notes'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
  });

  const addVideoMutation = useMutation({
    mutationFn: (data: VideoType) => apiRequest('POST', '/api/videos', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/videos'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
  });

  const deletePaperMutation = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/question-papers/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/question-papers'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
  });

  const deleteVideoMutation = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/videos/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/videos'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
  });

  const deleteFeedbackMutation = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/feedback/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/feedback'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
  });
  
  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/notes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notes'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
  });
  
  const deleteEnrollmentMutation = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/enrollments/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
  });
  
  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
  });

  const statsCards = [
    { title: "Total Papers", value: stats?.totalPapers || 0, icon: BookOpen, color: "text-blue-600" },
    { title: "Total Videos", value: stats?.totalVideos || 0, icon: Video, color: "text-green-600" },
    { title: "Total Users", value: stats?.totalUsers || 0, icon: Users, color: "text-purple-600" },
    { title: "Feedback Count", value: stats?.totalFeedback || 0, icon: MessageSquare, color: "text-orange-600" },
    { title: "Total Notes", value: stats?.totalNotes || 0, icon: FileText, color: "text-yellow-600" },
    { title: "Total Enrollments", value: stats?.totalEnrollments || 0, icon: UserPlus, color: "text-pink-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {!isAuthenticated ? (
          <Card className="max-w-md mx-auto mt-20">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Lock className="h-6 w-6 text-blue-600" />
                Admin Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <Button type="submit" className="w-full">Login</Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-gray-600 mt-2">Manage question papers, videos, and monitor platform statistics</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAuthenticated(false)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Logout
                </Button>
              </div>
            </div>

            {/* Overview Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-blue-50"
                    onClick={() => document.getElementById('question-papers-section')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <BookOpen className="h-8 w-8 text-blue-600" />
                    <span>Question Papers</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-green-50"
                    onClick={() => document.getElementById('videos-section')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Video className="h-8 w-8 text-green-600" />
                    <span>Educational Videos</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-yellow-50"
                    onClick={() => document.getElementById('notes-section')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <FileText className="h-8 w-8 text-yellow-600" />
                    <span>Study Notes</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-pink-50"
                    onClick={() => document.getElementById('enrollments-section')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <UserPlus className="h-8 w-8 text-pink-600" />
                    <span>Enrolled Students</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-purple-50"
                    onClick={() => document.getElementById('users-section')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Users className="h-8 w-8 text-purple-600" />
                    <span>Registered Users</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-orange-50"
                    onClick={() => document.getElementById('feedback-section')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <MessageSquare className="h-8 w-8 text-orange-600" />
                    <span>User Feedback</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsCards.map((stat) => (
                <Card key={stat.title}>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Question Papers Section */}
            <Card className="mb-8" id="question-papers-section">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Question Papers</CardTitle>
                <AddPaperDialog mutation={addPaperMutation} />
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Phase</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {papers?.map((paper) => (
                      <TableRow key={paper.id}>
                        <TableCell className="font-medium">{paper.title}</TableCell>
                        <TableCell>Class {paper.class}</TableCell>
                        <TableCell>{paper.subject}</TableCell>
                        <TableCell>{paper.year}</TableCell>
                        <TableCell>{paper.phase}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                              <a href={paper.fileUrl} target="_blank" rel="noopener noreferrer">
                                <Eye className="h-4 w-4" />
                              </a>
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => deletePaperMutation.mutate(paper.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Videos Section */}
            <Card className="mb-8" id="videos-section">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Educational Videos</CardTitle>
                <AddVideoDialog mutation={addVideoMutation} />
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {videos?.map((video) => (
                      <TableRow key={video.id}>
                        <TableCell className="font-medium">{video.title}</TableCell>
                        <TableCell>Class {video.class}</TableCell>
                        <TableCell>{video.subject}</TableCell>
                        <TableCell>{video.duration}</TableCell>
                        <TableCell>{video.views}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                              <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer">
                                <Eye className="h-4 w-4" />
                              </a>
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => deleteVideoMutation.mutate(video.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Notes Section */}
            <Card className="mb-8" id="notes-section">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Study Notes</CardTitle>
                <AddNoteDialog mutation={addNoteMutation} />
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notes?.map((note) => (
                      <TableRow key={note.id}>
                        <TableCell className="font-medium">{note.title}</TableCell>
                        <TableCell>Class {note.class}</TableCell>
                        <TableCell>{note.subject}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                              <a href={note.fileUrl} target="_blank" rel="noopener noreferrer">
                                <Eye className="h-4 w-4" />
                              </a>
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => deleteNoteMutation.mutate(note.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Enrollments Section */}
            <Card className="mb-8" id="enrollments-section">
              <CardHeader>
                <CardTitle>Enrolled Students</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Enrollment Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrollments?.map((enrollment) => (
                      <TableRow key={enrollment.id}>
                        <TableCell className="font-medium">{enrollment.name}</TableCell>
                        <TableCell>Class {enrollment.class}</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>{enrollment.createdAt ? new Date(enrollment.createdAt).toLocaleDateString() : '-'}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => deleteEnrollmentMutation.mutate(enrollment.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Users Section */}
            <Card className="mb-8" id="users-section">
              <CardHeader>
                <CardTitle>Registered Users</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users?.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell>{user.mobile}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => deleteUserMutation.mutate(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Feedback Section */}
            <Card className="mb-8" id="feedback-section">
              <CardHeader>
                <CardTitle>User Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feedbacks?.map((feedback) => (
                      <TableRow key={feedback.id}>
                        <TableCell className="font-medium">{feedback.name}</TableCell>
                        <TableCell>{feedback.email}</TableCell>
                        <TableCell className="max-w-xs truncate">{feedback.message}</TableCell>
                        <TableCell>{feedback.createdAt ? new Date(feedback.createdAt).toLocaleDateString() : '-'}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => deleteFeedbackMutation.mutate(feedback.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

function AddPaperDialog({ mutation }: { mutation: any }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    class: "11",
    subject: "Physics",
    year: "",
    phase: "Board Exam",
    fileUrl: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      class: parseInt(formData.class),
      year: parseInt(formData.year)
    });
    setOpen(false);
    setFormData({ title: "", class: "11", subject: "Physics", year: "", phase: "Board Exam", fileUrl: null
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Paper
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Question Paper</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Class</Label>
              <Select value={formData.class} onValueChange={(value) => setFormData(prev => ({ ...prev, class: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8">Class 8</SelectItem>
                  <SelectItem value="9">Class 9</SelectItem>
                  <SelectItem value="10">Class 10</SelectItem>
                  <SelectItem value="11">Class 11 (Science)</SelectItem>
                  <SelectItem value="12">Class 12 (Science)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Subject</Label>
              <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Year</Label>
              <Input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                min="2016"
                max="2050"
                required
              />
            </div>
            <div>
              <Label>Phase</Label>
              <Select value={formData.phase} onValueChange={(value) => setFormData(prev => ({ ...prev, phase: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Phase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Phase 1">Phase 1</SelectItem>
                  <SelectItem value="Phase 2">Phase 2</SelectItem>
                  <SelectItem value="Board Exam">Board Exam</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Upload PDF File</Label>
            <Input
              type="file"
              accept=".pdf"
              onChange={(e) => setFormData(prev => ({ ...prev, fileUrl: e.target.files ? e.target.files[0] : null }))}
              required
            />
          </div>
          <Button type="submit" className="w-full">Add Paper</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AddVideoDialog({ mutation }: { mutation: any }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    class: "11",
    subject: "Physics",
    youtubeUrl: "",
    thumbnailUrl: "",
    duration: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      class: parseInt(formData.class)
    });
    setOpen(false);
    setFormData({ title: "", description: "", class: "11", subject: "Physics", youtubeUrl: "", thumbnailUrl: "", duration: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-accent hover:bg-accent/90 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Video
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-red-500" />
            Add Video Link
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="videoTitle" className="text-sm font-medium">Video Title *</Label>
            <Input
              id="videoTitle"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              placeholder="Latest Song"
              className="mt-1"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="videoClass" className="text-sm font-medium">Class *</Label>
              <Select value={formData.class} onValueChange={(value) => setFormData(prev => ({ ...prev, class: value }))}>
                <SelectTrigger id="videoClass" className="mt-1">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8">Class 8</SelectItem>
                  <SelectItem value="9">Class 9</SelectItem>
                  <SelectItem value="10">Class 10</SelectItem>
                  <SelectItem value="11">Class 11 (Science)</SelectItem>
                  <SelectItem value="12">Class 12 (Science)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="videoSubject" className="text-sm font-medium">Subject *</Label>
              <Input
                id="videoSubject"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                required
                placeholder="Latest Song"
                className="mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="youtubeUrl" className="text-sm font-medium">YouTube URL *</Label>
            <Input
              id="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={(e) => {
                const youtubeUrl = e.target.value;
                setFormData(prev => ({ ...prev, youtubeUrl }));
                const videoIdMatch = youtubeUrl.match(/(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/(?:www\.)?youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                if (videoIdMatch && videoIdMatch[1]) {
                  const videoId = videoIdMatch[1];
                  // Use mqdefault.jpg which is more reliable than maxresdefault.jpg
                  setFormData(prev => ({ ...prev, thumbnailUrl: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` }));
                } else {
                  setFormData(prev => ({ ...prev, thumbnailUrl: "" }));
                }
              }}
              placeholder="https://youtu.be/1PxSMMproEo?si=LZ96ev1PQUItNzd"
              required
              className="mt-1 bg-blue-50"
            />
          </div>
          
          <div>
            <Label htmlFor="duration" className="text-sm font-medium">Duration</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              placeholder="10"
              className="mt-1 bg-blue-50"
            />
          </div>
          
          <div>
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Latest Release Song"
              className="mt-1 min-h-[80px]"
            />
          </div>

          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2">
            <Video className="h-5 w-5" />
            Add Video Link
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AddNoteDialog({ mutation }: { mutation: any }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    class: "11",
    subject: "Physics",
    fileUrl: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      class: parseInt(formData.class)
    });
    setOpen(false);
    setFormData({ title: "", class: "11", subject: "Physics", fileUrl: null });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Note
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Study Note</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Class</Label>
              <Select value={formData.class} onValueChange={(value) => setFormData(prev => ({ ...prev, class: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8">Class 8</SelectItem>
                  <SelectItem value="9">Class 9</SelectItem>
                  <SelectItem value="10">Class 10</SelectItem>
                  <SelectItem value="11">Class 11 (Science)</SelectItem>
                  <SelectItem value="12">Class 12 (Science)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Subject</Label>
              <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
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
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Upload PDF File</Label>
            <Input
              type="file"
              accept=".pdf"
              onChange={(e) => setFormData(prev => ({ ...prev, fileUrl: e.target.files ? e.target.files[0] : null }))}
              required
            />
          </div>
          <Button type="submit" className="w-full">Add Note</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}