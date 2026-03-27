import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { gsap } from 'gsap';

const heroSlides = [
  {
    id: 1,
    title: "Wabi Sabi Resort",
    location: "Igatpuri, Maharashtra",
    image: "https://wabisabiresorts.com/wp-content/uploads/2023/04/Wabi-Sabi-Resort-Igatpuri-Hero.jpg",
    description: "Experience the serene beauty of Igatpuri at our premium resort. A perfect blend of luxury and nature."
  },
  {
    id: 2,
    title: "Luxury Swiss Tents",
    location: "Igatpuri, Maharashtra",
    image: "https://wabisabiresorts.com/wp-content/uploads/2023/04/Swiss-Tents-Wabi-Sabi.jpg",
    description: "Stay in our premium Swiss AC Tents for a unique glamping experience amidst the mountains."
  },
  {
    id: 3,
    title: "Royal Suite Living",
    location: "Igatpuri, Maharashtra",
    image: "https://wabisabiresorts.com/wp-content/uploads/2023/04/Luxury-Suite-Wabi-Sabi.jpg",
    description: "Indulge in our Royal Suites, designed for ultimate comfort and elegance."
  },
  {
    id: 4,
    title: "Yama Villa",
    location: "Igatpuri, Maharashtra",
    image: "https://wabisabiresorts.com/wp-content/uploads/2023/04/Yama-Villa-Wabi-Sabi.jpg",
    description: "Our signature Yama Villa offers privacy and luxury for family celebrations and group stays."
  }
];

export default function Hero({ startAnimation = true }: { startAnimation?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const bgScale = useTransform(scrollY, [0, 500], [1.1, 1.0]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  useEffect(() => {
    if (!startAnimation) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Content reveal
      tl.fromTo(contentRef.current?.children || [], 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 1.2, ease: "power3.out" },
        0.5
      );

      // Carousel reveal (cards coming from depth)
      const cards = carouselRef.current?.querySelectorAll('.carousel-card');
      if (cards) {
        tl.fromTo(cards,
          { opacity: 0, scale: 0.8, z: -200, rotateY: 30 },
          { 
            opacity: 1, 
            scale: 1, 
            z: 0, 
            rotateY: (i) => (i === currentIndex ? 0 : 15), 
            stagger: 0.1, 
            duration: 1.5, 
            ease: "expo.out" 
          },
          0.8
        );
      }

      // Controls reveal
      tl.fromTo(controlsRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
        1.5
      );
    }, containerRef);

    return () => ctx.revert();
  }, [startAnimation]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-resort-ink">
      {/* Background Image Layer with Zoom Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ scale: bgScale }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <img
            src={heroSlides[currentIndex].image}
            alt={heroSlides[currentIndex].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div ref={contentRef} className="absolute inset-0 flex flex-col justify-center px-6 md:px-24 pointer-events-none">
        <div className="max-w-4xl">
          <div
            className="flex items-center text-white/80 uppercase tracking-[0.3em] text-xs md:text-sm mb-4"
          >
            <MapPin className="w-4 h-4 mr-2 text-resort-gold" />
            {heroSlides[currentIndex].location}
          </div>

          <h1
            className="text-5xl md:text-9xl font-serif text-white leading-none mb-6 uppercase tracking-tight"
          >
            {heroSlides[currentIndex].title.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h1>

          <p
            className="text-white/70 text-sm md:text-lg max-w-md font-light leading-relaxed tracking-wide"
          >
            {heroSlides[currentIndex].description}
          </p>
        </div>
      </div>

      {/* 3D Carousel Cards (Bottom Right) - Hidden on mobile for cleaner UI */}
      <div 
        ref={carouselRef}
        className="hidden md:flex absolute bottom-12 right-12 w-auto justify-end items-end space-x-4 perspective-1000"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="flex items-end space-x-6 preserve-3d">
          {heroSlides.map((slide, index) => {
            const isCenter = index === currentIndex;
            const isNext = index === (currentIndex + 1) % heroSlides.length;
            const isPrev = index === (currentIndex - 1 + heroSlides.length) % heroSlides.length;

            // Simple logic for visibility in the mini carousel
            if (!isCenter && !isNext && !isPrev && heroSlides.length > 3) return null;

            return (
              <motion.div
                key={slide.id}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "carousel-card relative cursor-pointer overflow-hidden rounded-lg transition-all duration-700 pointer-events-auto",
                  isCenter ? "w-48 h-72 md:w-64 md:h-96 z-10" : "w-32 h-48 md:w-40 md:h-60 opacity-60 hover:opacity-100 grayscale hover:grayscale-0"
                )}
                animate={{
                  scale: isCenter ? 1.05 : 0.9,
                  rotateY: isCenter ? 0 : index > currentIndex ? 15 : -15,
                  x: isCenter ? 0 : index > currentIndex ? 20 : -20,
                  z: isCenter ? 100 : 0
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[10px] uppercase tracking-widest text-white/80 mb-1">{slide.location}</p>
                  <p className="text-sm font-serif text-white uppercase">{slide.title}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div ref={controlsRef} className="absolute bottom-12 left-6 md:left-24 flex items-center space-x-8 pointer-events-auto">
        <div className="flex space-x-4">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-resort-ink transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-resort-ink transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Slide Counter */}
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-serif text-white">0{currentIndex + 1}</span>
          <span className="text-xs text-white/40 uppercase tracking-widest">/ 0{heroSlides.length}</span>
        </div>
      </div>
    </section>
  );
}
