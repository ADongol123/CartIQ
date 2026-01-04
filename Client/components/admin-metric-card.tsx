import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

interface AdminMetricCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  trend: "up" | "down" | "neutral"
}

export function AdminMetricCard({ title, value, description, icon, trend }: AdminMetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center mt-1">
          {trend === "up" && <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />}
          {trend === "down" && <ArrowDownRight className="mr-1 h-4 w-4 text-rose-500" />}
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
