"use client"

import { motion } from "framer-motion"
import { TrendingUp, MessageSquare, Users, Clock } from "lucide-react"

export function TenantConversationChart() {
  const data = [
    { day: "Mon", conversations: 45, users: 32 },
    { day: "Tue", conversations: 52, users: 38 },
    { day: "Wed", conversations: 48, users: 35 },
    { day: "Thu", conversations: 61, users: 42 },
    { day: "Fri", conversations: 55, users: 39 },
    { day: "Sat", conversations: 38, users: 28 },
    { day: "Sun", conversations: 42, users: 31 },
  ]

  const maxConversations = Math.max(...data.map((d) => d.conversations))

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100"
        >
          <MessageSquare className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-900">341</div>
          <div className="text-sm text-blue-600">Total Conversations</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100"
        >
          <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-900">245</div>
          <div className="text-sm text-green-600">Unique Users</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100"
        >
          <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-900">2.3m</div>
          <div className="text-sm text-purple-600">Avg Response Time</div>
        </motion.div>
      </div>

      {/* Chart */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Weekly Activity</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              <span className="text-gray-600">Conversations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
              <span className="text-gray-600">Users</span>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between h-48 gap-2">
          {data.map((item, index) => (
            <motion.div
              key={item.day}
              className="flex-1 flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <div className="flex flex-col items-center gap-1 w-full">
                {/* Conversations Bar */}
                <motion.div
                  className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg relative overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.conversations / maxConversations) * 120}px` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.8 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                </motion.div>

                {/* Users Bar */}
                <motion.div
                  className="w-full bg-gradient-to-t from-green-500 to-emerald-500 rounded-b-lg relative overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.users / maxConversations) * 80}px` }}
                  transition={{ duration: 1, delay: index * 0.1 + 1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                </motion.div>
              </div>

              <div className="text-xs font-medium text-gray-600">{item.day}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trend Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex items-center justify-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200"
      >
        <TrendingUp className="h-4 w-4 text-green-600" />
        <span className="text-sm text-green-800 font-medium">+24% increase in conversations this week</span>
      </motion.div>
    </div>
  )
}
