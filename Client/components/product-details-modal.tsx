"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Award } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Product {
  id: string
  name: string
  price: number
  image: string
  rating: number
  description: string
  inStock: boolean
  originalPrice?: number
  features?: string[]
  specifications?: { [key: string]: string }
  images?: string[]
  reviews?: {
    id: string
    user: string
    rating: number
    comment: string
    date: string
  }[]
}

interface ProductDetailsModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: () => void
  primaryColor?: string
}

export function ProductDetailsModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  primaryColor = "#0070f3",
}: ProductDetailsModalProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const images = product.images || [product.image]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
              layoutId={`product-image-${product.id}`}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {/* Discount Badge */}
              {discountPercentage > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                >
                  -{discountPercentage}% OFF
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
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
              </div>
            </motion.div>

            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-blue-500" : "border-gray-200"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Rating and Stock */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.rating})</span>
              </div>
              <Badge
                variant={product.inStock ? "default" : "destructive"}
                className={product.inStock ? "bg-green-100 text-green-800" : ""}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <motion.div
                  className="text-3xl font-bold text-blue-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  ${product.price.toFixed(2)}
                </motion.div>
                {product.originalPrice && (
                  <div className="text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</div>
                )}
              </div>
              {discountPercentage > 0 && (
                <div className="text-green-600 font-medium">
                  You save ${(product.originalPrice! - product.price).toFixed(2)} ({discountPercentage}% off)
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Features */}
            {product.features && (
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Key Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {feature}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-medium text-gray-900">Quantity:</label>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={onAddToCart}
                  disabled={!product.inStock}
                  className="w-full h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  style={
                    product.inStock
                      ? {
                          background: `linear-gradient(135deg, ${primaryColor}, #8b5cf6)`,
                        }
                      : {}
                  }
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.inStock ? `Add ${quantity} to Cart` : "Notify When Available"}
                </Button>
              </motion.div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="h-4 w-4 text-green-600" />
                Free Shipping
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-blue-600" />2 Year Warranty
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <RotateCcw className="h-4 w-4 text-purple-600" />
                30-Day Returns
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award className="h-4 w-4 text-yellow-600" />
                Best Seller
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Tabs */}
        <Tabs defaultValue="specifications" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>

          <TabsContent value="specifications" className="mt-4">
            <div className="space-y-3">
              {product.specifications ? (
                Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No specifications available.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-4">
              {product.reviews ? (
                product.reviews.map((review) => (
                  <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.user}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{review.comment}</p>
                    <span className="text-xs text-gray-500 mt-2 block">{review.date}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="mt-4">
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Free Standard Shipping</h4>
                <p className="text-green-700 text-sm">Delivered in 3-5 business days</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Express Shipping - $9.99</h4>
                <p className="text-blue-700 text-sm">Delivered in 1-2 business days</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
