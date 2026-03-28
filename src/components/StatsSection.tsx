import { motion } from 'motion/react';
import { FadeUp, StaggerContainer } from '@/src/components/ui/MotionWrappers';

const stats = [
  { value: "800+", label: "Happy Guests" },
  { value: "3500+", label: "Experiences" },
  { value: "45", label: "Accommodations" },
  { value: "2M", label: "Visitors" },
];

export default function StatsSection() {
  return (
    <section className="py-24 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                initial: { opacity: 0, scale: 0.9 },
                animate: { opacity: 1, scale: 1 }
              }}
              className="text-center space-y-4 group"
            >
              <h3 className="text-5xl md:text-7xl font-serif text-resort-ink group-hover:text-resort-gold transition-colors duration-500">{stat.value}</h3>
              <div className="w-12 h-[1px] bg-resort-gold mx-auto group-hover:w-24 transition-all duration-500" />
              <p className="text-gray-400 text-xs uppercase tracking-[0.4em] font-bold">{stat.label}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
