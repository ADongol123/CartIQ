"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Bot, MessageSquare, TrendingUp, Settings, Eye, Clock, Star, Activity } from "lucide-react"
import withAuth from "../hoc/withAuth"

// Mock data for chatbots
const mockChatbots = [
  {
    id: 1,
    name: "Customer Support Bot",
    description: "Handles customer inquiries and support tickets",
    template: "Customer Support",
    status: "active",
    conversations: 1247,
    users: 892,
    satisfaction: 4.8,
    responseTime: "2.3s",
    createdAt: "2024-01-15",
    performance: {
      totalMessages: 15420,
      resolvedQueries: 13876,
      escalations: 156,
      avgSessionTime: "8.5 min",
    },
  },
  {
    id: 2,
    name: "Sales Assistant",
    description: "Helps customers with product recommendations and sales",
    template: "Sales Assistant",
    status: "active",
    conversations: 856,
    users: 634,
    satisfaction: 4.6,
    responseTime: "1.8s",
    createdAt: "2024-01-20",
    performance: {
      totalMessages: 9840,
      resolvedQueries: 8756,
      escalations: 89,
      avgSessionTime: "12.2 min",
    },
  },
  {
    id: 3,
    name: "Lead Generation Bot",
    description: "Captures leads and qualifies potential customers",
    template: "Lead Generation",
    status: "active",
    conversations: 432,
    users: 298,
    satisfaction: 4.4,
    responseTime: "3.1s",
    createdAt: "2024-02-01",
    performance: {
      totalMessages: 5680,
      resolvedQueries: 4920,
      escalations: 45,
      avgSessionTime: "6.8 min",
    },
  },
  {
    id: 4,
    name: "General Assistant",
    description: "Multi-purpose chatbot for various inquiries",
    template: "General Assistant",
    status: "paused",
    conversations: 234,
    users: 156,
    satisfaction: 4.2,
    responseTime: "2.9s",
    createdAt: "2024-02-10",
    performance: {
      totalMessages: 3240,
      resolvedQueries: 2890,
      escalations: 28,
      avgSessionTime: "5.4 min",
    },
  },
]

const  ChatbotsPage = () =>  {
  const [selectedBot, setSelectedBot] = useState<(typeof mockChatbots)[0] | null>(null)

  const getTemplateColor = (template: string) => {
    switch (template) {
      case "Customer Support":
        return "bg-blue-100 text-blue-800"
      case "Sales Assistant":
        return "bg-green-100 text-green-800"
      case "Lead Generation":
        return "bg-purple-100 text-purple-800"
      case "General Assistant":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (selectedBot) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setSelectedBot(null)} className="flex items-center gap-2">
              ← Back to Chatbots
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{selectedBot.name}</h1>
              <p className="text-muted-foreground">{selectedBot.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(selectedBot.status)}>{selectedBot.status}</Badge>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedBot.performance.totalMessages.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved Queries</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedBot.performance.resolvedQueries.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((selectedBot.performance.resolvedQueries / selectedBot.performance.totalMessages) * 100)}%
                resolution rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedBot.responseTime}</div>
              <p className="text-xs text-muted-foreground">-0.5s from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedBot.satisfaction}/5</div>
              <p className="text-xs text-muted-foreground">Based on {selectedBot.users} users</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Key metrics for this chatbot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Query Resolution Rate</span>
                  <span>
                    {Math.round(
                      (selectedBot.performance.resolvedQueries / selectedBot.performance.totalMessages) * 100,
                    )}
                    %
                  </span>
                </div>
                <Progress
                  value={Math.round(
                    (selectedBot.performance.resolvedQueries / selectedBot.performance.totalMessages) * 100,
                  )}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>User Satisfaction</span>
                  <span>{Math.round((selectedBot.satisfaction / 5) * 100)}%</span>
                </div>
                <Progress value={Math.round((selectedBot.satisfaction / 5) * 100)} />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedBot.performance.escalations}</div>
                  <div className="text-sm text-muted-foreground">Escalations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedBot.performance.avgSessionTime}</div>
                  <div className="text-sm text-muted-foreground">Avg Session</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest interactions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Resolved customer inquiry about shipping</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New conversation started</p>
                    <p className="text-xs text-muted-foreground">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Escalated complex query to human agent</p>
                    <p className="text-xs text-muted-foreground">12 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Successfully processed payment inquiry</p>
                    <p className="text-xs text-muted-foreground">18 minutes ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Chatbots</h1>
          <p className="text-muted-foreground">Manage and monitor your chatbot performance</p>
        </div>
        <Button className="flex items-center gap-2">
          <Bot className="h-4 w-4" />
          Create New Chatbot
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockChatbots.map((bot) => (
          <Card
            key={bot.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedBot(bot)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{bot.name}</CardTitle>
                    <Badge className={`${getTemplateColor(bot.template)} text-xs`}>{bot.template}</Badge>
                  </div>
                </div>
                <Badge className={getStatusColor(bot.status)}>{bot.status}</Badge>
              </div>
              <CardDescription className="mt-2">{bot.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{bot.conversations}</div>
                  <div className="text-sm text-muted-foreground">Conversations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{bot.users}</div>
                  <div className="text-sm text-muted-foreground">Users</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{bot.satisfaction}/5</span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <span>{bot.responseTime}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-muted-foreground">Created {bot.createdAt}</span>
                <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                  <Eye className="h-3 w-3" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default withAuth(ChatbotsPage)