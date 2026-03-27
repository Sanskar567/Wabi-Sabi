import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';

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

// Placeholder pages for now
const About = () => <PageWrapper><div className="pt-32 pb-24 text-center h-screen font-serif text-4xl">Our Story</div></PageWrapper>;
const Rooms = () => <PageWrapper><div className="pt-32 pb-24 text-center h-screen font-serif text-4xl">Luxury Accommodations</div></PageWrapper>;
const Contact = () => <PageWrapper><div className="pt-32 pb-24 text-center h-screen font-serif text-4xl">Get In Touch</div></PageWrapper>;

export default function App() {
  return (
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
        </Routes>
      </AnimatePresence>
      <Footer />
    </Router>
  );
}
