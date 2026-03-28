import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from '@/src/components/Logo';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // Wait for exit animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
            transition: { duration: 1, ease: [0.7, 0, 0.3, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-resort-ink flex flex-col items-center justify-center text-white"
        >
          <div className="relative overflow-hidden mb-12">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
            >
              <Logo className="w-48 h-48 md:w-64 md:h-64 invert brightness-200" />
            </motion.div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
                className="text-resort-gold uppercase tracking-[0.5em] text-xs font-bold"
              >
                Wabi Sabi Resorts
              </motion.p>
            </div>
            
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
                className="text-white/40 text-[10px] uppercase tracking-[0.3em]"
              >
                Igatpuri, Maharashtra
              </motion.p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-white/10">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="h-full bg-resort-gold origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
