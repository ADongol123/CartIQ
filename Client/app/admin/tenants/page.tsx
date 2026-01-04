import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { AdminPageHeader } from "@/components/admin-page-header"
import { AdminTenantList } from "@/components/admin-tenant-list"

export default function AdminTenantsPage() {
  return (
    <div className="flex flex-col">
      <AdminPageHeader
        title="Tenants"
        description="Manage all businesses on the platform"
        actions={
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Tenant
          </Button>
        }
      />

      <div className="p-4 md:p-8 pt-0 md:pt-0">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search tenants..." className="pl-8" />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        <AdminTenantList />
      </div>
    </div>
  )
}
