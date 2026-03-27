import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Logo from '@/src/components/Logo';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsFinished(true);
          onComplete();
        }
      });

      // 1. Start with black screen + grain
      gsap.set(containerRef.current, { backgroundColor: '#000' });
      gsap.set(grainRef.current, { opacity: 0.2 });
      
      // 2. Logo Reveal (1.0s - 2.5s)
      tl.fromTo(logoRef.current, 
        { opacity: 0, filter: 'blur(10px)', y: 20, scale: 0.8 },
        { 
          opacity: 1, 
          filter: 'blur(0px)', 
          y: 0, 
          scale: 1,
          duration: 1.5, 
          ease: "power3.out" 
        }, 
        1.0
      );

      // 3. Cinematic Background Reveal (2.5s - 4.0s)
      tl.fromTo(bgRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 0.4, scale: 1, duration: 2, ease: "power2.inOut" },
        2.5
      );

      // 4. Mask Transition (4.0s - 5.5s)
      // We'll use a mask-image to create an expanding hole
      tl.to(containerRef.current, {
        maskImage: 'radial-gradient(circle at 50% 50%, transparent 100%, black 100%)',
        webkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 100%, black 100%)',
        duration: 2,
        ease: "expo.inOut"
      }, 4.5);

      // Fade out the logo and bg as the mask expands
      tl.to([logoRef.current, bgRef.current, grainRef.current, skipRef.current], {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
      }, 4.5);
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const handleSkip = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setIsFinished(true);
        onComplete();
      }
    });
  };

  if (isFinished) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-auto bg-black"
      style={{ 
        maskImage: 'radial-gradient(circle at 50% 50%, transparent 0%, black 0%)',
        WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 0%, black 0%)'
      }}
    >
      {/* Cinematic Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=1920" 
          alt="Mountain Sanctuary"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
      </div>

      {/* Grain Overlay */}
      <div 
        ref={grainRef}
        className="absolute inset-0 z-10 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Brand Logo */}
      <div 
        ref={logoRef}
        className="relative z-20 text-center px-6"
      >
        <Logo className="scale-150 md:scale-[2.5]" />
      </div>

      {/* Skip Button */}
      <button
        ref={skipRef}
        onClick={handleSkip}
        className="absolute bottom-12 right-12 z-30 text-white/40 hover:text-white text-[10px] uppercase tracking-[0.3em] transition-colors"
      >
        Skip Intro
      </button>
    </div>
  );
}
