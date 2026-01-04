"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { TenantPageHeader } from "@/components/tenant-page-header";
import { ChatbotTemplateSelector } from "@/components/chatbot-template-selector";
import { ChatbotPreview } from "@/components/chatbot-preview";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Palette,
  Settings,
  Eye,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Target,
  Rocket,
} from "lucide-react";
import withAuth from "@/app/hoc/withAuth";
import { createChatbot } from "@/services/chat_service";
import { useToast } from "@/hooks/use-toast";
import { getAuthToken } from "@/services/auth_service";

const steps = [
  {
    id: "basic",
    title: "Basic Info",
    icon: Bot,
    description: "Configure your chatbot's identity",
  },
  {
    id: "appearance",
    title: "Appearance",
    icon: Palette,
    description: "Customize the visual design",
  },
  {
    id: "behavior",
    title: "Behavior",
    icon: Settings,
    description: "Set interaction preferences",
  },
  {
    id: "preview",
    title: "Preview",
    icon: Eye,
    description: "Test and deploy your chatbot",
  },
];

const CreateChatbotPage = () => {
  const [currentStep, setCurrentStep] = useState("basic");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    templates: [] as string[],
    primaryColor: "#0070f3",
    secondaryColor: "#f5f5f5",
    welcomeMessage: "Hi there! How can I help you today?",
    autoShow: false,
    delayTime: 5,
    collectEmail: true,
    fallbackContact: true,
  });

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
  const currentStepData = steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / steps.length) * 100;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  const handleStepChange = (stepId: string) => {
    setCurrentStep(stepId);
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      const nextStep = steps[currentStepIndex + 1].id;
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      handleStepChange(nextStep);
    }
  };
  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      const prevStep = steps[currentStepIndex - 1].id;
      handleStepChange(prevStep);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const validateStep = (step: string) => {
    const newErrors: { [key: string]: string } = {};

    if (step === "basic") {
      if (!formData.name.trim()) newErrors.name = "Chatbot name is required";
      if (formData.name.length < 3)
        newErrors.name = "Name must be at least 3 characters";
      if (formData.templates.length === 0)
        newErrors.templates = "Select at least one template";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleDeploy = async () => {
    if (!validateStep("behavior")) return; // Final check
    try {
      setLoading(true);
      const res = await createChatbot(formData);
      if (res.success) {
        toast({
          title: "Bot Created Sucessfully",
        });
      } else {
        toast({
          title: "Failed to create Chatbot",
        });
      }
    } catch (err) {
      toast({
        title: `An error occured : ${err}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Fixed Background */}
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
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TenantPageHeader
            title="Create Chatbot"
            description="Build your AI-powered assistant in minutes"
          />
        </motion.div>

        {/* Progress Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg"
              >
                <currentStepData.icon className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {currentStepData.title}
                </h2>
                <p className="text-gray-600">{currentStepData.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(progress)}%
              </div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>

          <div className="space-y-3">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <motion.button
                  key={step.id}
                  onClick={() => handleStepChange(step.id)}
                  className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      completedSteps.includes(step.id)
                        ? "bg-green-500"
                        : step.id === currentStep
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    }`}
                  />
                  <span
                    className={`text-xs font-medium ${
                      step.id === currentStep
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content with Fixed Height */}
        <div className="min-h-[600px]">
          <Tabs
            value={currentStep}
            onValueChange={handleStepChange}
            className="space-y-6"
          >
            <TabsList className="hidden" />

            <AnimatePresence mode="wait">
              <TabsContent key="basic" value="basic" className="space-y-6 m-0">
                {currentStep === "basic" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-blue-600" />
                          Basic Information
                        </CardTitle>
                        <CardDescription>
                          Configure the basic settings for your chatbot
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="space-y-2"
                        >
                          {currentStep === "basic" && (
                            <div className="space-y-2">
                              <Label>Chatbot Name *</Label>
                              <Input
                                value={formData.name}
                                onChange={(e) =>
                                  updateFormData("name", e.target.value)
                                }
                              />
                              {errors.name && (
                                <p className="text-red-500 text-xs">
                                  {errors.name}
                                </p>
                              )}
                            </div>
                          )}
                          <p className="text-xs text-gray-500">
                            This name will be displayed to your users
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="space-y-2"
                        >
                          <Label
                            htmlFor="chatbot-description"
                            className="text-sm font-medium"
                          >
                            Description
                          </Label>
                          <Textarea
                            id="chatbot-description"
                            placeholder="A helpful assistant for customer support inquiries..."
                            value={formData.description}
                            onChange={(e) =>
                              updateFormData("description", e.target.value)
                            }
                            className="min-h-[100px] bg-white/50 border-white/20 focus:bg-white/80 transition-all duration-300"
                          />
                          <p className="text-xs text-gray-500">
                            Brief description of your chatbot's purpose
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="space-y-2"
                        >
                          <ChatbotTemplateSelector
                            selectedTemplates={formData.templates}
                            onTemplateSelect={(templates) =>
                              updateFormData("templates", templates)
                            }
                          />
                        </motion.div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div></div>
                        <Button
                          onClick={handleNext}
                          disabled={
                            !formData.name.trim() ||
                            formData.templates.length === 0
                          }
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          Continue
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent
                key="appearance"
                value="appearance"
                className="space-y-6 m-0"
              >
                {currentStep === "appearance" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Palette className="h-5 w-5 text-pink-600" />
                          Appearance & Branding
                        </CardTitle>
                        <CardDescription>
                          Customize how your chatbot looks and feels
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="space-y-2"
                          >
                            <Label htmlFor="primary-color">Primary Color</Label>
                            <div className="flex gap-2">
                              <Input
                                id="primary-color"
                                type="color"
                                value={formData.primaryColor}
                                onChange={(e) =>
                                  updateFormData("primaryColor", e.target.value)
                                }
                                className="w-12 p-1"
                              />
                              <Input
                                value={formData.primaryColor}
                                onChange={(e) =>
                                  updateFormData("primaryColor", e.target.value)
                                }
                                className="font-mono bg-white/50"
                              />
                            </div>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-2"
                          >
                            <Label htmlFor="secondary-color">
                              Secondary Color
                            </Label>
                            <div className="flex gap-2">
                              <Input
                                id="secondary-color"
                                type="color"
                                value={formData.secondaryColor}
                                onChange={(e) =>
                                  updateFormData(
                                    "secondaryColor",
                                    e.target.value
                                  )
                                }
                                className="w-12 p-1"
                              />
                              <Input
                                value={formData.secondaryColor}
                                onChange={(e) =>
                                  updateFormData(
                                    "secondaryColor",
                                    e.target.value
                                  )
                                }
                                className="font-mono bg-white/50"
                              />
                            </div>
                          </motion.div>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="chatbot-avatar">Chatbot Avatar</Label>
                          <div className="flex items-center gap-4">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="h-16 w-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                              style={{ backgroundColor: formData.primaryColor }}
                            >
                              AI
                            </motion.div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/50 hover:bg-white/80"
                            >
                              <Sparkles className="mr-2 h-4 w-4" />
                              Upload Image
                            </Button>
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="welcome-message">
                            Welcome Message
                          </Label>
                          <Textarea
                            id="welcome-message"
                            placeholder="Hi there! How can I help you today?"
                            value={formData.welcomeMessage}
                            onChange={(e) =>
                              updateFormData("welcomeMessage", e.target.value)
                            }
                            className="min-h-[100px] bg-white/50 border-white/20 focus:bg-white/80"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200"
                        >
                          <div>
                            <Label
                              htmlFor="show-branding"
                              className="text-sm font-medium"
                            >
                              Show "Powered by" Branding
                            </Label>
                            <p className="text-xs text-gray-500 mt-1">
                              Display attribution in the chatbot interface
                            </p>
                          </div>
                          <Switch id="show-branding" defaultChecked />
                        </motion.div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={handlePrevious}
                          className="bg-white/50 hover:bg-white/80"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Previous
                        </Button>
                        <Button
                          onClick={handleNext}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          Continue
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent
                key="behavior"
                value="behavior"
                className="space-y-6 m-0"
              >
                {currentStep === "behavior" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Settings className="h-5 w-5 text-green-600" />
                          Behavior Settings
                        </CardTitle>
                        <CardDescription>
                          Configure how your chatbot interacts with users
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid gap-6">
                          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                            <div>
                              <Label
                                htmlFor="auto-show"
                                className="text-sm font-medium"
                              >
                                Auto-show Chatbot
                              </Label>
                              <p className="text-xs text-gray-500 mt-1">
                                Automatically open the chatbot when users visit
                                your page
                              </p>
                            </div>
                            <Switch
                              id="auto-show"
                              checked={formData.autoShow}
                              onCheckedChange={(checked) =>
                                updateFormData("autoShow", checked)
                              }
                            />
                          </div>

                          <div className="space-y-3">
                            <Label
                              htmlFor="delay-time"
                              className="text-sm font-medium"
                            >
                              Delay Time (seconds)
                            </Label>
                            <Input
                              id="delay-time"
                              type="number"
                              min="0"
                              max="60"
                              value={formData.delayTime}
                              onChange={(e) =>
                                updateFormData(
                                  "delayTime",
                                  Number.parseInt(e.target.value)
                                )
                              }
                              className="bg-white/50 border-white/20 focus:bg-white/80"
                            />
                            <p className="text-xs text-gray-500">
                              Time to wait before showing the chatbot
                              automatically
                            </p>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                            <div>
                              <Label
                                htmlFor="collect-email"
                                className="text-sm font-medium"
                              >
                                Collect User Email
                              </Label>
                              <p className="text-xs text-gray-500 mt-1">
                                Ask users for their email before starting a
                                conversation
                              </p>
                            </div>
                            <Switch
                              id="collect-email"
                              checked={formData.collectEmail}
                              onCheckedChange={(checked) =>
                                updateFormData("collectEmail", checked)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                            <div>
                              <Label
                                htmlFor="fallback-contact"
                                className="text-sm font-medium"
                              >
                                Fallback to Contact Form
                              </Label>
                              <p className="text-xs text-gray-500 mt-1">
                                Show a contact form when the chatbot can't
                                answer a question
                              </p>
                            </div>
                            <Switch
                              id="fallback-contact"
                              checked={formData.fallbackContact}
                              onCheckedChange={(checked) =>
                                updateFormData("fallbackContact", checked)
                              }
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={handlePrevious}
                          className="bg-white/50 hover:bg-white/80"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Previous
                        </Button>
                        <Button
                          onClick={handleNext}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          Continue
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent
                key="preview"
                value="preview"
                className="space-y-6 m-0"
              >
                {currentStep === "preview" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Eye className="h-5 w-5 text-indigo-600" />
                          Preview & Deploy
                        </CardTitle>
                        <CardDescription>
                          Test your chatbot and deploy it to your website
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-8 lg:grid-cols-2">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="h-[600px] rounded-xl border-2 border-gray-200 bg-gray-50 overflow-hidden shadow-inner"
                          >
                            <ChatbotPreview config={formData} />
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-6"
                          >
                            <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Rocket className="h-5 w-5 text-blue-500" />
                                Ready to Deploy?
                              </h3>
                              <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                  <span className="text-sm text-gray-700">
                                    Chatbot configured
                                  </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                  <span className="text-sm text-gray-700">
                                    Appearance customized
                                  </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                  <span className="text-sm text-gray-700">
                                    Behavior settings applied
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                              <h3 className="font-semibold text-gray-900 mb-4">
                                Installation Code
                              </h3>
                              <p className="text-sm text-gray-600 mb-4">
                                Add this code snippet to your website to embed
                                the chatbot:
                              </p>
                              <div className="relative">
                                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto font-mono">
                                  {`<script>
  (function(d,s,id){
    var js,fjs=d.getElementsByTagName(s)[0];
    if(d.getElementById(id))return;
    js=d.createElement(s);js.id=id;
    js.src="https://chatbotsaas.com/embed.js";
    js.setAttribute('data-chatbot-id','${formData.name
      .toLowerCase()
      .replace(/\s+/g, "-")}-${Date.now()}');
    fjs.parentNode.insertBefore(js,fjs);
  })(document,'script','chatbot-embed');
</script>`}
                                </pre>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                                >
                                  Copy
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={handlePrevious}
                          className="bg-white/50 hover:bg-white/80"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Previous
                        </Button>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            onClick={handleDeploy}
                            disabled={loading}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
                          >
                            <Rocket className="mr-2 h-4 w-4" />
                            {loading ? "Deploying..." : "Deploy Chatbot"}
                          </Button>
                        </motion.div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )}
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default withAuth(CreateChatbotPage);
