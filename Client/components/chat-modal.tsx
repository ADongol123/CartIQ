"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  Truck,
  CreditCard,
  Gift,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  inStock: boolean;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  primaryColor?: string;
}

export function CartModal({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  primaryColor = "#0070f3",
}: CartModalProps) {
  const [promoCode, setPromoCode] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <ShoppingCart
                className="h-6 w-6"
                style={{ color: primaryColor }}
              />
            </motion.div>
            Shopping Cart ({items.length} items)
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cart Items */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600">
                    Add some products to get started!
                  </p>
                </motion.div>
              ) : (
                items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-white/80 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Product Image */}
                    <motion.div
                      className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className="text-lg font-bold"
                          style={{ color: primaryColor }}
                        >
                          ${item.price.toFixed(2)}
                        </span>
                        <Badge
                          variant={item.inStock ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          onUpdateQuantity(
                            item.id,
                            Math.max(0, item.quantity - 1)
                          )
                        }
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </motion.button>

                      <motion.span
                        key={item.quantity}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="w-8 text-center font-semibold"
                      >
                        {item.quantity}
                      </motion.span>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </motion.button>
                    </div>

                    {/* Remove Button */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onRemoveItem(item.id)}
                      className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </motion.button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {items.length > 0 && (
            <>
              <Separator />

              {/* Promo Code */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button variant="outline" className="px-6 bg-transparent">
                    Apply
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Order Summary */}
              <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Order Summary
                </h3>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <motion.span
                    key={total}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    style={{ color: primaryColor }}
                  >
                    ${total.toFixed(2)}
                  </motion.span>
                </div>

                {/* Free Shipping Banner */}
                {subtotal < 50 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div className="flex items-center gap-2 text-blue-700">
                      <Truck className="h-4 w-4" />
                      <span className="text-sm">
                        Add ${(50 - subtotal).toFixed(2)} more for FREE
                        shipping!
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Checkout Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, #8b5cf6)`,
                  }}
                >
                  {isCheckingOut ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <CreditCard className="h-5 w-5 mr-2" />
                  )}
                  {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                </Button>
              </motion.div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Gift className="h-4 w-4" />
                  <span>Free Returns</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="h-4 w-4" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-1">
                  <CreditCard className="h-4 w-4" />
                  <span>Secure Payment</span>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
