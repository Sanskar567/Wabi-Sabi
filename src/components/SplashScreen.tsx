import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import splashImg from '@/assets/images/gallery-background.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'entry' | 'zoom' | 'complete'>('entry');

  useEffect(() => {
    // Phase 1: Entry (Text fades in)
    const timer1 = setTimeout(() => {
      setPhase('zoom');
    }, 1500);

    // Phase 2: Complete
    const timer2 = setTimeout(() => {
      setPhase('complete');
      setTimeout(onComplete, 500);
    }, 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  // SVG Mask as a data URI
  // White = Opaque, Black = Transparent (Hole)
  const maskSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000' preserveAspectRatio='xMidYMid slice'%3E%3Crect width='1000' height='1000' fill='white'/%3E%3Ctext x='500' y='500' text-anchor='middle' dominant-baseline='middle' font-family='serif' font-size='100' font-weight='900' letter-spacing='40' fill='black'%3EWABI SABI%3C/text%3E%3C/svg%3E")`;

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* The Portal Layer: A solid background with a text-shaped hole */}
          <motion.div
            initial={{ scale: 1, filter: "blur(0px)" }}
            animate={
              phase === 'entry' 
                ? { scale: 1, filter: "blur(0px)" } 
                : { 
                    scale: 120,
                    filter: "blur(8px)",
                    transition: { 
                      scale: { duration: 3.5, ease: [0.7, 0, 0.3, 1] },
                      filter: { duration: 2, delay: 0.5 }
                    }
                  }
            }
            className="absolute inset-0 z-20 bg-resort-ink pointer-events-none"
            style={{
              WebkitMaskImage: maskSvg,
              maskImage: maskSvg,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
              WebkitMaskSize: 'cover',
              maskSize: 'cover',
            }}
          />

          {/* Background Content (Visible through the hole) */}
          <div className="absolute inset-0 z-10 bg-black">
            <motion.div
              initial={{ scale: 1.2, opacity: 0 }}
              animate={
                phase === 'entry' 
                  ? { scale: 1.1, opacity: 0.3 } 
                  : { 
                      scale: 1, 
                      opacity: 1,
                      transition: { duration: 3, ease: "easeOut" }
                    }
              }
              className="w-full h-full"
            >
              <img 
                src={splashImg} 
                alt="Hero Reveal" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-resort-ink/40" />
            </motion.div>
          </div>

          {/* Initial Text Layer (Fades out as zoom starts to reveal the hole) */}
          <AnimatePresence>
            {phase === 'entry' && (
              <motion.div
                initial={{ opacity: 0, filter: "blur(20px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.5 } }}
                className="relative z-30 pointer-events-none"
              >
                <h1 className="text-5xl md:text-8xl font-serif uppercase tracking-[0.5em] text-white/90 text-center">
                  Wabi Sabi
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subtle Grain Overlay */}
          <div className="absolute inset-0 z-40 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
