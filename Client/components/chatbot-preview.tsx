"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { EnhancedProductCard } from "@/components/enhanced-product-card";
import { ProductDetailsModal } from "@/components/product-details-modal";

import { PaymentChatUI } from "@/components/payment-chat-ui";
import { motion, AnimatePresence } from "framer-motion";
import { FantasticCartAnimation } from "./fantastic-card-animation";
import { CartModal } from "./chat-modal";

interface Message {
  role: "user" | "bot";
  content: string;
  timestamp: Date;
  product?: Product;
  showPayment?: boolean;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  description: string;
  inStock: boolean;
  originalPrice?: number;
  features?: string[];
  specifications?: { [key: string]: string };
  images?: string[];
  reviews?: {
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

interface CartItem extends Product {
  quantity: number;
}

interface ChatbotPreviewConfig {
  name?: string;
  primaryColor?: string;
  secondaryColor?: string;
  welcomeMessage?: string;
  templates?: string[];
}

interface ChatbotPreviewProps {
  config?: ChatbotPreviewConfig;
}

export function ChatbotPreview({ config = {} }: ChatbotPreviewProps) {
  const {
    name = "AI Assistant",
    primaryColor = "#0070f3",
    secondaryColor = "#f5f5f5",
    welcomeMessage = "Hi there! How can I help you today?",
    templates = ["general-assistant"],
  } = config;

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: welcomeMessage,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [animatingProduct, setAnimatingProduct] = useState<Product | null>(
    null
  );
  const [showPayment, setShowPayment] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Enhanced sample products with more details
  const products: Product[] = [
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      price: 99.99,
      originalPrice: 129.99,
      image: "/wireless-bluetooth-headphones.jpg",
      images: [
        "/wireless-bluetooth-headphones.jpg",
        "/placeholder.svg?height=300&width=300",
      ],
      rating: 4.5,
      description:
        "Premium quality wireless headphones with noise cancellation and 30-hour battery life.",
      inStock: true,
      features: [
        "Noise Cancellation",
        "30hr Battery",
        "Quick Charge",
        "Bluetooth 5.0",
      ],
      specifications: {
        "Battery Life": "30 hours",
        "Charging Time": "2 hours",
        "Bluetooth Version": "5.0",
        Weight: "250g",
        Warranty: "2 years",
      },
      reviews: [
        {
          id: "1",
          user: "John D.",
          rating: 5,
          comment: "Amazing sound quality and battery life!",
          date: "2024-01-15",
        },
        {
          id: "2",
          user: "Sarah M.",
          rating: 4,
          comment: "Great headphones, very comfortable for long use.",
          date: "2024-01-10",
        },
      ],
    },
    {
      id: "2",
      name: "Smart Fitness Watch",
      price: 249.99,
      originalPrice: 299.99,
      image: "/smart-fitness-watch.png",
      images: [
        "/smart-fitness-watch.png",
        "/placeholder.svg?height=300&width=300",
      ],
      rating: 4.8,
      description:
        "Advanced fitness tracking with heart rate monitor, GPS, and 7-day battery life.",
      inStock: true,
      features: [
        "Heart Rate Monitor",
        "GPS Tracking",
        "7-day Battery",
        "Water Resistant",
      ],
      specifications: {
        Display: "1.4 inch AMOLED",
        "Battery Life": "7 days",
        "Water Resistance": "5ATM",
        Sensors: "Heart Rate, GPS, Accelerometer",
        Compatibility: "iOS & Android",
      },
      reviews: [
        {
          id: "1",
          user: "Mike R.",
          rating: 5,
          comment: "Perfect for tracking my workouts and daily activities.",
          date: "2024-01-20",
        },
      ],
    },
    {
      id: "3",
      name: "Portable Laptop Stand",
      price: 39.99,
      originalPrice: 59.99,
      image: "/portable-laptop-stand.jpg",
      images: [
        "/portable-laptop-stand.jpg",
        "/placeholder.svg?height=300&width=300",
      ],
      rating: 4.3,
      description:
        "Ergonomic aluminum laptop stand that's lightweight and adjustable.",
      inStock: false,
      features: [
        "Aluminum Build",
        "Adjustable Height",
        "Portable",
        "Heat Dissipation",
      ],
      specifications: {
        Material: "Aluminum Alloy",
        Weight: "1.2kg",
        Compatibility: "11-17 inch laptops",
        "Adjustable Height": "6 levels",
        Foldable: "Yes",
      },
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getTemplateResponse = (
    query: string
  ): { message: string; product?: Product; showPayment?: boolean } => {
    const lowerQuery = query.toLowerCase();

    // Payment-related queries
    if (
      lowerQuery.includes("checkout") ||
      lowerQuery.includes("pay now") ||
      lowerQuery.includes("payment")
    ) {
      if (cart.length === 0) {
        return {
          message:
            "Your cart is empty! Add some products first before checkout.",
        };
      }
      return {
        message:
          "Great! Let's proceed with your secure payment. Please fill in your payment details below:",
        showPayment: true,
      };
    }

    // Check if sales assistant is in templates
    if (templates.includes("sales-assistant")) {
      if (lowerQuery.includes("headphone") || lowerQuery.includes("audio")) {
        return {
          message:
            "I found these excellent wireless headphones for you! They're perfect for music and calls with amazing noise cancellation.",
          product: products[0],
        };
      }
      if (lowerQuery.includes("watch") || lowerQuery.includes("fitness")) {
        return {
          message:
            "Here's our top-rated fitness watch! It's great for tracking your health and workouts with advanced sensors.",
          product: products[1],
        };
      }
      if (lowerQuery.includes("laptop") || lowerQuery.includes("stand")) {
        return {
          message:
            "This laptop stand is perfect for improving your workspace ergonomics. Unfortunately, it's currently out of stock, but I can notify you when it's available!",
          product: products[2],
        };
      }
    }

    // Check if customer support is in templates
    if (templates.includes("customer-support")) {
      if (lowerQuery.includes("help") || lowerQuery.includes("support")) {
        return {
          message:
            "I'm here to help! You can ask me about our products, shipping, returns, or any other questions you might have. I can also connect you with a human agent if needed.",
        };
      }
      if (lowerQuery.includes("order") || lowerQuery.includes("shipping")) {
        return {
          message:
            "For order inquiries, I can help you track your shipment, update delivery preferences, or process returns. What's your order number?",
        };
      }
    }

    // Check if lead generation is in templates
    if (templates.includes("lead-generation")) {
      if (lowerQuery.includes("demo") || lowerQuery.includes("trial")) {
        return {
          message:
            "I'd be happy to set up a demo for you! Can you tell me a bit about your business and what you're looking for? I can also collect your contact information for our sales team.",
        };
      }
      if (lowerQuery.includes("price") || lowerQuery.includes("cost")) {
        return {
          message:
            "Our pricing is flexible based on your needs. Would you like me to connect you with our sales team for a custom quote? I can also schedule a consultation call.",
        };
      }
    }

    // General responses based on multiple templates
    if (templates.length > 1) {
      return {
        message: `I'm a versatile AI assistant with capabilities in ${templates
          .map((t) => t.replace("-", " "))
          .join(
            ", "
          )}. I can help with product recommendations, customer support, lead generation, and more! What would you like assistance with?`,
      };
    }

    // Default general assistant response
    return {
      message:
        "I'm here to help! Feel free to ask me anything about our products or services.",
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const response = getTemplateResponse(inputValue);
      const botMessage: Message = {
        role: "bot",
        content: response.message,
        timestamp: new Date(),
        product: response.product,
        showPayment: response.showPayment,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const addToCart = (product: Product) => {
    if (!product.inStock) return;

    setAnimatingProduct(product);

    setTimeout(() => {
      setCart((prev) => {
        const existingItem = prev.find((item) => item.id === product.id);
        if (existingItem) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      setAnimatingProduct(null);
    }, 1000);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
      return;
    }

    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    return subtotal + shipping + tax;
  };

  const handlePaymentComplete = (paymentData: any) => {
    setShowPayment(false);
    setCart([]);

    // Add success message
    const successMessage: Message = {
      role: "bot",
      content:
        "🎉 Payment successful! Your order has been confirmed and you'll receive an email confirmation shortly. Thank you for your purchase!",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, successMessage]);
  };

  return (
    <>
      <div className="flex h-full w-full flex-col bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden rounded-xl">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            style={{ backgroundColor: primaryColor }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between border-b bg-white/80 backdrop-blur-sm p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-blue-500/20">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="Chatbot"
              />
              <AvatarFallback
                style={{ backgroundColor: primaryColor }}
                className="text-white"
              >
                <Bot className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">{name}</h3>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <motion.div
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                Online
              </p>
            </div>
          </div>

          {/* Cart Button (for sales template) */}
          {templates.includes("sales-assistant") && (
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className="relative bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:scale-105"
                onClick={() => setShowCart(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs animate-bounce">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4 bg-white/30 backdrop-blur-sm">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div className="max-w-[80%] space-y-2">
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 shadow-sm",
                      message.role === "user"
                        ? "text-white ml-auto"
                        : "bg-white/90 backdrop-blur-sm text-gray-900 border"
                    )}
                    style={
                      message.role === "user"
                        ? {
                            background: `linear-gradient(135deg, ${primaryColor}, #8b5cf6)`,
                          }
                        : {}
                    }
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className="mt-2 text-right text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {/* Enhanced Product Card */}
                  {message.product && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <EnhancedProductCard
                        product={message.product}
                        onAddToCart={() => addToCart(message.product!)}
                        onViewDetails={() =>
                          handleViewDetails(message.product!)
                        }
                        primaryColor={primaryColor}
                      />
                    </motion.div>
                  )}

                  {/* Payment Interface */}
                  {message.showPayment && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <PaymentChatUI
                        total={getCartTotal()}
                        onPaymentComplete={handlePaymentComplete}
                        primaryColor={primaryColor}
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-start"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border">
                  <div className="flex items-center gap-1">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      AI is typing...
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="relative z-10 border-t bg-white/80 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Input
                placeholder={`Ask ${name} anything...`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pr-12 bg-white/90 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-full"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="absolute right-1 top-1 h-8 w-8 rounded-full disabled:opacity-50 transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, #8b5cf6)`,
                }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mt-2 text-center text-xs text-gray-500">
            {templates.includes("sales-assistant") &&
              "Try asking: 'Show me headphones', 'I need a fitness watch', or 'Checkout'"}
            {templates.includes("customer-support") &&
              !templates.includes("sales-assistant") &&
              "Try asking: 'I need help with my order' or 'How do I return an item?'"}
            {templates.includes("lead-generation") &&
              !templates.includes("sales-assistant") &&
              !templates.includes("customer-support") &&
              "Try asking: 'I want a demo' or 'What are your prices?'"}
            {templates.length > 1 &&
              "I can help with sales, support, lead generation and more!"}
            {templates.length === 1 &&
              templates[0] === "general-assistant" &&
              "Ask me anything about our products or services!"}
          </div>
        </div>

        {/* Fantastic Cart Animation */}
        {animatingProduct && (
          <FantasticCartAnimation
            product={animatingProduct}
            onComplete={() => setAnimatingProduct(null)}
            startPosition={{ x: 50, y: 50 }}
            endPosition={{ x: 85, y: 15 }}
          />
        )}
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={showProductDetails}
        onClose={() => setShowProductDetails(false)}
        onAddToCart={() => {
          if (selectedProduct) {
            addToCart(selectedProduct);
            setShowProductDetails(false);
          }
        }}
        primaryColor={primaryColor}
      />

      {/* Cart Modal */}
      <CartModal
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        items={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        primaryColor={primaryColor}
      />
    </>
  );
}
