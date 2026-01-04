"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Sparkles } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface FantasticCartAnimationProps {
  product: Product;
  onComplete: () => void;
  startPosition?: { x: number; y: number };
  endPosition?: { x: number; y: number };
}

export function FantasticCartAnimation({
  product,
  onComplete,
  startPosition = { x: 50, y: 50 },
  endPosition = { x: 90, y: 10 },
}: FantasticCartAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  useEffect(() => {
    setIsAnimating(true);

    // Generate particles
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: startPosition.x + (Math.random() - 0.5) * 20,
      y: startPosition.y + (Math.random() - 0.5) * 20,
    }));
    setParticles(newParticles);

    // Complete animation
    const timer = setTimeout(() => {
      setIsAnimating(false);
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete, startPosition.x, startPosition.y]);

  if (!isAnimating) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Main Product Animation */}
      <motion.div
        className="absolute"
        style={{
          left: `${startPosition.x}%`,
          top: `${startPosition.y}%`,
        }}
        animate={{
          x: [`0vw`, `${endPosition.x - startPosition.x}vw`],
          y: [`0vh`, `${endPosition.y - startPosition.y}vh`],
          scale: [1, 0.8, 0.6, 0.4, 0.2],
          rotate: [0, 180, 360, 540, 720],
        }}
        transition={{
          duration: 1.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <motion.div
          className="relative"
          animate={{
            boxShadow: [
              "0 0 0 rgba(59, 130, 246, 0)",
              "0 0 20px rgba(59, 130, 246, 0.5)",
              "0 0 40px rgba(59, 130, 246, 0.8)",
              "0 0 20px rgba(59, 130, 246, 0.5)",
              "0 0 0 rgba(59, 130, 246, 0)",
            ],
          }}
          transition={{ duration: 1.5 }}
        >
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-20 h-20 rounded-lg border-2 border-white shadow-lg"
          />

          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg opacity-30 blur-sm"
            animate={{
              scale: [1, 1.2, 1.4, 1.2, 1],
              opacity: [0.3, 0.6, 0.8, 0.6, 0.3],
            }}
            transition={{ duration: 1.5 }}
          />
        </motion.div>
      </motion.div>

      {/* Particle Effects */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [1, 0.8, 0],
              x: [0, (Math.random() - 0.5) * 200],
              y: [0, (Math.random() - 0.5) * 200],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 1.2,
              delay: particle.id * 0.05,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Sparkle Effects */}
      <AnimatePresence>
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${startPosition.x + (Math.random() - 0.5) * 30}%`,
              top: `${startPosition.y + (Math.random() - 0.5) * 30}%`,
            }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1,
              delay: i * 0.1,
              ease: "easeOut",
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Trail Effect */}
      <motion.div
        className="absolute"
        style={{
          left: `${startPosition.x}%`,
          top: `${startPosition.y}%`,
        }}
        animate={{
          x: [`0vw`, `${endPosition.x - startPosition.x}vw`],
          y: [`0vh`, `${endPosition.y - startPosition.y}vh`],
        }}
        transition={{
          duration: 1.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <motion.div
          className="w-1 h-20 bg-gradient-to-b from-blue-500 to-transparent rounded-full"
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{ duration: 1.5 }}
        />
      </motion.div>

      {/* Success Message */}
      <motion.div
        className="absolute top-20 right-4"
        initial={{ opacity: 0, x: 50, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 50, scale: 0.8 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.div>
          <div>
            <div className="font-semibold">Added to cart!</div>
            <div className="text-sm opacity-90">{product.name}</div>
          </div>
        </div>
      </motion.div>

      {/* Cart Bounce Effect */}
      <motion.div
        className="absolute"
        style={{
          left: `${endPosition.x}%`,
          top: `${endPosition.y}%`,
        }}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          delay: 1.4,
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        <motion.div
          className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(59, 130, 246, 0.7)",
              "0 0 0 10px rgba(59, 130, 246, 0)",
              "0 0 0 20px rgba(59, 130, 246, 0)",
            ],
          }}
          transition={{
            delay: 1.4,
            duration: 0.6,
          }}
        >
          <ShoppingCart className="w-4 h-4 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
}
