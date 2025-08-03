import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail } from "lucide-react";
import { FaWhatsapp, FaTelegram, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaSquareRootAlt, FaChalkboardTeacher, FaLaptopCode, FaJava, FaMedal, FaBook, FaGraduationCap, FaHeart } from "react-icons/fa";

export default function About() {
  const achievements = [
    { icon: <FaMedal className="text-3xl text-yellow-500" />, title: "Class 10th 84.33%", color: "bg-yellow-100 text-yellow-800" },
    { icon: <FaBook className="text-3xl text-blue-500" />, title: "Class 12th 84.66%", color: "bg-blue-100 text-blue-800" },
    { icon: <FaGraduationCap className="text-3xl text-green-500" />, title: "JEE Mains Qualified", color: "bg-green-100 text-green-800" },
    { icon: <FaHeart className="text-3xl text-purple-500" />, title: "BTech CSE 8.5 CGPA", color: "bg-purple-100 text-purple-800" },
  ];

  const skills = [
    { icon: <FaSquareRootAlt className="text-3xl text-orange-500" />, title: "Expert in Mathematics", color: "bg-orange-100 text-orange-800" },
    { icon: <FaChalkboardTeacher className="text-3xl text-green-500" />, title: "More Than 3 Years of Teaching Experience", color: "bg-green-100 text-green-800" },
    { icon: <FaLaptopCode className="text-3xl text-blue-500" />, title: "Full Stack Web Developer", color: "bg-blue-100 text-blue-800" },
    { icon: <FaJava className="text-3xl text-amber-500" />, title: "Java Developer", color: "bg-amber-100 text-amber-800" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Section */}
        <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg p-8 mb-8 transform transition-all duration-500 hover:shadow-xl border border-gray-100 hover:border-primary/20 hover:translate-y-[-5px]">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Image */}
            <div className="w-56 h-56 rounded-full overflow-hidden ring-4 ring-primary/20 shadow-lg transform transition-all duration-500 hover:scale-105 bg-gradient-to-br from-primary/10 to-primary/30">
              <img src="/images/profile.png" alt="Amit Sharma" className="w-full h-full object-cover" />
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl font-bold mb-3 relative text-gray-900">
                Amit Sharma
                <span className="absolute -bottom-1 left-0 w-24 h-1 bg-primary rounded-full"></span>
              </h1>
              <p className="text-2xl font-medium mb-6 text-gray-700">
                B.Tech CSE Student
              </p>
              
              {/* Contact Info */}
              <div className="flex flex-col md:flex-row gap-4 mb-6 text-gray-600">
                <div className="flex items-center justify-center md:justify-start gap-3 transform transition-all duration-300 hover:text-primary bg-white p-2 px-4 rounded-full shadow-sm hover:shadow-md group">
                  <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 text-primary" />
                  <span className="font-medium">Nagaland, India</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3 transform transition-all duration-300 hover:text-primary bg-white p-2 px-4 rounded-full shadow-sm hover:shadow-md group">
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 text-primary" />
                  <span className="font-medium">amitsharma7200@gmail.com</span>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex justify-center md:justify-start gap-5">
                <a href="https://wa.me/7628024274" className="w-12 h-12 bg-white hover:bg-[#25D366] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-md">
                  <FaWhatsapp className="w-6 h-6" />
                </a>
                <a href="https://t.me/amit292004" className="w-12 h-12 bg-white hover:bg-[#0088cc] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-md">
                  <FaTelegram className="w-6 h-6" />
                </a>
                <a href="https://instagram.com/am____it_292004" className="w-12 h-12 bg-white hover:bg-[#E1306C] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-md">
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/amit-sharma-142a26359" className="w-12 h-12 bg-white hover:bg-[#0077B5] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-md">
                  <FaLinkedin className="w-6 h-6" />
                </a>
                <a href="https://youtube.com/@BounceBackAcademy" className="w-12 h-12 bg-white hover:bg-[#FF0000] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-md">
                  <FaYoutube className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Skills Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="overflow-hidden border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 relative inline-block">
                Technical Skills
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/60 rounded-full"></span>
              </h2>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-4 transform transition-all duration-300 hover:translate-x-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/30 rounded-xl flex items-center justify-center shadow-sm">
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{skill.title}</h3>
                      <div className="w-full h-1 bg-gray-100 rounded-full mt-2">
                        <div className={`h-full rounded-full bg-primary`} style={{ width: `${85 - index * 10}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 relative inline-block">
                Achievements
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/60 rounded-full"></span>
              </h2>
              <div className="space-y-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-4 transform transition-all duration-300 hover:translate-x-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-accent/10 to-accent/30 rounded-xl flex items-center justify-center shadow-sm">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{achievement.title}</h3>
                      <div className="w-full h-1 bg-gray-100 rounded-full mt-2">
                        <div className={`h-full rounded-full bg-accent`} style={{ width: `${90 - index * 5}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mission and What Makes Us Different */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="overflow-hidden border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 relative inline-block">
                Our Mission
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/60 rounded-full"></span>
              </h2>
              <div className="relative pl-6 border-l-2 border-primary/30">
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  As a B.Tech CSE student who has walked the path of NBSE examinations, I understand the challenges students face in accessing quality study materials. Bounce Back Academy was born from my personal experience and the desire to help fellow NBSE students excel in their academic journey.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  Having achieved good results in my Class 10th (84.33%) and Class 12th (84.66%) NBSE examinations, and successfully qualifying for JEE Mains, I know what it takes to succeed. My current pursuit of B.Tech in Computer Science Engineering with an 8.5 CGPA has further strengthened my commitment to education and technology.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  With over 3 years of teaching experience and expertise in mathematics, I've created this platform to provide free access to NBSE previous year question papers and curated educational content. My goal is to democratize quality education and help every NBSE student achieve their dreams, regardless of their economic background.
                </p>
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                <div className="absolute -left-[9px] bottom-0 w-4 h-4 rounded-full bg-primary"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border border-gray-100 hover:border-secondary/20 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 relative inline-block">
                What Makes Us Different
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-secondary/60 rounded-full"></span>
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4 group hover:bg-secondary/5 p-3 rounded-lg transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mt-1 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">👨‍🎓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-secondary transition-colors duration-300">Student-Centric</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">Built by a student who understands the real challenges and needs of NBSE exam preparation.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group hover:bg-secondary/5 p-3 rounded-lg transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mt-1 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">💝</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-secondary transition-colors duration-300">Completely Free</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">No hidden charges, no premium features. Everything is available for free to support student success.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group hover:bg-secondary/5 p-3 rounded-lg transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mt-1 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">🔄</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-secondary transition-colors duration-300">Regularly Updated</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">We continuously add new question papers and educational resources to keep you ahead.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
