"use client";

import type React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/services/auth_service";
import withAuth from "../hoc/withAuth";

const LoginPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     // Validate form
  //     if (!formData.email || !formData.password) {
  //       throw new Error("Please fill in all fields");
  //     }

  //     // Call backend login
  //     const payload = {
  //       username: formData.email,
  //       password: formData.password,
  //     };

  //     const res = await login(payload);

  //     if (res.data.token) {
  //       // Token is already saved inside setAuthToken
  //       toast({
  //         title: "Login successful",
  //         description: `Welcome back!`,
  //       });

  //       // Redirect based on email (example logic)
  //       const isAdmin = formData.email.includes("admin");
  //       router.push(isAdmin ? "/admin/dashboard" : "/dashboard");
  //     } else {
  //       throw new Error("Invalid credentials");
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Login failed",
  //       description:
  //         error instanceof Error
  //           ? error.message
  //           : "Please check your credentials and try again",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
    toast({
      title: "Login successful",
      description: `Welcome back!`,
    });
  };
  return (
    <motion.div
      className="container flex h-screen w-screen flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Floating Bot Icon */}
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Button variant="ghost" className="gap-1">
            <Bot className="h-6 w-6 text-primary" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-bold"
            >
              ChatMate
            </motion.span>
          </Button>
        </motion.div>
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {/* Animated Heading */}
        <motion.div
          className="flex flex-col space-y-2 text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <motion.h1
            className="text-2xl font-semibold tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Welcome back
          </motion.h1>
          <motion.p
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Enter your credentials to sign in to your account
          </motion.p>
        </motion.div>

        {/* Animated Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-2xl">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle className="text-xl">Sign In</CardTitle>
                <CardDescription>
                  Choose your account type to continue
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid gap-2"
                >
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
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="grid gap-2"
                >
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center space-x-2"
                >
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </motion.div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full"
                >
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center text-sm"
                >
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Sign up
                  </Link>
                </motion.div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>

        <motion.div
          className="text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>Demo credentials:</p>
          <p>Admin: admin@example.com / password</p>
          <p>Business: business@example.com / password</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
