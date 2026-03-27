import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { FadeUp } from './ui/MotionWrappers';

export default function EventsSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={sectionRef} className="relative h-[80vh] overflow-hidden flex items-center justify-center">
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://wabisabiresorts.com/wp-content/uploads/2023/04/Lawn-Area-Wabi-Sabi.jpg"
          alt="Events at Wabi Sabi"
          className="w-full h-full object-cover scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <FadeUp>
          <p className="text-resort-gold uppercase tracking-[0.4em] text-xs font-bold mb-6">Celebrations & Gatherings</p>
          <h2 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight">
            Unforgettable <span className="italic">Moments</span>
          </h2>
          <p className="text-white/70 text-lg font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            From intimate weddings to grand corporate retreats, Wabi Sabi provides the perfect backdrop for life's most significant events.
          </p>
          <button className="px-12 py-5 bg-white text-resort-ink uppercase tracking-[0.2em] text-xs font-bold hover:bg-resort-gold hover:text-white transition-all duration-500 rounded-sm">
            Plan Your Event
          </button>
        </FadeUp>
      </div>
    </section>
  );
}
