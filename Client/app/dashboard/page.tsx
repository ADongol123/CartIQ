"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Bot,
  MessageSquare,
  Users,
  Plus,
  TrendingUp,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import { TenantPageHeader } from "@/components/tenant-page-header";
import { TenantMetricCard } from "@/components/tenant-metric-card";
import { TenantChatbotList } from "@/components/tenant-chatbot-list";
import { TenantConversationChart } from "@/components/tenant-conversation-chart";
import withAuth from "../hoc/withAuth";

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

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
};

const TenantDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="px-10">
      <motion.div
        className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        <motion.div variants={itemVariants}>
          <TenantPageHeader
            title="Dashboard"
            description="Overview of your chatbots and interactions"
            actions={
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Chatbot
                </Button>
              </motion.div>
            }
          />
        </motion.div>

        {/* Metrics Cards */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8 relative z-10"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <TenantMetricCard
              title="Active Chatbots"
              value="3"
              description="2 published, 1 draft"
              icon={<Bot className="h-5 w-5 text-blue-600" />}
              gradient="from-blue-500 to-cyan-500"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <TenantMetricCard
              title="Total Conversations"
              value="1,284"
              description="+24% from last month"
              icon={<MessageSquare className="h-5 w-5 text-green-600" />}
              trend="up"
              gradient="from-green-500 to-emerald-500"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <TenantMetricCard
              title="Unique Users"
              value="842"
              description="+18% from last month"
              icon={<Users className="h-5 w-5 text-purple-600" />}
              trend="up"
              gradient="from-purple-500 to-pink-500"
            />
          </motion.div>
        </motion.div>

        {/* Enhanced Tabs */}
        <motion.div variants={itemVariants} className="relative z-10">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg rounded-xl p-1">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="chatbots"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                <Bot className="w-4 h-4 mr-2" />
                Chatbots
              </TabsTrigger>
              <TabsTrigger
                value="conversations"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                <Activity className="w-4 h-4 mr-2" />
                Conversations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-7"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="lg:col-span-4 bg-white/80 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                        <Activity className="h-5 w-5 text-white" />
                      </div>
                      Conversation Activity
                    </CardTitle>
                    <CardDescription>
                      Daily chatbot interactions with trend analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <TenantConversationChart />
                  </CardContent>
                </Card>

                <Card className="lg:col-span-3 bg-white/80 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                      <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      Your Chatbots
                    </CardTitle>
                    <CardDescription>
                      Manage your active chatbots
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TenantChatbotList limit={3} />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="chatbots">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      All Chatbots
                    </CardTitle>
                    <CardDescription>
                      Manage all your chatbots with advanced controls
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TenantChatbotList />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="conversations">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-white" />
                      </div>
                      Conversation Analytics
                    </CardTitle>
                    <CardDescription>
                      Detailed view of chatbot interactions and performance
                      metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TenantConversationChart />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default withAuth(TenantDashboardPage);
