"use client";
import {
  Bot,
  Building2,
  BarChart3,
  Users,
  Settings,
  Database,
  MessageSquare,
  Plus,
  Home,
  Shield,
  CreditCard,
  HelpCircle,
  LogOut,
  User,
  SidebarClose,
  Menu,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/professional-man.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Chatbots",
      icon: Bot,
      items: [
        {
          title: "All Chatbots",
          url: "/chatbots",
        },
        {
          title: "Create New",
          url: "/chatbots/create",
        },
        {
          title: "Templates",
          url: "/chatbots/templates",
        },
      ],
    },
    {
      title: "Conversations",
      url: "/conversations",
      icon: MessageSquare,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
    },
    {
      title: "Data Sources",
      url: "/data",
      icon: Database,
    },
  ],
  navAdmin: [
    {
      title: "Admin Dashboard",
      url: "/admin/dashboard",
      icon: Shield,
    },
    {
      title: "Tenants",
      url: "/admin/tenants",
      icon: Building2,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Billing",
      url: "/billing",
      icon: CreditCard,
    },
    {
      title: "Support",
      url: "/support",
      icon: HelpCircle,
    },
  ],
};

export function AppSidebar() {
  const pathname = usePathname();
  const { state, toggleSidebar } = useSidebar(); // 👈 get toggle function

  // Don't show sidebar on landing page
  if (pathname === "/") {
    return null;
  }

  return (
    <>
      {/* 🔥 Persistent Floating Menu Button */}
      {state === "collapsed" && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 flex items-center justify-center rounded-lg bg-sidebar p-2 shadow-md hover:bg-sidebar-accent"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link href="/dashboard">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <Bot className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold">Chatmate</span>
                      <span className="text-xs text-muted-foreground">
                        AI Platform
                      </span>
                    </div>
                    <Badge variant="secondary" className="ml-auto">
                      Pro
                    </Badge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            {/* Close Button inside Sidebar */}
            <button
              onClick={toggleSidebar}
              className="ml-2 flex items-center justify-center rounded-lg p-2 hover:bg-sidebar-accent"
            >
              <SidebarClose className="h-5 w-5" />
            </button>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.items ? (
                      <Collapsible defaultOpen className="group/collapsible">
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            <item.icon />
                            <span>{item.title}</span>
                            <Plus className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-45" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname === subItem.url}
                                >
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                      >
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.navAdmin.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.navSecondary.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={data.user.avatar || "/placeholder.svg"}
                        alt={data.user.name}
                      />
                      <AvatarFallback className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        {data.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {data.user.name}
                      </span>
                      <span className="truncate text-xs">
                        {data.user.email}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side={state === "collapsed" ? "right" : "bottom"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
