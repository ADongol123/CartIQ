"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, MessageSquare, User, Clock, ArrowLeft, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import withAuth from "../hoc/withAuth"

// Mock data for chatbots and their conversations
const mockChatbots = [
  {
    id: 1,
    name: "Customer Support Bot",
    conversations: 1247,
    activeNow: 23,
  },
  {
    id: 2,
    name: "Sales Assistant",
    conversations: 856,
    activeNow: 15,
  },
  {
    id: 3,
    name: "Lead Generation Bot",
    conversations: 432,
    activeNow: 8,
  },
  {
    id: 4,
    name: "General Assistant",
    conversations: 234,
    activeNow: 3,
  },
]

const mockConversations = [
  {
    id: 1,
    userId: "user_001",
    userName: "John Smith",
    userEmail: "john@example.com",
    startTime: "2024-01-15 14:30",
    status: "completed",
    duration: "8m 32s",
    satisfaction: 5,
    messages: [
      { id: 1, sender: "user", content: "Hi, I need help with my recent order", timestamp: "14:30" },
      {
        id: 2,
        sender: "bot",
        content: "Hello! I'd be happy to help you with your order. Could you please provide your order number?",
        timestamp: "14:30",
      },
      { id: 3, sender: "user", content: "Sure, it's #ORD-12345", timestamp: "14:31" },
      {
        id: 4,
        sender: "bot",
        content:
          "Thank you! I found your order. It was placed on January 10th for $89.99. What specific issue are you experiencing?",
        timestamp: "14:31",
      },
      {
        id: 5,
        sender: "user",
        content: "I haven't received it yet and it was supposed to arrive yesterday",
        timestamp: "14:32",
      },
      {
        id: 6,
        sender: "bot",
        content:
          "I apologize for the delay. Let me check the shipping status for you. It appears there was a delay at the distribution center. Your package is now out for delivery and should arrive today by 6 PM.",
        timestamp: "14:33",
      },
      {
        id: 7,
        sender: "user",
        content: "Okay, thank you for checking. Will I get a tracking update?",
        timestamp: "14:34",
      },
      {
        id: 8,
        sender: "bot",
        content:
          "Yes, you should receive a tracking notification within the next hour. I've also added a $10 credit to your account for the inconvenience. Is there anything else I can help you with?",
        timestamp: "14:35",
      },
      { id: 9, sender: "user", content: "That's perfect, thank you so much!", timestamp: "14:38" },
      {
        id: 10,
        sender: "bot",
        content: "You're welcome! Have a great day and thank you for your patience.",
        timestamp: "14:38",
      },
    ],
  },
  {
    id: 2,
    userId: "user_002",
    userName: "Sarah Johnson",
    userEmail: "sarah@example.com",
    startTime: "2024-01-15 15:45",
    status: "active",
    duration: "12m 15s",
    satisfaction: null,
    messages: [
      { id: 1, sender: "user", content: "Hello, I'm looking for a laptop for my daughter", timestamp: "15:45" },
      {
        id: 2,
        sender: "bot",
        content:
          "Hi there! I'd be happy to help you find the perfect laptop. What will your daughter primarily use it for? School work, gaming, or general use?",
        timestamp: "15:45",
      },
      { id: 3, sender: "user", content: "Mainly for school work and some light photo editing", timestamp: "15:46" },
      {
        id: 4,
        sender: "bot",
        content:
          "Great! For school work and light photo editing, I'd recommend looking at laptops with at least 8GB RAM and a decent processor. What's your budget range?",
        timestamp: "15:46",
      },
      { id: 5, sender: "user", content: "Around $800-1200", timestamp: "15:47" },
      {
        id: 6,
        sender: "bot",
        content:
          "Perfect! In that range, I have some excellent options. The MacBook Air M2 at $1,199 is fantastic for photo editing, or if you prefer Windows, the Dell XPS 13 at $999 is also great. Would you like to see the specifications for either of these?",
        timestamp: "15:48",
      },
    ],
  },
  {
    id: 3,
    userId: "user_003",
    userName: "Mike Wilson",
    userEmail: "mike@example.com",
    startTime: "2024-01-15 16:20",
    status: "escalated",
    duration: "15m 42s",
    satisfaction: 2,
    messages: [
      { id: 1, sender: "user", content: "I want to return this product, it's completely broken!", timestamp: "16:20" },
      {
        id: 2,
        sender: "bot",
        content:
          "I'm sorry to hear about the issue with your product. I'll be happy to help you with the return process. Could you please provide your order number?",
        timestamp: "16:20",
      },
      {
        id: 3,
        sender: "user",
        content: "This is ridiculous, I shouldn't have to jump through hoops for a defective product!",
        timestamp: "16:21",
      },
      {
        id: 4,
        sender: "bot",
        content:
          "I completely understand your frustration, and I want to resolve this as quickly as possible. To process your return efficiently, I just need your order number. This will help me pull up your purchase details immediately.",
        timestamp: "16:21",
      },
      { id: 5, sender: "user", content: "Fine, it's #ORD-67890", timestamp: "16:22" },
      {
        id: 6,
        sender: "bot",
        content:
          "Thank you. I see this was a premium headset purchased last week. Given the defective nature, I'm escalating this to our specialist team who can offer additional compensation options. They'll contact you within 2 hours.",
        timestamp: "16:23",
      },
    ],
  },
]

