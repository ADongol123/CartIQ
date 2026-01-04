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
import { Building2, MoreVertical, Edit, Trash2, Eye } from "lucide-react"

interface AdminTenantListProps {
  limit?: number
}

export function AdminTenantList({ limit }: AdminTenantListProps) {
  // Sample tenant data
  const tenants = [
    {
      id: "1",
      name: "Acme Inc",
      email: "admin@acmeinc.com",
      status: "active",
      chatbots: 3,
      createdAt: "2023-04-12T00:00:00.000Z",
    },
    {
      id: "2",
      name: "TechCorp",
      email: "support@techcorp.com",
      status: "active",
      chatbots: 2,
      createdAt: "2023-05-18T00:00:00.000Z",
    },
    {
      id: "3",
      name: "Global Solutions",
      email: "info@globalsolutions.com",
      status: "inactive",
      chatbots: 1,
      createdAt: "2023-06-24T00:00:00.000Z",
    },
    {
      id: "4",
      name: "Startup Labs",
      email: "hello@startuplabs.com",
      status: "active",
      chatbots: 4,
      createdAt: "2023-07-30T00:00:00.000Z",
    },
    {
      id: "5",
      name: "Digital Innovations",
      email: "contact@digitalinnovations.com",
      status: "trial",
      chatbots: 1,
      createdAt: "2023-08-15T00:00:00.000Z",
    },
    {
      id: "6",
      name: "Future Tech",
      email: "support@futuretech.com",
      status: "active",
      chatbots: 2,
      createdAt: "2023-09-05T00:00:00.000Z",
    },
  ]

  const displayTenants = limit ? tenants.slice(0, limit) : tenants

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground">
          <div className="col-span-4">Business</div>
          <div className="col-span-3">Status</div>
          <div className="col-span-2">Chatbots</div>
          <div className="col-span-2">Created</div>
          <div className="col-span-1"></div>
        </div>
        {displayTenants.map((tenant) => (
          <div key={tenant.id} className="grid grid-cols-12 gap-4 border-t p-4 text-sm">
            <div className="col-span-4 flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={tenant.name} />
                <AvatarFallback>
                  <Building2 className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{tenant.name}</div>
                <div className="text-xs text-muted-foreground">{tenant.email}</div>
              </div>
            </div>
            <div className="col-span-3 flex items-center">
              <Badge
                variant={tenant.status === "active" ? "success" : tenant.status === "trial" ? "warning" : "destructive"}
                className="capitalize"
              >
                {tenant.status}
              </Badge>
            </div>
            <div className="col-span-2 flex items-center">{tenant.chatbots}</div>
            <div className="col-span-2 flex items-center">{new Date(tenant.createdAt).toLocaleDateString()}</div>
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
                    <span>Edit Tenant</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete Tenant</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
      {!limit && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
