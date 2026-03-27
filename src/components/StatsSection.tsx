import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { FadeUp, StaggerContainer } from './ui/MotionWrappers';

const stats = [
  { label: 'Luxury Rooms', value: 45, suffix: '+' },
  { label: 'Happy Guests', value: 5, suffix: 'k+' },
  { label: 'Amenities', value: 15, suffix: '+' },
  { label: 'Awards', value: 12, suffix: '' },
];

function Counter({ value, suffix }: { value: number, suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-24 bg-resort-bg border-y border-resort-ink/5">
      <div className="max-w-7xl mx-auto px-6">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 }
              }}
              className="text-center space-y-2"
            >
              <p className="text-4xl md:text-6xl font-serif text-resort-gold">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
