import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Crown, ArrowLeft, Star, Zap, Shield } from "lucide-react";

export default function Premium() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 404 Style Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <Crown className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Premium Features Coming Soon!</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're working hard to bring you exclusive premium features. Stay tuned for exciting updates!
          </p>
        </div>

        {/* Coming Soon Features Preview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
              <p className="text-gray-600 text-sm">
                Track your progress with detailed analytics and performance insights.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Exclusive Content</h3>
              <p className="text-gray-600 text-sm">
                Access premium question papers and expert-curated study materials.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Priority Support</h3>
              <p className="text-gray-600 text-sm">
                Get personalized support and guidance from our expert team.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated!</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Be the first to know when our premium features launch. We'll notify you as soon as they're available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/feedback">
                <Button className="bg-white text-primary hover:bg-gray-100">
                  Share Your Ideas
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Get Notified
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="text-center mt-12">
          <Link href="/">
            <Button variant="outline" className="inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Fun Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-gray-900">🚀</div>
            <div className="text-sm text-gray-600 mt-2">Coming Soon</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">💡</div>
            <div className="text-sm text-gray-600 mt-2">Great Ideas</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">⭐</div>
            <div className="text-sm text-gray-600 mt-2">Premium Quality</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">🎯</div>
            <div className="text-sm text-gray-600 mt-2">Student Focus</div>
          </div>
        </div>
      </div>
    </div>
  );
}
