import { motion } from 'motion/react';
import { FadeUp, StaggerContainer } from './ui/MotionWrappers';

const images = [
  {
    url: "https://wabisabiresorts.com/wp-content/uploads/2023/04/Swimming-Pool-Wabi-Sabi-Igatpuri.jpg",
    title: "Infinity Pool",
    offset: "mt-0"
  },
  {
    url: "https://wabisabiresorts.com/wp-content/uploads/2023/04/Dining-Wabi-Sabi.jpg",
    title: "Fine Dining",
    offset: "mt-12"
  },
  {
    url: "https://wabisabiresorts.com/wp-content/uploads/2023/04/Games-Room-Wabi-Sabi.jpg",
    title: "Indoor Games",
    offset: "mt-24"
  }
];

export default function FloatingStrip() {
  return (
    <section className="py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <FadeUp className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">
              A World of <span className="italic text-resort-gold">Unparalleled</span> Luxury
            </h2>
            <p className="text-gray-500 font-light leading-relaxed max-w-md">
              From the moment you arrive, Wabi Sabi transports you to a realm where every detail is curated for your comfort. Discover our world-class amenities and bespoke services.
            </p>
            <div className="pt-4">
              <button className="group flex items-center space-x-4 text-xs uppercase tracking-[0.3em] font-bold">
                <span>Explore Amenities</span>
                <span className="w-12 h-[1px] bg-resort-ink group-hover:w-20 transition-all duration-500" />
              </button>
            </div>
          </FadeUp>

          <StaggerContainer className="flex space-x-4 md:space-x-8">
            {images.map((img, i) => (
              <motion.div
                key={i}
                variants={{
                  initial: { opacity: 0, y: 60, scale: 0.9 },
                  animate: { opacity: 1, y: 0, scale: 1 }
                }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                className={cn(
                  "relative flex-1 rounded-2xl overflow-hidden group shadow-xl",
                  img.offset
                )}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <p className="text-white text-xs uppercase tracking-widest font-medium">{img.title}</p>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

import { cn } from '@/src/lib/utils';
