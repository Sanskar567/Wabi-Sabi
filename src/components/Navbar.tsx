import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Logo from '@/src/components/Logo';

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
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4 md:px-12 md:py-6',
        isScrolled ? 'bg-resort-bg/90 backdrop-blur-md shadow-sm py-3 md:py-4' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="relative z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Logo variant={isScrolled ? 'dark' : 'light'} className="scale-75 md:scale-100 origin-left" />
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "relative text-sm uppercase tracking-[0.2em] font-medium transition-colors duration-500 group",
                isScrolled ? "text-resort-ink" : "text-white/90 hover:text-white"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full",
                isScrolled ? "bg-resort-gold" : "bg-white"
              )} />
              {location.pathname === link.path && (
                <motion.span
                  layoutId="navUnderline"
                  className={cn(
                    "absolute -bottom-1 left-0 w-full h-[1px]",
                    isScrolled ? "bg-resort-gold" : "bg-white"
                  )}
                />
              )}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-6">
          <a 
            href="tel:+1234567890" 
            className={cn(
              "flex items-center text-xs tracking-widest uppercase transition-colors duration-500",
              isScrolled ? "text-resort-ink" : "text-white"
            )}
          >
            <Phone className="w-3 h-3 mr-2" />
            Book Now
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden relative z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="text-resort-ink" />
          ) : (
            <Menu className={isScrolled ? "text-resort-ink" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-resort-bg z-40 flex flex-col items-center justify-center space-y-8"
          >
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  <Link
                    to={link.path}
                    className="text-3xl font-serif uppercase tracking-widest text-resort-ink hover:text-resort-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-12 px-10 py-4 bg-resort-gold text-white uppercase tracking-widest text-sm font-bold shadow-lg"
            >
              Book Your Stay
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
