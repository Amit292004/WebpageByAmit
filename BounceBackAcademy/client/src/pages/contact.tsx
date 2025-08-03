import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Clock, Phone } from "lucide-react";
import { FaWhatsapp, FaTelegram, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600">Connect with us through your preferred platform</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Let's Connect Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Let's Connect</h2>
            <p className="text-gray-600 mb-8">
              Have questions, suggestions, or need help with the platform? We'd love to hear from you! 
              Reach out through any of these social media channels, and we'll get back to you as soon as possible.
            </p>

            {/* Contact Information */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors" onClick={() => window.location.href = 'mailto:bouncebackacademy.edu@gmail.com'}>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <span className="text-gray-600">bouncebackacademy.edu@gmail.com</span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors" onClick={() => window.location.href = 'tel:+917628024274'}>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Call</h3>
                  <span className="text-gray-600">+91 7628024274</span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <p className="text-gray-600">Nagaland, India</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Response Time</h3>
                  <p className="text-gray-600">Usually within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Follow Us Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {/* WhatsApp */}
              <Card className="hover:shadow-md transition-shadow cursor-pointer hover:border-2 hover:border-blue-500" onClick={() => window.open('https://whatsapp.com/channel/0029VbB2TRJAInPn5VNmxN3u', '_blank')}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 social-whatsapp rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FaWhatsapp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
                  <p className="text-sm text-gray-600 mb-4">Quick messages</p>

                </CardContent>
              </Card>

              {/* Telegram */}
              <Card className="hover:shadow-md transition-shadow cursor-pointer hover:border-2 hover:border-blue-500" onClick={() => window.open('https://t.me/bouncebackacademy', '_blank')}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 social-telegram rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FaTelegram className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Telegram</h3>
                  <p className="text-sm text-gray-600 mb-4">Updates & chat</p>

                </CardContent>
              </Card>

              {/* Instagram */}
              <Card className="hover:shadow-md transition-shadow cursor-pointer hover:border-2 hover:border-blue-500" onClick={() => window.open('https://www.instagram.com/bouncebackacdemy/', '_blank')}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 social-instagram rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FaInstagram className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Instagram</h3>
                  <p className="text-sm text-gray-600 mb-4">Visual updates</p>

                </CardContent>
              </Card>

              {/* Facebook */}
              <Card className="hover:shadow-md transition-shadow cursor-pointer hover:border-2 hover:border-blue-500" onClick={() => window.open('https://www.facebook.com/share/1ZXjY8Cp2n/', '_blank')}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 social-facebook rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FaFacebook className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Facebook</h3>
                  <p className="text-sm text-gray-600 mb-4">Community posts</p>

                </CardContent>
              </Card>

              {/* YouTube */}
              <Card className="hover:shadow-md transition-shadow cursor-pointer hover:border-2 hover:border-blue-500" onClick={() => window.open('https://youtube.com/@BounceBackAcademy', '_blank')}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 social-youtube rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FaYoutube className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">YouTube</h3>
                  <p className="text-sm text-gray-600 mb-4">Video content</p>

                </CardContent>
              </Card>

              {/* X (Twitter) */}
              <Card className="hover:shadow-md transition-shadow cursor-pointer hover:border-2 hover:border-blue-500" onClick={() => window.open('https://x.com/amit_292004?t=19kzZP6-uQzSXJ4Qb6OnwQ&s=09', '_blank')}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 social-twitter rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FaXTwitter className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">X</h3>
                  <p className="text-sm text-gray-600 mb-4">Quick updates</p>

                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
