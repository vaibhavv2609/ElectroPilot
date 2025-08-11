import { Zap, Mail, MessageCircle, Shield, Sparkles } from "lucide-react";
import { FaTwitter, FaDiscord, FaTelegram, FaGithub } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="relative bg-black/40 backdrop-blur-xl border-t border-white/10 py-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6 group">
              <div className="relative">
                <Zap className="text-primary text-2xl mr-3 glow-text group-hover:animate-pulse" />
                <Sparkles className="absolute -top-1 -right-1 text-accent text-xs animate-pulse" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                VElectro
              </span>
            </div>
            <p className="text-white/70 text-lg mb-6 leading-relaxed">
              The future of electronics shopping is here. Our AI-powered platform provides 
              <span className="text-accent font-semibold"> personalized recommendations </span>
              through intelligent voice conversations.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-white/60 text-sm">
                <Shield className="mr-2 h-4 w-4 text-success" />
                <span>100% Secure & Private</span>
              </div>
              <div className="flex items-center text-white/60 text-sm">
                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                <span>AI-Powered</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Product</h4>
            <ul className="space-y-3">
              {[
                { name: 'How it Works', icon: MessageCircle },
                { name: 'AI Technology', icon: Sparkles },
                { name: 'Categories', icon: Zap }
              ].map(({ name, icon: Icon }) => (
                <li key={name}>
                  <a 
                    href="#" 
                    className="group flex items-center text-white/70 hover:text-white transition-all duration-300"
                  >
                    <Icon className="mr-3 h-4 w-4 text-primary/60 group-hover:text-primary group-hover:glow-text transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Support</h4>
            <ul className="space-y-3">
              {[
                { name: 'Contact Us', icon: Mail },
                { name: 'FAQ', icon: MessageCircle },
                { name: 'Privacy', icon: Shield }
              ].map(({ name, icon: Icon }) => (
                <li key={name}>
                  <a 
                    href="#" 
                    className="group flex items-center text-white/70 hover:text-white transition-all duration-300"
                  >
                    <Icon className="mr-3 h-4 w-4 text-accent/60 group-hover:text-accent group-hover:glow-text transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-6 md:mb-0">
              {[
                { Icon: FaTwitter, color: 'hover:text-blue-400' },
                { Icon: FaDiscord, color: 'hover:text-indigo-400' },
                { Icon: FaTelegram, color: 'hover:text-sky-400' },
                { Icon: FaGithub, color: 'hover:text-white' }
              ].map(({ Icon, color }, index) => (
                <a 
                  key={index}
                  href="#" 
                  className={`text-white/60 ${color} transition-all duration-300 transform hover:scale-110 hover:glow-text p-2 rounded-lg hover:bg-white/5`}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-white/60 text-sm mb-1">
                &copy; 2024 VElectro. All rights reserved.
              </p>
              <p className="text-white/40 text-xs">
                Powered by AI • Built for the future
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
