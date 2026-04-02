import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from 'motion/react';
import { wrap } from 'motion/react';
import logoImg from '@/src/assets/WabiSabiLogo.webp';

const items = [
  "Mountain Sanctuary",
  "Luxury Retreat",
  "Mist & Greenery",
  "Igatpuri Bliss",
  "Wabi Sabi Life",
  "Serenity Found",
  "Nature's Harmony",
  "Everlasting Memories"
];

interface FloatingStripProps {
  startAnimation?: boolean;
}

export default function FloatingStrip({ startAnimation }: FloatingStripProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useAnimationFrame((t, delta) => {
    if (isHovered || !startAnimation) return;

    let moveBy = directionFactor.current * -2 * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  const yParallax = useTransform(scrollY, [0, 1000], [0, -50]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative z-10 -mt-8 md:-mt-12 mb-12 md:mb-24 overflow-hidden pointer-events-none"
    >
      <motion.div 
        style={{ 
          y: yParallax,
          rotate: isMobile ? -1 : -2,
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
        className="relative py-6 md:py-10 bg-resort-ink/90 backdrop-blur-md border-y border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.4)] pointer-events-auto cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Edge Fades for Depth Illusion */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-resort-ink via-resort-ink/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-resort-ink via-resort-ink/80 to-transparent z-10 pointer-events-none" />

        {/* Depth Mask Overlay - Stronger for clearer depth effect */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, transparent 20%, rgba(10, 10, 10, 0.9) 100%)"
          }}
        />

        <motion.div 
          className="flex whitespace-nowrap"
          style={{ x }}
        >
          {[...items, ...items, ...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center space-x-6 md:space-x-12 px-4 md:px-8">
              <span className="text-white/40 group-hover:text-white/90 transition-all duration-700 text-lg md:text-2xl lg:text-3xl font-serif uppercase tracking-[0.4em] select-none whitespace-nowrap">
                {item}
              </span>
              <div className="flex items-center justify-center">
                <img 
                  src={logoImg} 
                  alt="Logo" 
                  className="w-6 h-6 md:w-8 md:h-8 object-contain opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 invert brightness-200"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