const ConversationsPage = () => {
  const [selectedBot, setSelectedBot] = useState<number | null>(null)
  const [selectedConversation, setSelectedConversation] = useState<(typeof mockConversations)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "escalated":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSatisfactionColor = (rating: number) => {
    if (rating >= 4) return "text-green-600"
    if (rating >= 3) return "text-yellow-600"
    return "text-red-600"
  }

  if (selectedConversation) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setSelectedConversation(null)} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Conversation with {selectedConversation.userName}</h1>
              <p className="text-muted-foreground">{selectedConversation.userEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(selectedConversation.status)}>{selectedConversation.status}</Badge>
            {selectedConversation.satisfaction && (
              <Badge variant="outline" className={getSatisfactionColor(selectedConversation.satisfaction)}>
                ★ {selectedConversation.satisfaction}/5
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Conversation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Started</label>
                <p className="text-sm">{selectedConversation.startTime}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Duration</label>
                <p className="text-sm">{selectedConversation.duration}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Messages</label>
                <p className="text-sm">{selectedConversation.messages.length}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <Badge className={`${getStatusColor(selectedConversation.status)} mt-1`}>
                  {selectedConversation.status}
                </Badge>
              </div>
              {selectedConversation.satisfaction && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Satisfaction</label>
                  <p className={`text-sm font-medium ${getSatisfactionColor(selectedConversation.satisfaction)}`}>
                    ★ {selectedConversation.satisfaction}/5
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg">Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                          <span className="text-xs opacity-70">{message.timestamp}</span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (selectedBot) {
    const filteredConversations = mockConversations.filter(
      (conv) =>
        conv.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.userEmail.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setSelectedBot(null)} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Chatbots
            </Button>
            <div>
              <h1 className="text-3xl font-bold">
                {mockChatbots.find((bot) => bot.id === selectedBot)?.name} Conversations
              </h1>
              <p className="text-muted-foreground">View all user conversations with this chatbot</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredConversations.map((conversation) => (
            <Card
              key={conversation.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedConversation(conversation)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {conversation.userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{conversation.userName}</h3>
                      <p className="text-sm text-muted-foreground">{conversation.userEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{conversation.duration}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{conversation.startTime}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(conversation.status)}>{conversation.status}</Badge>
                      {conversation.satisfaction && (
                        <Badge variant="outline" className={getSatisfactionColor(conversation.satisfaction)}>
                          ★ {conversation.satisfaction}
                        </Badge>
                      )}
                    </div>

                    <div className="text-center">
                      <div className="text-lg font-semibold">{conversation.messages.length}</div>
                      <div className="text-xs text-muted-foreground">messages</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Last message:</p>
                  <p className="text-sm truncate">{conversation.messages[conversation.messages.length - 1].content}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Conversations</h1>
          <p className="text-muted-foreground">Monitor all user conversations across your chatbots</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockChatbots.map((bot) => (
          <Card
            key={bot.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedBot(bot.id)}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{bot.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{bot.activeNow} active now</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{bot.conversations}</div>
                <div className="text-sm text-muted-foreground">Total Conversations</div>
              </div>

              <Button variant="outline" className="w-full mt-4 flex items-center gap-2 bg-transparent">
                <MessageSquare className="h-4 w-4" />
                View Conversations
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


export default withAuth(ConversationsPage)