"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ArrowLeft, MessageCircle, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
            404
          </div>
          <div className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">Page Not Found</div>
        </div>

        {/* Chatmate Logo */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Chatmate
            </span>
          </div>
        </div>

        {/* Error Message Card */}
        <Card className="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Oops! This page seems to have wandered off</h2>
              <p className="text-gray-600 leading-relaxed">
                The page you're looking for doesn't exist or may have been moved. Don't worry, our AI chatbots are still
                here to help you find what you need!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>

              <Link href="/">
                <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-transform">
                  <Home className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto">
          <Link href="/dashboard">
            <Card className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-white/60 backdrop-blur-sm border-0">
              <div className="text-center">
                <div className="w-8 h-8 mx-auto mb-2 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Home className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-sm font-medium text-gray-800">Dashboard</div>
              </div>
            </Card>
          </Link>

          <Link href="/chatbots">
            <Card className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-white/60 backdrop-blur-sm border-0">
              <div className="text-center">
                <div className="w-8 h-8 mx-auto mb-2 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-sm font-medium text-gray-800">Chatbots</div>
              </div>
            </Card>
          </Link>

          <Link href="/conversations">
            <Card className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-white/60 backdrop-blur-sm border-0">
              <div className="text-center">
                <div className="w-8 h-8 mx-auto mb-2 bg-green-100 rounded-lg flex items-center justify-center">
                  <Search className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-sm font-medium text-gray-800">Conversations</div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Floating Animation Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-20"></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-20"></div>
          <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-blue-300 rounded-full animate-bounce opacity-30"></div>
          <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-purple-300 rounded-full animate-ping opacity-20"></div>
        </div>
      </div>
    </div>
  )
}
