"use client"

import { CardFooter } from "@/components/ui/card"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { register } from "@/services/auth_service"

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accountType: "business",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, accountType: value }))
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      throw new Error("Please fill in all fields");
    }

    // Call backend register API
    const payload : any = {
      username: formData.name,
      email: formData.email,
      password: formData.password,
      accountType: formData.accountType,
    };

    const res = await register(payload); // <-- use your register function

    if (res.success) {
      // Show success toast
      toast({
        title: "Account created",
        description: `Your ${formData.accountType} account has been created successfully!`,
      });

      // Redirect based on account type
      if (formData.accountType === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    } else {
      throw new Error(res.error || "Sign up failed");
    }
  } catch (error) {
    toast({
      title: "Sign up failed",
      description:
        error instanceof Error ? error.message : "Please check your information and try again",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost" className="gap-1">
          <Bot className="h-5 w-5" />
          <span className="font-bold">ChatMate</span>
        </Button>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Enter your information to create your account</p>
        </div>
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>Choose your account type to get started</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <RadioGroup
                defaultValue="business"
                className="grid grid-cols-2 gap-4"
                value={formData.accountType}
                onValueChange={handleRadioChange}
              >
                <div>
                  <RadioGroupItem value="business" id="business" className="peer sr-only" />
                  <Label
                    htmlFor="business"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Bot className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">Business</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="admin" id="admin" className="peer sr-only" />
                  <Label
                    htmlFor="admin"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Bot className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">Admin</span>
                  </Label>
                </div>
              </RadioGroup>
              <div className="grid gap-2">
                <Label htmlFor="name">Business Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Acme Inc."
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
