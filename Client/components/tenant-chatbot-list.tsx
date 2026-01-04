"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Bot, Users, MessageSquare, Settings, Play, Pause, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"

interface TenantChatbotListProps {
  limit?: number
}

const chatbots = [
  {
    id: "1",
    name: "Customer Support Bot",
    status: "published",
    conversations: 1284,
    users: 842,
    lastActive: "2 hours ago",
    performance: 94,
  },
  {
    id: "2",
    name: "Sales Assistant",
    status: "published",
    conversations: 856,
    users: 523,
    lastActive: "5 minutes ago",
    performance: 87,
  },
  {
    id: "3",
    name: "FAQ Helper",
    status: "draft",
    conversations: 0,
    users: 0,
    lastActive: "Never",
    performance: 0,
  },
  {
    id: "4",
    name: "Product Advisor",
    status: "published",
    conversations: 432,
    users: 298,
    lastActive: "1 day ago",
    performance: 91,
  },
]

export function TenantChatbotList({ limit }: TenantChatbotListProps) {
  const [hoveredBot, setHoveredBot] = useState<string | null>(null)
  const displayedChatbots = limit ? chatbots.slice(0, limit) : chatbots

  const containerVariants:any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: any = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
      <AnimatePresence>
        {displayedChatbots.map((bot) => (
          <motion.div
            key={bot.id}
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
            onHoverStart={() => setHoveredBot(bot.id)}
            onHoverEnd={() => setHoveredBot(null)}
            className="relative overflow-hidden rounded-xl border border-white/20 bg-white/60 backdrop-blur-sm p-4 transition-all duration-300"
          >
            {/* Animated Background Gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"
              animate={{
                opacity: hoveredBot === bot.id ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg"
                >
                  <Bot className="h-6 w-6 text-white" />
                </motion.div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{bot.name}</h3>
                    <Badge
                      variant={bot.status === "published" ? "default" : "secondary"}
                      className={
                        bot.status === "published"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }
                    >
                      {bot.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {bot.conversations.toLocaleString()} conversations
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {bot.users.toLocaleString()} users
                    </div>
                    {bot.status === "published" && (
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                        Active {bot.lastActive}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {bot.status === "published" && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{bot.performance}% Performance</div>
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${bot.performance}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </motion.div>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/50 transition-colors duration-200">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white/90 backdrop-blur-sm border-white/20">
                    <DropdownMenuItem className="hover:bg-white/50">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-white/50">
                      {bot.status === "published" ? (
                        <>
                          <Pause className="mr-2 h-4 w-4" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Publish
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-red-50 text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
