import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductModal } from "@/components/product-modal";
import { RefreshCw, Info, Star } from "lucide-react";
import { FaAmazon } from "react-icons/fa";
import type { Product } from "@shared/schema";

export default function Results() {
  const { userId } = useParams<{ userId: string }>();
  const [, navigate] = useLocation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: recommendations, isLoading, error } = useQuery({
    queryKey: ['/api/recs', userId],
    enabled: !!userId,
  });

  const handleStartNew = () => {
    navigate('/');
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const openAffiliateLink = (affiliateLink: string) => {
    window.open(affiliateLink, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative text-center z-10">
          <div className="cyber-card p-12">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-white mb-4">Finalizing Your AI Recommendations</h2>
            <p className="text-white/70">Analyzing your preferences and curating perfect matches...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !recommendations) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="cyber-card p-12 max-w-2xl mx-4 text-center">
            <div className="text-6xl mb-6">🤖</div>
            <h2 className="text-3xl font-black text-white mb-6 glow-text">
              No Recommendations Found
            </h2>
            <p className="text-white/70 text-lg mb-8">
              We couldn't find any recommendations for this session. Let's start fresh and create your perfect electronics profile.
            </p>
            <button onClick={handleStartNew} className="neon-button text-white font-bold py-4 px-8">
              <RefreshCw className="mr-2 h-5 w-5" />
              Start New AI Consultation
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { user, products } = recommendations;
  
  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8">
            <Star className="text-accent mr-2 h-5 w-5 animate-pulse" />
            <span className="text-white/90 font-medium">AI-Curated Results</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent glow-text">
            Your Perfect Electronics Match
          </h1>
          <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-4">
            Hi <span className="text-accent font-bold">{user?.name}</span>! Our AI has analyzed your needs and curated these perfect electronics recommendations
          </p>
          <div className="flex items-center justify-center text-white/60 text-sm">
            <Info className="mr-2 h-4 w-4" />
            <span>Based on your conversation preferences and requirements</span>
          </div>
        </div>

        {Array.isArray(products) && products.length > 0 ? (
          <>
            {/* Products Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {products.map((product: Product, index) => (
                <div 
                  key={product.id} 
                  className="cyber-card group hover:scale-105 transition-all duration-500 overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-accent/90 backdrop-blur-xl text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        AI Pick #{index + 1}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  {/* Product Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-black text-white mb-3 group-hover:glow-text transition-all duration-300">
                      {product.name}
                    </h3>
                    <p className="text-white/70 mb-6 leading-relaxed">
                      {product.shortDescription}
                    </p>
                    
                    {/* Price and Rating */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-black text-white glow-text">
                        {product.price}
                      </span>
                      <div className="flex items-center bg-white/10 backdrop-blur-xl rounded-full px-3 py-2">
                        <div className="flex items-center text-yellow-400 mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                            />
                          ))}
                        </div>
                        <span className="text-white font-semibold text-sm">
                          {product.rating}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => openProductModal(product)}
                        className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-white/20 backdrop-blur-xl"
                      >
                        <Info className="mr-2 h-4 w-4 inline" />
                        View Full Details
                      </button>
                      <button
                        onClick={() => openAffiliateLink(product.affiliateLink)}
                        className="w-full neon-button text-white font-bold py-3 px-6"
                      >
                        <FaAmazon className="mr-2 h-4 w-4 inline" />
                        Buy Now on Amazon
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center cyber-card p-12">
              <h3 className="text-3xl font-black text-white mb-6 glow-text">
                Need Different Recommendations?
              </h3>
              <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                Our AI can provide fresh recommendations based on updated preferences or different use cases
              </p>
              <button 
                onClick={handleStartNew}
                className="neon-button text-white font-bold py-4 px-8 text-lg"
              >
                <RefreshCw className="mr-3 h-5 w-5" />
                Get New AI Recommendations
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="cyber-card p-12 max-w-2xl mx-auto">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-black text-white mb-4">No Products Found</h3>
              <p className="text-white/70 mb-8">
                We couldn't find any products in the recommendations. Let's create new ones.
              </p>
              <button onClick={handleStartNew} className="neon-button text-white font-bold py-4 px-8">
                <RefreshCw className="mr-2 h-5 w-5" />
                Start Fresh Consultation
              </button>
            </div>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onBuyClick={() => openAffiliateLink(selectedProduct.affiliateLink)}
        />
      )}
    </div>
  );
}
