import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Rooms', path: '/rooms' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-700 px-6 py-4 md:px-12 md:py-8',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3 md:py-4' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="relative z-50 flex items-center space-x-4 group">
          <Logo className={cn(
            "w-10 h-10 md:w-12 md:h-12 transition-all duration-700 group-hover:scale-110",
            isScrolled ? "brightness-0" : "invert brightness-200"
          )} />
          <div className="flex flex-col">
            <span className={cn(
              "text-lg md:text-xl font-serif tracking-[0.3em] uppercase transition-colors duration-700",
              isScrolled ? "text-resort-ink" : "text-white"
            )}>
              Wabi Sabi
            </span>
            <span className={cn(
              "text-[8px] md:text-[10px] tracking-[0.4em] uppercase transition-colors duration-700",
              isScrolled ? "text-resort-gold" : "text-resort-gold/80"
            )}>
              Resorts
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "relative text-[11px] uppercase tracking-[0.3em] font-bold transition-colors duration-700 group",
                isScrolled ? "text-resort-ink" : "text-white/80 hover:text-white"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-2 left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full",
                isScrolled ? "bg-resort-gold" : "bg-white"
              )} />
              {location.pathname === link.path && (
                <motion.span
                  layoutId="navUnderline"
                  className={cn(
                    "absolute -bottom-2 left-0 w-full h-[1px]",
                    isScrolled ? "bg-resort-gold" : "bg-white"
                  )}
                />
              )}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/booking" 
            className={cn(
              "flex items-center text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-700 border-b pb-1",
              isScrolled ? "text-resort-ink border-resort-ink/20 hover:border-resort-gold" : "text-white border-white/20 hover:border-white"
            )}
          >
            <Phone className="w-3 h-3 mr-2" />
            Book Your Stay
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden relative z-50 p-2 group"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="space-y-1.5">
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className={cn(
                "block w-6 h-[1px] transition-colors duration-500",
                isMobileMenuOpen || isScrolled ? "bg-resort-ink" : "bg-white"
              )} 
            />
            <motion.span 
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className={cn(
                "block w-6 h-[1px] transition-colors duration-500",
                isMobileMenuOpen || isScrolled ? "bg-resort-ink" : "bg-white"
              )} 
            />
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className={cn(
                "block w-6 h-[1px] transition-colors duration-500",
                isMobileMenuOpen || isScrolled ? "bg-resort-ink" : "bg-white"
              )} 
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-12"
          >
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="text-3xl font-serif uppercase tracking-[0.2em] text-resort-ink hover:text-resort-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link 
                to="/booking"
                className="px-12 py-4 bg-resort-ink text-white uppercase tracking-[0.3em] text-xs font-bold rounded-full shadow-2xl inline-block"
              >
                Book Your Stay
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
