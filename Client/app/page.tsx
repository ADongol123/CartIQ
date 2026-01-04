"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Bot,
  Building2,
  Users,
  MessageCircle,
  Zap,
  Shield,
  BarChart3,
  CheckCircle,
  Star,
  Play,
  ChevronDown,
} from "lucide-react"
import { useState, useEffect } from "react"
import Header from "@/components/header"
export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])


  
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Conversations",
      description: "Advanced natural language processing for human-like interactions",
    },
    {
      icon: Zap,
      title: "Lightning Fast Setup",
      description: "Deploy your chatbot in under 5 minutes with zero coding",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track performance and optimize conversations instantly",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CEO, TechStart",
      content: "Chatmate transformed our customer support. 90% faster response times!",
      rating: 5,
      avatar: "/professional-woman-smiling.png",
    },
    {
      name: "Marcus Johnson",
      role: "Marketing Director",
      content: "Our lead generation increased by 300% after implementing Chatmate.",
      rating: 5,
      avatar: "/professional-man-smiling.png",
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Manager",
      content: "The multi-tenant features are perfect for managing all our brands.",
      rating: 5,
      avatar: "/professional-woman-glasses.png",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      {/* Animated Background */}


      {/* Header */}
        <Header/>

      {/* Hero Section */}
      <section className="container flex flex-1 flex-col items-center justify-center py-12 md:py-24 lg:py-32 relative">
        <div className="mx-auto flex max-w-[1200px] flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div
            className={`flex-1 flex flex-col items-center lg:items-start gap-6 text-center lg:text-left transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`}
          >
            <Badge variant="outline" className="animate-pulse border-blue-200 text-blue-600">
              🚀 Now with GPT-4 Integration
            </Badge>

            <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
              Build{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                intelligent
              </span>{" "}
              chatbots in minutes
            </h1>

            <p className="max-w-[600px] text-lg text-gray-600 md:text-xl leading-relaxed">
              Create, customize, and deploy AI-powered chatbots that understand your customers. No coding required.
              Start converting visitors into customers today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Start Building Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 hover:bg-blue-50 group bg-transparent"
                >
                  <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Free 14-day trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Cancel anytime
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Demo */}
          <div
            className={`flex-1 relative transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
          >
            <div className="relative">
              {/* Main Chat Interface */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-105 transition-all duration-500">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="font-semibold">Customer Support Bot</span>
                    <Badge variant="secondary" className="ml-auto bg-white/20 text-white">
                      Online
                    </Badge>
                  </div>
                </div>

                <div className="p-6 space-y-4 h-80 overflow-hidden">
                  <div className="flex gap-3 animate-fade-in">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 max-w-xs">
                      <p className="text-sm">Hi! I'm your AI assistant. How can I help you today?</p>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end animate-fade-in animation-delay-500">
                    <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm p-3 max-w-xs">
                      <p className="text-sm">I need help with my order status</p>
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                  </div>

                  <div className="flex gap-3 animate-fade-in animation-delay-1000">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 max-w-xs">
                      <p className="text-sm">I'd be happy to help! Could you please provide your order number?</p>
                    </div>
                  </div>

                  <div className="flex gap-3 animate-fade-in animation-delay-1500">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" />
                        <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce animation-delay-100" />
                        <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce animation-delay-200" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-500">
                      Type your message...
                    </div>
                    <Button size="sm" className="rounded-full">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 animate-float">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="font-semibold text-green-600">98% Satisfaction</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 animate-float animation-delay-1000">
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold text-gray-700">2.3s Response</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-24 relative">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            ✨ Powerful Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">succeed</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From setup to scale, Chatmate provides all the tools you need to create amazing customer experiences.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`group hover:shadow-xl transition-all duration-500 cursor-pointer border-2 ${
                activeFeature === index
                  ? "border-blue-200 shadow-lg scale-105"
                  : "border-transparent hover:border-blue-100"
              }`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <CardContent className="flex flex-col items-center gap-6 p-8 text-center">
                <div
                  className={`rounded-full p-4 transition-all duration-300 ${
                    activeFeature === index
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-110"
                      : "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
                  }`}
                >
                  <feature.icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: MessageCircle, title: "Multi-Channel", desc: "Deploy across web, mobile, and social platforms" },
            { icon: Shield, title: "Enterprise Security", desc: "Bank-level encryption and compliance" },
            { icon: Building2, title: "Multi-Tenant", desc: "Manage multiple brands from one dashboard" },
            { icon: Users, title: "Team Collaboration", desc: "Work together with role-based permissions" },
          ].map((item, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                  <item.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-24">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              💬 Customer Stories
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Loved by{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                thousands
              </span>
            </h2>
            <p className="text-lg text-gray-600">See what our customers are saying about Chatmate</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to transform your customer experience?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of businesses already using Chatmate to grow their revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Chatmate
            </span>
            <Badge variant="secondary" className="ml-2">
              AI-Powered
            </Badge>
          </div>

          <div className="flex flex-wrap gap-6">
            <Link href="/features" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Pricing
            </Link>
            <Link href="/docs" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Documentation
            </Link>
            <Link href="/support" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Support
            </Link>
          </div>

          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Chatmate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
