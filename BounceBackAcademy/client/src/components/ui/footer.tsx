import { Link } from "wouter";
import { GraduationCap } from "lucide-react";
import { FaWhatsapp, FaTelegram, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="text-white text-sm" />
              </div>
              <div>
                <h1 className="text-lg font-bold">Bounce Back</h1>
                <p className="text-xs text-gray-400 -mt-1">Academy</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Empowering NBSE students with free access to quality educational resources and previous year question papers.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://whatsapp.com/channel/0029VbB2TRJAInPn5VNmxN3u"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors social-whatsapp hover:opacity-80"
              >
                <FaWhatsapp className="text-white" />
              </a>
              <a
                href="https://t.me/bouncebackacademy"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors social-telegram hover:opacity-80"
              >
                <FaTelegram className="text-white" />
              </a>
              <a
                href="https://www.instagram.com/bouncebackacdemy/"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors social-instagram hover:opacity-80"
              >
                <FaInstagram className="text-white" />
              </a>
              <a
                href="https://www.facebook.com/share/1ZXjY8Cp2n/"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors social-facebook hover:opacity-80"
              >
                <FaFacebook className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/question-papers" className="text-gray-400 hover:text-white transition-colors">Question Papers</Link></li>
              <li><Link href="/videos" className="text-gray-400 hover:text-white transition-colors">Videos</Link></li>
              <li><Link href="/notes" className="text-gray-400 hover:text-white transition-colors">Notes</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Class 8 Papers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Class 9 Papers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Class 10 Papers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Class 11 Papers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Class 12 Papers</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/feedback" className="text-gray-400 hover:text-white transition-colors">Feedback</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Bounce Back Academy. Built with ❤️ by Amit Sharma. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-400">Made in India</span>
            <span className="text-orange-500">🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
