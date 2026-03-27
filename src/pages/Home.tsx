import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/src/components/Hero';
import BookingBar from '@/src/components/BookingBar';
import FloatingStrip from '@/src/components/FloatingStrip';
import RoomsSection from '@/src/components/RoomsSection';
import EventsSection from '@/src/components/EventsSection';
import StatsSection from '@/src/components/StatsSection';
import ReviewsSection from '@/src/components/ReviewsSection';
import ActivitiesSection from '@/src/components/ActivitiesSection';
import SplashScreen from '@/src/components/SplashScreen';
import { FadeUp, StaggerContainer } from '@/src/components/ui/MotionWrappers';
import { motion } from 'motion/react';
import { Wind, Sun, Waves, Coffee } from 'lucide-react';

const experiences = [
  { icon: Wind, title: "Pure Air", desc: "Breathe in the freshest mountain breeze." },
  { icon: Sun, title: "Golden Sun", desc: "Bask in the warmth of eternal summer." },
  { icon: Waves, title: "Ocean Calm", desc: "Listen to the rhythmic dance of waves." },
  { icon: Coffee, title: "Morning Bliss", desc: "Start your day with artisan perfection." },
];

export default function Home() {
  const [showSplash, setShowSplash] = useState(false);
  const [startHeroAnim, setStartHeroAnim] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (!hasSeenSplash) {
      setShowSplash(true);
    } else {
      setStartHeroAnim(true);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('hasSeenSplash', 'true');
    setShowSplash(false);
    setStartHeroAnim(true);
  };

  return (
    <main className="overflow-hidden">
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <Hero startAnimation={startHeroAnim} />
      <BookingBar startAnimation={startHeroAnim} />
      <FloatingStrip />
      
      {/* Experience Section */}
      <section className="py-24 bg-resort-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeUp>
              <p className="text-resort-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">The Experience</p>
              <h2 className="text-4xl md:text-6xl font-serif">Sensory Harmony</h2>
            </FadeUp>
          </div>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={{
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -10, rotate: i % 2 === 0 ? 1 : -1 }}
                className="bg-white p-10 rounded-2xl text-center shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="w-16 h-16 bg-resort-bg rounded-full flex items-center justify-center mx-auto mb-6">
                  <exp.icon className="w-8 h-8 text-resort-gold" />
                </div>
                <h3 className="text-xl font-serif mb-4 uppercase tracking-widest">{exp.title}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{exp.desc}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <RoomsSection />
      <EventsSection />
      <StatsSection />
      <ActivitiesSection />
      <ReviewsSection />

      {/* Gallery Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <FadeUp>
              <p className="text-resort-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">Visual Journey</p>
              <h2 className="text-4xl md:text-6xl font-serif">Gallery</h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <Link to="/gallery" className="text-xs uppercase tracking-[0.3em] font-bold border-b border-resort-ink/20 pb-2 hover:border-resort-gold transition-colors">
                View Full Gallery
              </Link>
            </FadeUp>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://wabisabiresorts.com/wp-content/uploads/2023/04/Wabi-Sabi-Resort-Igatpuri-Hero.jpg",
              "https://wabisabiresorts.com/wp-content/uploads/2023/04/Swiss-Tents-Wabi-Sabi.jpg",
              "https://wabisabiresorts.com/wp-content/uploads/2023/04/Luxury-Suite-Wabi-Sabi.jpg",
              "https://wabisabiresorts.com/wp-content/uploads/2023/04/Swimming-Pool-Wabi-Sabi-Igatpuri.jpg"
            ].map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="relative aspect-square overflow-hidden rounded-[24px] group shadow-sm"
              >
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  src={url}
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-resort-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
