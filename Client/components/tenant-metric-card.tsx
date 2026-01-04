"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TenantMetricCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  trend?: "up" | "down"
  gradient?: string
}

export function TenantMetricCard({
  title,
  value,
  description,
  icon,
  trend,
  gradient = "from-blue-500 to-purple-500",
}: TenantMetricCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -5,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300">
        {/* Gradient Background */}
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-5", gradient)} />

        {/* Animated Glow Effect */}
        <motion.div
          className={cn("absolute -inset-1 bg-gradient-to-r opacity-20 blur-sm", gradient)}
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="p-2 rounded-lg bg-gradient-to-r from-white/50 to-white/30 backdrop-blur-sm"
          >
            {icon}
          </motion.div>
        </CardHeader>
        <CardContent className="relative z-10">
          <motion.div
            className="text-3xl font-bold text-gray-900 mb-1"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
          >
            {value}
          </motion.div>
          <div className="flex items-center text-xs text-gray-600">
            {trend && (
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={cn("flex items-center mr-1", trend === "up" ? "text-green-600" : "text-red-600")}
              >
                {trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              </motion.div>
            )}
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              {description}
            </motion.span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
