import { Bot } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div>
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <div
            className={`flex items-center gap-2 transition-all duration-700 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="relative">
              <Bot className="h-8 w-8 text-blue-600 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Chatmate
            </span>
            <Badge variant="secondary" className="ml-2 animate-bounce">
              AI-Powered
            </Badge>
          </div>

          <nav
            className={`hidden md:flex items-center gap-6 transition-all duration-700 delay-200 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-5 opacity-0"
            }`}
          >
            <Link
              href="/features"
              className="text-sm font-medium hover:text-blue-600 transition-colors relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium hover:text-blue-600 transition-colors relative group"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium hover:text-blue-600 transition-colors relative group"
            >
              Documentation
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </Link>
          </nav>

          <div
            className={`flex items-center gap-4 transition-all duration-700 delay-400 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default header;
