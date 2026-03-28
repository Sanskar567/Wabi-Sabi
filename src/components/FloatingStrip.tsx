import { motion } from 'motion/react';

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

export default function FloatingStrip() {
  return (
    <div className="relative w-full overflow-hidden py-12 bg-resort-ink border-y border-white/10">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap space-x-24"
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center space-x-8">
            <span className="text-white/20 text-4xl md:text-6xl font-serif uppercase tracking-[0.2em]">{item}</span>
            <div className="w-4 h-4 rounded-full bg-resort-gold/30" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
