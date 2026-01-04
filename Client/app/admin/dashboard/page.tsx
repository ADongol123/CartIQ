import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bot, Building2, Users, Activity } from "lucide-react"
import { AdminPageHeader } from "@/components/admin-page-header"
import { AdminMetricCard } from "@/components/admin-metric-card"
import { AdminTenantList } from "@/components/admin-tenant-list"
import { AdminActivityChart } from "@/components/admin-activity-chart"

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col">
      <AdminPageHeader title="Dashboard" description="Platform-wide metrics and tenant overview" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AdminMetricCard
          title="Total Tenants"
          value="128"
          description="+12% from last month"
          icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
          trend="up"
        />
        <AdminMetricCard
          title="Active Users"
          value="2,842"
          description="+18% from last month"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          trend="up"
        />
        <AdminMetricCard
          title="Total Chatbots"
          value="256"
          description="+24% from last month"
          icon={<Bot className="h-4 w-4 text-muted-foreground" />}
          trend="up"
        />
        <AdminMetricCard
          title="Support Tickets"
          value="8"
          description="-3% from last month"
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
          trend="down"
        />
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Platform Usage</CardTitle>
                <CardDescription>Daily active users and chatbot interactions</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <AdminActivityChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Tenants</CardTitle>
                <CardDescription>Newly registered businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminTenantList limit={5} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="tenants">
          <Card>
            <CardHeader>
              <CardTitle>All Tenants</CardTitle>
              <CardDescription>Manage all businesses on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminTenantList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>System Activity</CardTitle>
              <CardDescription>Platform-wide activity and events</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminActivityChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
