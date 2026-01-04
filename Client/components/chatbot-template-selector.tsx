"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bot,
  ShoppingCart,
  HeadphonesIcon,
  Zap,
  Target,
  Check,
  Plus,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChatbotTemplateSelectorProps {
  selectedTemplates?: string[];
  onTemplateSelect?: (templateIds: string[]) => void;
}

const templates = [
  {
    id: "customer-support",
    name: "Customer Support",
    description:
      "Handle customer inquiries, support tickets, and provide instant help",
    icon: HeadphonesIcon,
    color: "from-blue-500 to-cyan-500",
    features: [
      "FAQ Handling",
      "Ticket Creation",
      "Live Chat Handoff",
      "24/7 Support",
    ],
    capabilities: [
      "Answer common questions instantly",
      "Create support tickets automatically",
      "Escalate complex issues to human agents",
      "Track customer satisfaction",
    ],
  },
  {
    id: "sales-assistant",
    name: "Sales Assistant",
    description:
      "Help customers find products, make purchases, and increase conversions",
    icon: ShoppingCart,
    color: "from-green-500 to-emerald-500",
    features: [
      "Product Recommendations",
      "Order Tracking",
      "Upselling",
      "Cart Recovery",
    ],
    capabilities: [
      "Recommend products based on preferences",
      "Guide customers through purchase process",
      "Recover abandoned shopping carts",
      "Provide order status updates",
    ],
  },
  {
    id: "lead-generation",
    name: "Lead Generation",
    description:
      "Capture leads, qualify prospects, and grow your customer base",
    icon: Target,
    color: "from-purple-500 to-pink-500",
    features: ["Lead Capture", "Qualification", "CRM Integration", "Follow-up"],
    capabilities: [
      "Collect visitor information intelligently",
      "Qualify leads with smart questions",
      "Integrate with your CRM system",
      "Schedule follow-up appointments",
    ],
  },
  {
    id: "general-assistant",
    name: "General Assistant",
    description: "Multi-purpose chatbot for various business needs and tasks",
    icon: Bot,
    color: "from-orange-500 to-red-500",
    features: ["Custom Responses", "Multi-language", "Analytics", "Flexible"],
    capabilities: [
      "Handle diverse conversation topics",
      "Support multiple languages",
      "Provide detailed analytics",
      "Customize for any business need",
    ],
  },
];

export function ChatbotTemplateSelector({
  selectedTemplates = [],
  onTemplateSelect,
}: ChatbotTemplateSelectorProps) {
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  const toggleTemplate = (templateId: string) => {
    const newSelection = selectedTemplates.includes(templateId)
      ? selectedTemplates.filter((id) => id !== templateId)
      : [...selectedTemplates, templateId];

    onTemplateSelect?.(newSelection);
  };

  const selectAllTemplates = () => {
    onTemplateSelect?.(templates.map((t) => t.id));
  };

  const clearAllTemplates = () => {
    onTemplateSelect?.([]);
  };

  return (
    <div className="space-y-6">
      {/* Header with bulk actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Choose Capabilities
          </h3>
          <p className="text-sm text-gray-600">
            Select multiple templates to create a versatile AI agent
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={selectAllTemplates}
            className="bg-white/50 hover:bg-white/80"
          >
            <Plus className="h-4 w-4 mr-1" />
            Select All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllTemplates}
            className="bg-white/50 hover:bg-white/80"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {templates.map((template, index) => {
          const isSelected = selectedTemplates.includes(template.id);

          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredTemplate(template.id)}
              onHoverEnd={() => setHoveredTemplate(null)}
            >
              <Card
                className={cn(
                  "cursor-pointer transition-all duration-300 bg-white/60 backdrop-blur-sm border-white/20 hover:shadow-xl relative overflow-hidden",
                  isSelected
                    ? "ring-2 ring-blue-500 shadow-lg bg-white/80 border-blue-200"
                    : "hover:shadow-lg hover:bg-white/70"
                )}
                onClick={() => toggleTemplate(template.id)}
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br",
                    template.color
                  )}
                  animate={{
                    opacity: isSelected
                      ? 0.1
                      : hoveredTemplate === template.id
                      ? 0.08
                      : 0.05,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Selection Indicator */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      className="absolute top-3 right-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Selection Count Badge */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium"
                  >
                    #{selectedTemplates.indexOf(template.id) + 1}
                  </motion.div>
                )}

                <CardHeader className="pb-3 relative z-10">
                  <div className="flex items-start gap-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={cn(
                        "p-3 rounded-xl bg-gradient-to-r shadow-lg transition-all duration-300",
                        template.color,
                        isSelected && "scale-110"
                      )}
                    >
                      <template.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                        {template.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 leading-relaxed">
                        {template.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 relative z-10">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {template.features.map((feature) => (
                        <Badge
                          key={feature}
                          variant="secondary"
                          className={cn(
                            "text-xs border-0 transition-all duration-300",
                            isSelected
                              ? "bg-blue-100 text-blue-700"
                              : "bg-white/50 text-gray-700"
                          )}
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    {/* Expandable Capabilities */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height:
                          hoveredTemplate === template.id || isSelected
                            ? "auto"
                            : 0,
                        opacity:
                          hoveredTemplate === template.id || isSelected ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 border-t border-gray-200/50">
                        <h4 className="text-xs font-medium text-gray-700 mb-2 flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          Key Capabilities:
                        </h4>
                        <ul className="space-y-1">
                          {template.capabilities.map((capability, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="text-xs text-gray-600 flex items-start gap-2"
                            >
                              <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
                              {capability}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Templates Summary */}
      <AnimatePresence>
        {selectedTemplates.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl border border-blue-200"
          >
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
              >
                <Bot className="h-5 w-5 text-white" />
              </motion.div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Selected Capabilities ({selectedTemplates.length}/4)
                </h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedTemplates.map((templateId) => {
                    const template: any = templates.find(
                      (t) => t.id === templateId
                    );
                    return (
                      <motion.div
                        key={templateId}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2 bg-white/70 px-3 py-1 rounded-full border"
                      >
                        <template.icon className="h-3 w-3" />
                        <span className="text-xs font-medium">
                          {template?.name}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTemplate(templateId);
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
                <p className="text-sm text-gray-700">
                  Your AI agent will be able to handle{" "}
                  <span className="font-semibold text-blue-700">
                    {selectedTemplates
                      .map((id) =>
                        templates.find((t) => t.id === id)?.name.toLowerCase()
                      )
                      .join(", ")}
                  </span>{" "}
                  tasks intelligently by understanding user intent and context.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
