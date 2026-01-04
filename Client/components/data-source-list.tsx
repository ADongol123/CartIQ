import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FileText, MoreVertical, Edit, Trash2, RefreshCw, FileUp } from "lucide-react"

export function DataSourceList() {
  // Sample data sources
  const dataSources = [
    {
      id: "1",
      name: "Company FAQ",
      type: "manual",
      entries: 24,
      lastUpdated: "2023-08-12T00:00:00.000Z",
    },
    {
      id: "2",
      name: "Product Catalog",
      type: "manual",
      entries: 18,
      lastUpdated: "2023-09-05T00:00:00.000Z",
    },
    {
      id: "3",
      name: "Company Handbook.pdf",
      type: "file",
      entries: 1,
      lastUpdated: "2023-07-22T00:00:00.000Z",
    },
    {
      id: "4",
      name: "Support Documentation.docx",
      type: "file",
      entries: 1,
      lastUpdated: "2023-08-30T00:00:00.000Z",
    },
    {
      id: "5",
      name: "Pricing Information",
      type: "manual",
      entries: 5,
      lastUpdated: "2023-09-10T00:00:00.000Z",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground">
          <div className="col-span-4">Name</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Entries</div>
          <div className="col-span-3">Last Updated</div>
          <div className="col-span-1"></div>
        </div>
        {dataSources.map((source) => (
          <div key={source.id} className="grid grid-cols-12 gap-4 border-t p-4 text-sm">
            <div className="col-span-4 flex items-center gap-3">
              <div className="rounded-md bg-muted p-2">
                <FileText className="h-4 w-4" />
              </div>
              <div className="font-medium">{source.name}</div>
            </div>
            <div className="col-span-2 flex items-center">
              <Badge variant={source.type === "manual" ? "outline" : "secondary"} className="capitalize">
                {source.type}
              </Badge>
            </div>
            <div className="col-span-2 flex items-center">{source.entries}</div>
            <div className="col-span-3 flex items-center">{new Date(source.lastUpdated).toLocaleDateString()}</div>
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
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    <span>Refresh</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileUp className="mr-2 h-4 w-4" />
                    <span>Sync to Chatbot</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <Button variant="outline">
          <FileUp className="mr-2 h-4 w-4" />
          Sync All to Chatbot
        </Button>
        <Button>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh All
        </Button>
      </div>
    </div>
  )
}
