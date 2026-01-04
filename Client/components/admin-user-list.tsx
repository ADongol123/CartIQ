import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, MoreVertical, Edit, Trash2, Eye, Lock } from "lucide-react"

export function AdminUserList() {
  // Sample user data
  const users = [
    {
      id: "1",
      name: "John Smith",
      email: "john@acmeinc.com",
      role: "admin",
      tenant: "Acme Inc",
      status: "active",
      lastLogin: "2023-09-12T00:00:00.000Z",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@techcorp.com",
      role: "user",
      tenant: "TechCorp",
      status: "active",
      lastLogin: "2023-09-15T00:00:00.000Z",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@globalsolutions.com",
      role: "user",
      tenant: "Global Solutions",
      status: "inactive",
      lastLogin: "2023-08-24T00:00:00.000Z",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@startuplabs.com",
      role: "admin",
      tenant: "Startup Labs",
      status: "active",
      lastLogin: "2023-09-18T00:00:00.000Z",
    },
    {
      id: "5",
      name: "David Wilson",
      email: "david@digitalinnovations.com",
      role: "user",
      tenant: "Digital Innovations",
      status: "active",
      lastLogin: "2023-09-10T00:00:00.000Z",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground">
          <div className="col-span-3">User</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-2">Tenant</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Last Login</div>
          <div className="col-span-1"></div>
        </div>
        {users.map((user) => (
          <div key={user.id} className="grid grid-cols-12 gap-4 border-t p-4 text-sm">
            <div className="col-span-3 flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={user.name} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </div>
            </div>
            <div className="col-span-2 flex items-center">
              <Badge variant={user.role === "admin" ? "default" : "outline"} className="capitalize">
                {user.role}
              </Badge>
            </div>
            <div className="col-span-2 flex items-center">{user.tenant}</div>
            <div className="col-span-2 flex items-center">
              <Badge variant={user.status === "active" ? "success" : "destructive"} className="capitalize">
                {user.status}
              </Badge>
            </div>
            <div className="col-span-2 flex items-center">{new Date(user.lastLogin).toLocaleDateString()}</div>
            <div className="col-span-1 flex items-center justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>View Details</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit User</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Lock className="mr-2 h-4 w-4" />
                    <span>Reset Password</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete User</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm">
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  )
}
