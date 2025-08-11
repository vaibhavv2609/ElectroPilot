import { useState, useEffect } from "react";
import { Zap, Menu, X, Sparkles } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center group cursor-pointer">
            <div className="relative">
              <Zap className="text-primary text-3xl mr-3 glow-text floating-animation" />
              <Sparkles className="absolute -top-1 -right-1 text-accent text-sm animate-pulse" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent glow-text">
              VElectro
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {['How it Works', 'AI Technology', 'Reviews', 'Contact'].map((item) => (
              <a 
                key={item}
                href="#" 
                className="relative text-white/80 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-300 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10">
          <nav className="px-4 py-6 space-y-4">
            {['How it Works', 'AI Technology', 'Reviews', 'Contact'].map((item) => (
              <a 
                key={item}
                href="#" 
                className="block text-white/80 hover:text-white py-3 px-4 text-lg font-medium transition-colors rounded-lg hover:bg-white/5"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
