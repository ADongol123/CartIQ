import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TenantPageHeader } from "@/components/tenant-page-header"
import { FileUploader } from "@/components/file-uploader"
import { DataSourceList } from "@/components/data-source-list"

export default function DataCollectionPage() {
  return (
    <div className="flex flex-col">
      <TenantPageHeader title="Data Collection" description="Add and manage data sources for your chatbots" />

      <Tabs defaultValue="manual" className="space-y-4">
        <TabsList>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="upload">File Upload</TabsTrigger>
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Add basic information about your business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" placeholder="Acme Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" placeholder="contact@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your business, products, and services..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Information</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>Add details about your products or services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input id="product-name" placeholder="Product Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-description">Product Description</Label>
                <Textarea
                  id="product-description"
                  placeholder="Describe your product features, benefits, and specifications..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pricing">Pricing Information</Label>
                <Textarea
                  id="pricing"
                  placeholder="Provide pricing details, plans, or packages..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Add Another Product</Button>
              <Button>Save Products</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FAQs</CardTitle>
              <CardDescription>Add frequently asked questions and answers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Question</Label>
                <Input id="question" placeholder="What are your business hours?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="answer">Answer</Label>
                <Textarea
                  id="answer"
                  placeholder="Our business hours are Monday to Friday, 9 AM to 5 PM EST."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Add Another FAQ</Button>
              <Button>Save FAQs</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>Upload documents to extract information for your chatbot</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploader />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Sources</CardTitle>
              <CardDescription>Manage your existing data sources</CardDescription>
            </CardHeader>
            <CardContent>
              <DataSourceList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
