"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Info, Heart, Share2 } from "lucide-react";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  description: string;
  inStock: boolean;
  originalPrice?: number;
  discount?: number;
  features?: string[];
  specifications?: { [key: string]: string };
}

interface EnhancedProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onViewDetails: () => void;
  primaryColor?: string;
}

export function EnhancedProductCard({
  product,
  onAddToCart,
  onViewDetails,
  primaryColor = "#0070f3",
}: EnhancedProductCardProps) {
  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Card className="overflow-hidden bg-white/95 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 relative">
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute top-3 left-3 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold"
          >
            -{discountPercentage}%
          </motion.div>
        )}

        {/* Stock Status */}
        {!product.inStock && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-3 right-3 z-10 bg-gray-800 text-white px-2 py-1 rounded-full text-xs font-medium"
          >
            Out of Stock
          </motion.div>
        )}

        {/* Product Image */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <motion.img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
          />

          {/* Overlay Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/20 flex items-center justify-center gap-2 transition-opacity duration-300"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <Heart className="h-4 w-4 text-gray-600" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <Share2 className="h-4 w-4 text-gray-600" />
            </motion.button>
          </motion.div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Product Name */}
            <div>
              <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {product.description}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.rating})</span>
              <Badge
                variant="secondary"
                className="text-xs bg-green-100 text-green-800"
              >
                ⚡ Fast Delivery
              </Badge>
            </div>

            {/* Features */}
            {product.features && (
              <div className="flex flex-wrap gap-1">
                {product.features.slice(0, 3).map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Badge
                      variant="outline"
                      className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                    >
                      {feature}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Price Section */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="text-2xl font-bold text-blue-600"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    ${product.price.toFixed(2)}
                  </motion.div>
                  {product.originalPrice && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-gray-500 line-through"
                    >
                      ${product.originalPrice.toFixed(2)}
                    </motion.div>
                  )}
                </div>
                {discountPercentage > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-green-600 font-medium"
                  >
                    You save $
                    {(product.originalPrice! - product.price).toFixed(2)}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={onAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300"
                  style={
                    product.inStock
                      ? {
                          background: `linear-gradient(135deg, ${primaryColor}, #8b5cf6)`,
                        }
                      : {}
                  }
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "Add to Cart" : "Notify Me"}
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onViewDetails}
                  className="bg-white/80 hover:bg-white border-gray-200 hover:border-blue-300 transition-all duration-300"
                >
                  <Info className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </CardContent>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}10, #8b5cf610)`,
          }}
        />
      </Card>
    </motion.div>
  );
}
