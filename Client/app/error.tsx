"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, Home, MessageCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Error Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-100 to-orange-100 rounded-full flex items-center justify-center animate-pulse">
            <AlertTriangle className="w-12 h-12 text-red-600" />
          </div>
          <div className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">Something went wrong!</div>
          <div className="text-lg text-gray-600">Error 500 - Internal Server Error</div>
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
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Our AI chatbots encountered an unexpected error
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Don't worry! This is temporary. Our system is designed to handle millions of conversations, but sometimes
              even the best AI needs a moment to reboot.
            </p>

            {/* Error Details (Development) */}
            {process.env.NODE_ENV === "development" && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-800 font-mono">{error.message}</p>
                {error.digest && <p className="text-xs text-red-600 mt-2">Error ID: {error.digest}</p>}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={reset}
                className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 hover:scale-105 transition-transform"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>

              <Link href="/">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 hover:scale-105 transition-transform bg-transparent"
                >
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
                  <RefreshCw className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-sm font-medium text-gray-800">Conversations</div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Floating Animation Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-20"></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-orange-400 rounded-full animate-pulse opacity-20"></div>
          <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-red-300 rounded-full animate-bounce opacity-30"></div>
          <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-orange-300 rounded-full animate-ping opacity-20"></div>
        </div>
      </div>
    </div>
  )
}
