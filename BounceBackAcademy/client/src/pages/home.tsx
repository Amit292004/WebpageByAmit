import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Video, Smartphone, Filter, Download, GraduationCap, BookOpen, Lightbulb, CheckCircle, Pin, ThumbsUp, Award, Monitor, Globe, Phone, Mail, Rocket, CalendarDays, NotebookText, MessageSquare, Info, LogIn, UserPlus, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";


interface Stats {
  totalPapers: number;
  totalVideos: number;
  totalUsers: number;
  totalFeedback: number;
}

export default function Home() {
  const { data: stats = { totalPapers: 500, totalVideos: 200, totalUsers: 2000, totalFeedback: 100 } } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  const overviewFeatures = [
    {
      icon: FileText,
      title: "Question Papers",
      description: "Access a vast collection of previous year question papers.",
      link: "/question-papers",
      color: "bg-blue-500 text-white"
    },
    {
      icon: NotebookText,
      title: "Notes",
      description: "Comprehensive notes for all subjects and classes.",
      link: "/notes",
      color: "bg-purple-500 text-white"
    },
    {
      icon: Video,
      title: "Videos",
      description: "Curated video lectures to clarify complex concepts.",
      link: "/videos",
      color: "bg-green-500 text-white"
    },
    {
      icon: MessageSquare,
      title: "Feedback",
      description: "Share your thoughts and help us improve.",
      link: "/feedback",
      color: "bg-yellow-500 text-white"
    },
    {
      icon: Info,
      title: "About Us",
      description: "Learn more about Bounce Back Academy and our mission.",
      link: "/about",
      color: "bg-indigo-500 text-white"
    },
    {
      icon: Phone,
      title: "Contact Us",
      description: "Get in touch with us for any queries or support.",
      link: "/contact",
      color: "bg-red-500 text-white"
    },
    {
      icon: UserPlus,
      title: "Enroll Now",
      description: "Join our online tuition classes for personalized learning.",
      link: "/enroll",
      color: "bg-pink-500 text-white"
    },
    {
      icon: LogIn,
      title: "Login",
      description: "Access your personalized dashboard and study materials.",
      link: "/login",
      color: "bg-gray-500 text-white"
    },
    {
      icon: Video,
      title: "YouTube Channel",
      description: "Join 1.37K+ subscribers for free educational videos and exam tips.",
      link: "https://youtube.com/@BounceBackAcademy",
      color: "bg-red-600 text-white"
    },
  ];

  const features = [
    {
      icon: FileText,
      title: "Previous Year Papers",
      description: "Complete collection of NBSE question papers from Class 8-12, organized by year and subject for easy access.",
      color: "bg-blue-500 text-white"
    },
    {
      icon: Video,
      title: "Concept Videos",
      description: "Curated YouTube videos explaining key concepts, categorized by class and subject for targeted learning.",
      color: "bg-green-500 text-white"
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Access your study materials anywhere, anytime with our fully responsive design optimized for all devices.",
      color: "bg-orange-500 text-white"
    },
    {
      icon: Filter,
      title: "Smart Filtering",
      description: "Advanced filtering options to find exactly what you need - by class, subject, year, and exam phase.",
      color: "bg-purple-500 text-white"
    },
    {
      icon: Download,
      title: "Easy Downloads",
      description: "Download PDFs instantly for offline study. No registration required, completely free access to all materials.",
      color: "bg-pink-500 text-white"
    },
    {
      icon: GraduationCap,
      title: "Student Built",
      description: "Created by a B.Tech CSE student who understands your needs and challenges in NBSE preparation.",
      color: "bg-blue-500 text-white"
    }
  ];

  const classes = [
    { number: 8, color: "bg-blue-500", subjects: ["Math", "Science", "English", "Social"], phase: "Phase 1 & 2" },
    { number: 9, color: "bg-green-500", subjects: ["Math", "Science", "English", "Social"], phase: "Phase 1 & 2" },
    { number: 10, color: "bg-purple-500", subjects: ["Math", "Science", "English", "Social"], phase: "Board Exam" },
    { number: 11, color: "bg-orange-500", subjects: ["Physics", "Chemistry", "Biology", "Math"], phase: "Science Stream" },
    { number: 12, color: "bg-red-500", subjects: ["Physics", "Chemistry", "Biology", "Math"], phase: "Science Stream" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="lg:pr-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Your Gateway to
                <span className="text-primary"> NBSE Success</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Access comprehensive NBSE previous year question papers and concept-based YouTube videos for Class 8-12. Prepare smarter, perform better.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/question-papers">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Browse Question Papers</span>
                  </Button>
                </Link>
                <Link href="/videos">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white flex items-center space-x-2">
                    <Video className="w-5 h-5" />
                    <span>Watch Videos</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image with Stats */}
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Students collaborating and studying together" 
                className="rounded-2xl shadow-2xl w-full h-auto" 
              />
              
              {/* Floating Stats */}
              <div className="absolute -top-4 -right-4 bg-accent text-white px-6 py-4 rounded-2xl shadow-lg float-animation">
                <div className="text-2xl font-bold">{stats.totalPapers || 500}+</div>
                <div className="text-sm">Question Papers</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-lg float-animation" style={{ animationDelay: '1s' }}>
                <div className="text-2xl font-bold">{stats.totalUsers || 2000}+</div>
                <div className="text-sm">Happy Students</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Explore Bounce Back Academy
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Navigate through our comprehensive offerings
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {overviewFeatures.map((feature, index) => {
              // Check if the link is external (starts with http or https)
              const isExternal = feature.link.startsWith('http');
              
              // For external links, use anchor tag with target="_blank"
              if (isExternal) {
                return (
                  <a href={feature.link} key={index} target="_blank" rel="noopener noreferrer">
                    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
                      <CardContent className="p-6 text-center flex-grow flex flex-col justify-between">
                        <div>
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${feature.color} mx-auto`}>
                            <feature.icon className="w-7 h-7" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                        {feature.title === "YouTube Channel" ? (
                          <Button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold transform transition-transform duration-300 hover:scale-105">
                            SUBSCRIBE NOW
                          </Button>
                        ) : (
                          <Button variant="outline" className="mt-4 w-full">Explore</Button>
                        )}
                      </CardContent>
                    </Card>
                  </a>
                );
              }
              
              // For internal links, use the Link component
              return (
                <Link href={feature.link} key={index}>
                  <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
                    <CardContent className="p-6 text-center flex-grow flex flex-col justify-between">
                      <div>
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${feature.color} mx-auto`}>
                          <feature.icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                      <Button variant="outline" className="mt-4 w-full">Explore</Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Bounce Back Academy?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to excel in your NBSE examinations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.color} mx-auto`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 stats-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">{stats.totalPapers || 500}+</div>
              <div className="text-blue-100">Question Papers</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">{stats.totalVideos || 200}+</div>
              <div className="text-blue-100">Concept Videos</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">5</div>
              <div className="text-blue-100">Classes Covered</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">12</div>
              <div className="text-blue-100">Subjects Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Browse by Class
            </h2>
            <p className="text-lg text-gray-600">
              Select your class to access relevant study materials
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((classItem) => (
              <Card key={classItem.number} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${classItem.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <span className="text-2xl font-bold text-white">{classItem.number}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Class {classItem.number}</h3>
                  <p className="text-gray-600 mb-6">
                    {classItem.number <= 10 
                      ? `Access Phase 1 & 2 question papers and concept videos for Class ${classItem.number} subjects.`
                      : `${classItem.number === 11 ? 'Science stream question papers and videos for Physics, Chemistry, Biology, and Mathematics.' : 'Complete NBSE Class 12 Science stream question papers and videos.'}`
                    }
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {classItem.subjects.map((subject) => (
                      <span 
                        key={subject}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          classItem.color === 'bg-blue-500' ? 'bg-blue-100 text-blue-700' :
                          classItem.color === 'bg-green-500' ? 'bg-green-100 text-green-700' :
                          classItem.color === 'bg-purple-500' ? 'bg-purple-100 text-purple-700' :
                          classItem.color === 'bg-orange-500' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                  <Link href="/question-papers">
                    <Button variant="outline" className="w-full flex items-center justify-between">
                      <span className="font-medium">{classItem.phase}</span>
                      <span>→</span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Online Tuition Classes Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <BookOpen className="w-8 h-8 mr-3 text-primary" />
              Live Online Tuition Classes – Bounce Back Academy
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
              Learn From the Comfort of Your Home – Excel in Studies with Personal Guidance!
            </p>
            <p className="text-md text-gray-500 max-w-4xl mx-auto">
              We now offer Live Online Classes for Classes 8 to 12, specially designed for NBSE students. Classes are held via Zoom / Google Meet, making learning interactive, convenient, and focused.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mt-12">
            {/* Subjects Offered Card */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Lightbulb className="w-6 h-6 mr-3 text-yellow-500" />
                  Subjects Offered
                </h3>
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">Classes 8 to 10:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Mathematics</li>
                    <li>Science</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">Classes 11 & 12:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Physics</li>
                    <li>Chemistry</li>
                    <li>Mathematics</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Why Join Card */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
                  Why Join Our Online Classes?
                </h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span><span className="font-semibold">Live & Interactive Sessions</span> via Zoom/Google Meet</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span><span className="font-semibold">All Doubts Resolved Instantly</span> – One-on-one doubt-clearing support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span><span className="font-semibold">Conceptual Clarity</span> – No cramming, only real understanding</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span><span className="font-semibold">Weekly Tests & Assignments</span> for better retention</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span><span className="font-semibold">Personal Attention</span> in small batch sizes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span><span className="font-semibold">Notes, Practice Sheets & Class Recordings</span> available</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span><span className="font-semibold">Affordable Pricing</span> for Quality Education</span>
                  </li>
                  <li className="flex items-start text-red-500 font-semibold mt-6">
                    <Pin className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <span>All this at an affordable price!</span>
                  </li>
                  <li className="flex items-start text-gray-600 text-sm mt-4">
                    <ThumbsUp className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <span>For more details about fees and batch timings, contact us today.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* YouTube Channel Section */}
      <section className="py-16 lg:py-24 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Video className="w-8 h-8 mr-3 text-red-600" />
              Bounce Back Academy YouTube Channel
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
              Join our growing community of 1.37K+ subscribers for high-quality educational content
            </p>
            <p className="text-md text-gray-500 max-w-4xl mx-auto">
              Our channel offers comprehensive video lessons, exam preparation tips, and free resources to help you excel in your studies. Subscribe now to stay updated with our latest educational videos!
            </p>
            <div className="mt-8 flex justify-center">
              <a href="https://youtube.com/@BounceBackAcademy" target="_blank" rel="noopener noreferrer">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transform transition-transform duration-300 hover:scale-105 flex items-center gap-2">
                  <Video className="w-6 h-6" />
                  SUBSCRIBE NOW
                </Button>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-red-600 text-white">
                  <Video className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Educational Videos</h3>
                <p className="text-gray-600">Access hundreds of educational videos covering various subjects and topics to enhance your learning experience.</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-red-600 text-white">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Exam Preparation</h3>
                <p className="text-gray-600">Get comprehensive exam preparation videos with tips, tricks, and strategies to help you score better in your exams.</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-red-600 text-white">
                  <Download className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Resources</h3>
                <p className="text-gray-600">Download free study materials, notes, and resources shared through our YouTube channel to support your learning journey.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Know Your Educator Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <GraduationCap className="w-8 h-8 mr-3 text-primary" />
              Know Your Educator – Amit Sharma
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto italic">
              "Teaching is not just about giving answers, it's about making students fall in love with learning."
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-lg text-gray-700">
              <div className="flex items-center">
                <Award className="w-6 h-6 text-yellow-500 mr-3" />
                <span>Class 10 Score: <span className="font-semibold">84.33%</span></span>
              </div>
              <div className="flex items-center">
                <Award className="w-6 h-6 text-yellow-500 mr-3" />
                <span>Class 12 Score: <span className="font-semibold">84.66%</span></span>
              </div>
              <div className="flex items-center">
                <Monitor className="w-6 h-6 text-blue-500 mr-3" />
                <span>JEE Mains Qualified</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-6 h-6 text-green-500 mr-3" />
                <span>Currently pursuing B.Tech in CSE</span>
              </div>
              <div className="flex items-center">
                <Lightbulb className="w-6 h-6 text-purple-500 mr-3" />
                <span>3+ Years of Teaching Experience</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-6 h-6 text-red-500 mr-3" />
                <span>Teaching Students Online Across India</span>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/images/profile.png"
                alt="Amit Sharma - Educator"
                className="w-64 h-64 rounded-full object-cover shadow-lg transform transition-transform duration-300 hover:scale-105 border-4 border-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enroll for Online Tuition Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Enroll for Online Tuition
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fill the form below and our team will contact you soon
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Your full name"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">Class *</label>
                <input
                  type="text"
                  id="class"
                  name="class"
                  placeholder="e.g. Class 10, Class 12"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Your phone number"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="whatsAppNumber" className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number *</label>
                <input
                  type="tel"
                  id="whatsAppNumber"
                  name="whatsAppNumber"
                  placeholder="Your WhatsApp number"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  placeholder="Your complete address"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm resize-y"
                  required
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <Button type="submit" className="w-full flex items-center justify-center space-x-2">
                  <Rocket className="w-5 h-5" />
                  <span>Submit Enrollment Request</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>


      
      {/* Get in Touch / Join a Class Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Phone className="w-8 h-8 mr-3 text-primary" />
              Get in Touch / Join a Class
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to boost your NBSE preparation? Contact us today to inquire about classes, fees, and batch timings.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <a href="tel:+917628024274" className="block">
              <Card className="shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Call Us</h3>
                  <p className="text-gray-700 text-lg font-bold">+91 76280 24274</p>
                  <p className="text-gray-500 text-sm">(Monday to Saturday, 10 AM - 6 PM IST)</p>
                </CardContent>
              </Card>
            </a>
            <a href="mailto:bouncebackacademy.edu@gmail.com" target="_blank" rel="noopener noreferrer" className="block">
              <Card className="shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Email Us</h3>
                  <p className="text-gray-700 text-lg font-bold">bouncebackacademy.edu@gmail.com</p>
                  <p className="text-gray-500 text-sm">(We typically respond within 24 hours)</p>
                </CardContent>
              </Card>
            </a>
          </div>

          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center">
              <Rocket className="w-8 h-8 mr-3 text-purple-500" />
              Ready to Enroll?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Don't miss out on the opportunity to learn from experienced educators and achieve your academic goals. Limited seats available!
            </p>

          </div>
        </div>
      </section>
    </div>
  );
}
