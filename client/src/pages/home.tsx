import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Phone, Bot, UserPlus, PhoneCall, Star, Info, Sparkles, Zap, Brain, Mic, ShoppingBag, Shield, Clock, Users } from "lucide-react";

export default function Home() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 6) {
      return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6,10)}`;
    } else if (cleaned.length >= 3) {
      return `(${cleaned.slice(0,3)}) ${cleaned.slice(3)}`;
    }
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
    setPhoneError("");
  };

  const validateForm = () => {
    let isValid = true;

    if (name.trim().length < 2) {
      setNameError("Please enter a valid name");
      isValid = false;
    } else {
      setNameError("");
    }

    const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError("Please enter a valid phone number");
      isValid = false;
    } else {
      setPhoneError("");
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await apiRequest("POST", "/api/submit", { name, phone });
      const data = await response.json();
      
      if (data.success) {
        navigate(`/waiting/${data.userId}`);
        toast({
          title: "Success!",
          description: "We're calling you now. Please answer your phone!",
        });
      } else {
        throw new Error(data.message || "Failed to submit form");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit form. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Cyberpunk Cityscape Background */}
        <div className="absolute inset-0 w-full h-full">
          <div 
            className="absolute inset-0 w-full h-full bg-center bg-cover opacity-40"
            style={{
              backgroundImage: `url("data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" class="cyberpunk-cityscape">
  <defs>
    <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge> 
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge> 
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a1a;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#1a0a2e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2d1b3d;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="buildingGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f0f1a;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="buildingGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#2d1b3d;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a0f2e;stop-opacity:1" />
    </linearGradient>
    
    <linearGradient id="lightBeam1" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" style="stop-color:#00ffff;stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:#00ffff;stop-opacity:0" />
    </linearGradient>
    <linearGradient id="lightBeam2" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" style="stop-color:#ff0080;stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:#ff0080;stop-opacity:0" />
    </linearGradient>
  </defs>

  <rect width="1200" height="800" fill="url(#skyGradient)"/>

  <rect x="0" y="400" width="80" height="400" fill="url(#buildingGradient1)" opacity="0.6"/>
  <rect x="100" y="350" width="60" height="450" fill="url(#buildingGradient2)" opacity="0.6"/>
  <rect x="180" y="380" width="70" height="420" fill="url(#buildingGradient1)" opacity="0.6"/>
  <rect x="270" y="320" width="50" height="480" fill="url(#buildingGradient2)" opacity="0.6"/>
  
  <rect x="50" y="300" width="90" height="500" fill="url(#buildingGradient1)" opacity="0.8"/>
  <rect x="160" y="250" width="80" height="550" fill="url(#buildingGradient2)" opacity="0.8"/>
  <rect x="260" y="280" width="100" height="520" fill="url(#buildingGradient1)" opacity="0.8"/>
  <rect x="380" y="200" width="70" height="600" fill="url(#buildingGradient2)" opacity="0.8"/>
  <rect x="470" y="240" width="85" height="560" fill="url(#buildingGradient1)" opacity="0.8"/>

  <rect x="600" y="150" width="120" height="650" fill="url(#buildingGradient1)"/>
  <rect x="750" y="100" width="100" height="700" fill="url(#buildingGradient2)"/>
  <rect x="880" y="180" width="90" height="620" fill="url(#buildingGradient1)"/>
  <rect x="990" y="120" width="110" height="680" fill="url(#buildingGradient2)"/>
  <rect x="1120" y="200" width="80" height="600" fill="url(#buildingGradient1)"/>

  <rect x="620" y="200" width="8" height="12" fill="#00ffff" filter="url(#neonGlow)" opacity="0.9"/>
  <rect x="640" y="200" width="8" height="12" fill="#ff0080" filter="url(#neonGlow)" opacity="0.9"/>
  <rect x="660" y="200" width="8" height="12" fill="#00ffff" filter="url(#neonGlow)" opacity="0.9"/>
  <rect x="680" y="200" width="8" height="12" fill="#ff0080" filter="url(#neonGlow)" opacity="0.9"/>
  
  <rect x="620" y="240" width="8" height="12" fill="#ff0080" filter="url(#neonGlow)" opacity="0.9"/>
  <rect x="660" y="240" width="8" height="12" fill="#00ffff" filter="url(#neonGlow)" opacity="0.9"/>
  <rect x="700" y="240" width="8" height="12" fill="#ff0080" filter="url(#neonGlow)" opacity="0.9"/>

  <rect x="770" y="180" width="8" height="12" fill="#a855f7" filter="url(#neonGlow)" opacity="0.9"/>
  <rect x="790" y="180" width="8" height="12" fill="#00ffff" filter="url(#neonGlow)" opacity="0.9"/>
  <rect x="810" y="180" width="8" height="12" fill="#ff0080" filter="url(#neonGlow)" opacity="0.9"/>
  
  <rect x="770" y="220" width="8" height="12" fill="#00ffff" filter="url(#neonGlow)" opacity="0.9"/>
  <rect x="810" y="220" width="8" height="12" fill="#a855f7" filter="url(#neonGlow)" opacity="0.9"/>

  <rect x="900" y="240" width="8" height="12" fill="#ff0080" filter="url(#neonGlow)" opacity="0.9"/>
  <rect x="920" y="240" width="8" height="12" fill="#00ffff" filter="url(#neonGlow)" opacity="0.9"/>
  <rect x="940" y="240" width="8" height="12" fill="#a855f7" filter="url(#neonGlow)" opacity="0.9"/>

  <rect x="630" y="300" width="60" height="20" fill="none" stroke="#00ffff" stroke-width="2" filter="url(#strongGlow)"/>
  <text x="660" y="314" text-anchor="middle" fill="#00ffff" font-family="Arial, sans-serif" font-size="12" font-weight="bold" filter="url(#neonGlow)">TECH</text>
  
  <rect x="770" y="280" width="50" height="18" fill="none" stroke="#ff0080" stroke-width="2" filter="url(#strongGlow)"/>
  <text x="795" y="293" text-anchor="middle" fill="#ff0080" font-family="Arial, sans-serif" font-size="11" font-weight="bold" filter="url(#neonGlow)">CYBER</text>

  <g transform="translate(300, 650)">
    <ellipse cx="40" cy="20" rx="35" ry="12" fill="#1a1a2e" stroke="#00ffff" stroke-width="1" filter="url(#neonGlow)"/>
    <ellipse cx="40" cy="18" rx="25" ry="8" fill="#0a0a1a" stroke="#a855f7" stroke-width="1" filter="url(#neonGlow)"/>
    <circle cx="70" cy="20" r="3" fill="#ffffff" filter="url(#strongGlow)"/>
    <circle cx="70" cy="20" r="1.5" fill="#00ffff" filter="url(#strongGlow)"/>
    <ellipse cx="40" cy="30" rx="40" ry="5" fill="#00ffff" opacity="0.3" filter="url(#strongGlow)"/>
  </g>

  <g transform="translate(800, 680)">
    <ellipse cx="30" cy="15" rx="28" ry="10" fill="#2d1b3d" stroke="#ff0080" stroke-width="1" filter="url(#neonGlow)"/>
    <ellipse cx="30" cy="13" rx="20" ry="6" fill="#0a0a1a" stroke="#a855f7" stroke-width="1" filter="url(#neonGlow)"/>
    <circle cx="55" cy="15" r="2.5" fill="#ffffff" filter="url(#strongGlow)"/>
    <circle cx="55" cy="15" r="1" fill="#ff0080" filter="url(#strongGlow)"/>
    <ellipse cx="30" cy="23" rx="32" ry="4" fill="#ff0080" opacity="0.3" filter="url(#strongGlow)"/>
  </g>

  <polygon points="650,800 680,300 720,300 690,800" fill="url(#lightBeam1)" opacity="0.1"/>
  <polygon points="800,800 820,280 840,280 820,800" fill="url(#lightBeam2)" opacity="0.1"/>

  <circle cx="200" cy="300" r="1" fill="#00ffff" opacity="0.6" filter="url(#neonGlow)">
    <animate attributeName="cy" values="300;280;300" dur="3s" repeatCount="indefinite"/>
  </circle>
  <circle cx="500" cy="250" r="1.5" fill="#ff0080" opacity="0.6" filter="url(#neonGlow)">
    <animate attributeName="cy" values="250;230;250" dur="4s" repeatCount="indefinite"/>
  </circle>
  <circle cx="900" cy="320" r="1" fill="#a855f7" opacity="0.6" filter="url(#neonGlow)">
    <animate attributeName="cy" values="320;300;320" dur="3.5s" repeatCount="indefinite"/>
  </circle>
</svg>`)}")`
            }}
          />
        </div>
        
        {/* Background Effects */}
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="mb-8">
            <div className="inline-flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8">
              <Sparkles className="text-accent mr-2 h-5 w-5 animate-pulse" />
              <span className="text-white/90 font-medium">Next-Gen AI Technology</span>
              <div className="ml-3 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-primary to-accent bg-clip-text glow-text text-[58px] font-extrabold pl-[2px] pr-[2px] text-[#6cebdcb5]">Future of Shopping</span>
            <br />
            <span className="bg-gradient-to-r from-accent via-primary to-white bg-clip-text text-transparent glow-text">
              Electronics
            </span>
            <br />
            <span className="text-white font-black glow-text">
              VELECTRO
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl lg:text-3xl mb-12 text-white/80 max-w-4xl mx-auto leading-relaxed">
            Experience the power of <span className="text-accent font-bold glow-text">AI-driven conversations</span> that understand your needs and deliver 
            <span className="text-primary font-bold glow-text"> perfect electronics recommendations</span> in real-time
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {[
              { icon: Phone, title: "3-Min Call", desc: "Quick voice conversation", color: "text-accent" },
              { icon: Brain, title: "AI Analysis", desc: "Smart need assessment", color: "text-primary" },
              { icon: Sparkles, title: "Perfect Match", desc: "Personalized results", color: "text-white" }
            ].map(({ icon: Icon, title, desc, color }, index) => (
              <div key={index} className="cyber-card p-6 group hover:scale-105 transition-all duration-300">
                <Icon className={`${color} text-4xl mb-4 mx-auto floating-animation glow-text`} style={{ animationDelay: `${index * 0.5}s` }} />
                <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
                <p className="text-white/70">{desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="neon-button text-white text-lg transform hover:scale-105 transition-all duration-300"
            >
              <Phone className="mr-3 h-6 w-6" />
              Start Your Journey
            </button>
            <div className="flex items-center text-white/60 text-sm">
              <Users className="mr-2 h-4 w-4" />
              <span>10,000+ Happy Customers</span>
            </div>
          </div>
        </div>

        {/* Animated Elements */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-1 h-16 bg-gradient-to-b from-primary to-transparent rounded-full"></div>
        </div>
      </section>
      {/* Form Section */}
      <section id="signup-form" className="py-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8">
              <Zap className="text-primary mr-2 h-5 w-5 animate-pulse" />
              <span className="text-white/90 font-medium">Lightning Fast Setup</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-6 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent glow-text">
              Begin Your AI Experience
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Enter your details and our advanced AI will call you within minutes to create your perfect electronics profile
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="cyber-card p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div className="relative">
                    <Label htmlFor="name" className="block text-white font-semibold mb-3 text-lg">
                      Full Name
                    </Label>
                    <div className="relative">
                      <UserPlus className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                      <Input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setNameError("");
                        }}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300 text-lg backdrop-blur-xl"
                        placeholder="Enter your full name"
                      />
                    </div>
                    {nameError && (
                      <div className="text-red-400 text-sm mt-2 flex items-center">
                        <Info className="mr-2 h-4 w-4" />
                        {nameError}
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <Label htmlFor="phone" className="block text-white font-semibold mb-3 text-lg">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent h-5 w-5" />
                      <Input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all duration-300 text-lg backdrop-blur-xl"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    {phoneError && (
                      <div className="text-red-400 text-sm mt-2 flex items-center">
                        <Info className="mr-2 h-4 w-4" />
                        {phoneError}
                      </div>
                    )}
                  </div>
                </div>

                <div className="cyber-card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 p-6">
                  <div className="flex items-start">
                    <Mic className="text-primary text-2xl mr-4 mt-1 floating-animation" />
                    <div>
                      <p className="font-bold text-white mb-3 text-lg">What to Expect:</p>
                      <ul className="space-y-2 text-white/80">
                        <li className="flex items-center">
                          <Clock className="mr-3 h-4 w-4 text-accent" />
                          Call within 2-3 minutes
                        </li>
                        <li className="flex items-center">
                          <Brain className="mr-3 h-4 w-4 text-primary" />
                          3-5 smart questions about your needs
                        </li>
                        <li className="flex items-center">
                          <Sparkles className="mr-3 h-4 w-4 text-white" />
                          Instant AI-powered recommendations
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full neon-button text-white font-bold py-6 px-8 text-xl disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Processing Your Request...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Phone className="mr-3 h-6 w-6" />
                      Get My AI Recommendations
                    </div>
                  )}
                </button>

                <div className="text-center">
                  <div className="flex items-center justify-center text-white/60 text-sm mb-2">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>100% secure & private. No spam, ever.</span>
                  </div>
                  <p className="text-xs text-white/40">
                    By submitting, you agree to receive a call from VElectro AI.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8">
              <Brain className="text-accent mr-2 h-5 w-5 animate-pulse" />
              <span className="text-white/90 font-medium">Advanced AI Process</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent glow-text">
              How VElectro Works
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Experience the seamless fusion of artificial intelligence and human needs to discover your perfect electronics match
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                icon: UserPlus,
                title: "Instant Sign-Up",
                description: "Enter your details and join thousands of satisfied customers in seconds",
                color: "text-primary",
                bgColor: "bg-primary/20",
                delay: "0s"
              },
              {
                step: "02", 
                icon: PhoneCall,
                title: "AI Conversation",
                description: "Our advanced AI conducts a natural conversation to understand your unique needs",
                color: "text-accent",
                bgColor: "bg-accent/20",
                delay: "0.2s"
              },
              {
                step: "03",
                icon: ShoppingBag,
                title: "Perfect Match",
                description: "Receive curated recommendations with instant purchase links and detailed specifications",
                color: "text-white",
                bgColor: "bg-white/20",
                delay: "0.4s"
              }
            ].map(({ step, icon: Icon, title, description, color, bgColor, delay }) => (
              <div 
                key={step} 
                className="relative group cyber-card p-8 lg:p-10 hover:scale-105 transition-all duration-500"
                style={{ animationDelay: delay }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 text-6xl font-black text-white/10 group-hover:text-white/20 transition-colors duration-300">
                  {step}
                </div>
                
                {/* Icon */}
                <div className={`${bgColor} rounded-2xl w-20 h-20 flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 floating-animation`}>
                  <Icon className={`${color} text-3xl glow-text`} />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl lg:text-3xl font-black text-white mb-4 group-hover:glow-text transition-all duration-300">
                  {title}
                </h3>
                <p className="text-white/70 text-lg leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  {description}
                </p>
                
                {/* Connecting Line (not on last item) */}
                {step !== "03" && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-primary to-accent opacity-50"></div>
                )}
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Happy Customers", icon: Users },
              { number: "99.9%", label: "Accuracy Rate", icon: Brain },
              { number: "< 3min", label: "Average Call Time", icon: Clock },
              { number: "100%", label: "Secure & Private", icon: Shield }
            ].map(({ number, label, icon: Icon }, index) => (
              <div key={index} className="text-center group">
                <Icon className="text-primary text-2xl mx-auto mb-3 group-hover:glow-text transition-all duration-300" />
                <div className="text-3xl font-black text-white mb-2 glow-text">{number}</div>
                <div className="text-white/60 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
