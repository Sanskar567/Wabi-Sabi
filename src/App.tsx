import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Rooms from './pages/Rooms';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import ThankYou from './pages/ThankYou';
import AboutSection from './components/AboutSection';
import { BookingProvider } from './context/BookingContext';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Page Transition Wrapper
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
  >
    {children}
  </motion.div>
);

// Content-rich About page
const About = () => (
  <PageWrapper>
    <div className="pt-48 bg-resort-ink text-white pb-32 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=1920" 
          alt="Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-resort-gold uppercase tracking-[0.5em] text-xs font-bold mb-8"
        >
          The Wabi Sabi Story
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-serif mb-12 leading-[1.1]"
        >
          Finding beauty in <br /> the natural cycle
        </motion.h1>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="w-32 h-1 bg-resort-gold mx-auto" 
        />
      </div>
    </div>
    
    <AboutSection />
    
    <div className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
        <h3 className="text-3xl md:text-5xl font-serif italic text-resort-ink/80 leading-relaxed">
          "Nature does not hurry, yet everything is accomplished. We invite you to experience the same harmony."
        </h3>
        <div className="space-y-6 text-gray-500 font-light leading-relaxed text-lg max-w-2xl mx-auto">
          <p>
            Our journey began with a simple vision: to create a space where time slows down, where the beauty of the natural world is celebrated, and where every guest feels like they've come home.
          </p>
          <p>
            Wabi Sabi is more than just a resort; it's a philosophy of living. We believe that true luxury lies in simplicity, authenticity, and a deep connection to the environment.
          </p>
        </div>
        <p className="mt-8 text-resort-gold uppercase tracking-[0.3em] text-xs font-bold">— The Wabi Sabi Philosophy</p>
      </div>
    </div>
  </PageWrapper>
);

export default function App() {
  return (
    <BookingProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </Router>
    </BookingProvider>
  );
}
