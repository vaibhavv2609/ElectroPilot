import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Check, Star, X, Sparkles, Brain, ShoppingBag } from "lucide-react";
import { FaAmazon } from "react-icons/fa";
import type { Product } from "@shared/schema";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onBuyClick: () => void;
}

export function ProductModal({ product, isOpen, onClose, onBuyClick }: ProductModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-screen overflow-y-auto bg-black/95 border-white/20 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-white glow-text flex items-center">
            <Sparkles className="mr-3 text-primary" />
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative group">
            <div className="cyber-card overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4">
                <div className="bg-accent/90 backdrop-blur-xl text-white px-3 py-1 rounded-full text-sm font-bold">
                  AI Match
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Price and Rating */}
            <div className="cyber-card p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl font-black text-white glow-text">
                  {product.price}
                </span>
                <div className="flex items-center bg-white/10 backdrop-blur-xl rounded-full px-4 py-2">
                  <div className="flex items-center text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                      />
                    ))}
                  </div>
                  <span className="text-white font-semibold">
                    {product.rating}
                  </span>
                </div>
              </div>
              
              <p className="text-white/80 text-lg leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Key Features */}
            <div className="cyber-card p-6">
              <h3 className="font-black text-white mb-4 text-xl flex items-center">
                <Check className="mr-2 text-success" />
                Key Features
              </h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start group">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 group-hover:glow-purple transition-all duration-300"></div>
                    <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Recommendation */}
            {product.aiRecommendation && (
              <div className="cyber-card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 p-6">
                <h3 className="font-black text-white mb-3 text-xl flex items-center">
                  <Brain className="mr-2 text-primary floating-animation" />
                  AI Recommendation
                </h3>
                <p className="text-white/90 leading-relaxed italic">
                  "{product.aiRecommendation}"
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={onBuyClick}
                className="w-full neon-button text-white font-bold py-4 px-6 text-lg"
              >
                <FaAmazon className="mr-3 h-5 w-5" />
                Buy on Amazon - {product.price}
              </button>
              
              <Button
                variant="secondary"
                className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 py-4 text-lg backdrop-blur-xl transition-all duration-300"
                onClick={onClose}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Continue Browsing
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}