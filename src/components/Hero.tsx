import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Play, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import heroImg1 from '@/assets/images/gallery-background.png';
import heroImg2 from '@/assets/images/yama-villa-hero.webp';
import heroImg3 from '@/assets/images/garden.png';
import heroImg4 from '@/assets/images/pool-hero.png';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    title: "Mountain Sanctuary",
    location: "Igatpuri, Maharashtra",
    image: heroImg1,
    desc: "Experience the harmony of nature and luxury in our mountain retreat."
  },
  {
    title: "Royal Suite",
    location: "Luxury Accommodations",
    image: heroImg2,
    desc: "Spacious and elegantly designed, offering breathtaking views."
  },
  {
    title: "Infinity Pool",
    location: "Wellness & Relaxation",
    image: heroImg3,
    desc: "Dive into tranquility with our panoramic infinity pool."
  },
  {
    title: "Swiss Tents",
    location: "Adventure & Comfort",
    image: heroImg4,
    desc: "Reconnect with nature without compromising on modern comfort."
  }
];

interface HeroProps {
  startAnimation?: boolean;
  onWatchVideo?: () => void;
}

export default function Hero({ startAnimation, onWatchVideo }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);

  // Parallax and Scroll Animation
  useEffect(() => {
    if (!sectionRef.current || !bgContainerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(bgContainerRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Fade out content on scroll
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Initial load animation
  useEffect(() => {
    if (startAnimation) {
      const tl = gsap.timeline();
      
      tl.fromTo(locationRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        0.2
      );

      tl.fromTo(titleRef.current, 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
        0.4
      );

      tl.fromTo(descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        0.6
      );
    }
  }, [startAnimation]);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === activeSlide) return;
    setIsAnimating(true);
    
    // Animate text out
    gsap.to([locationRef.current, titleRef.current, descRef.current], {
      y: -20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        setActiveSlide(index);
        
        // Animate text in
        gsap.fromTo([locationRef.current, titleRef.current, descRef.current],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", onComplete: () => setIsAnimating(false) }
        );
      }
    });
  }, [activeSlide, isAnimating]);

  const nextSlide = useCallback(() => {
    goToSlide((activeSlide + 1) % slides.length);
  }, [activeSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((activeSlide - 1 + slides.length) % slides.length);
  }, [activeSlide, goToSlide]);

  // Auto-play timer
  useEffect(() => {
    if (!startAnimation) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [startAnimation, nextSlide]);

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[800px] w-full overflow-hidden bg-resort-green">
      {/* Background Images with Parallax Container */}
      <div ref={bgContainerRef} className="absolute inset-0 z-0 w-full h-[130%] -top-[15%]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <img 
              src={slide.image} 
              alt={slide.title}
              className={cn(
                "w-full h-full object-cover transition-transform duration-[10000ms] ease-linear",
                index === activeSlide ? "scale-110" : "scale-100"
              )}
              referrerPolicy="no-referrer"
            />
            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          
          {/* Main Text */}
          <div className="lg:col-span-8 space-y-6">
            <div className="overflow-hidden">
              <p 
                ref={locationRef}
                className="text-resort-gold uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-2"
              >
                {slides[activeSlide].location}
              </p>
            </div>
            <div className="overflow-hidden py-2">
              <h1 
                ref={titleRef}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-serif leading-[1.1]"
              >
                {slides[activeSlide].title}
              </h1>
            </div>
            <div className="overflow-hidden max-w-xl">
              <p 
                ref={descRef}
                className="text-white/90 text-base md:text-lg font-light leading-relaxed"
              >
                {slides[activeSlide].desc}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-6 sm:space-y-0 sm:space-x-8 pt-8">
              <button className="bg-resort-gold text-white px-10 py-4 rounded-full uppercase tracking-[0.2em] text-xs font-bold hover:bg-white hover:text-resort-ink transition-all duration-500 shadow-xl">
                Discover More
              </button>
              <button 
                onClick={onWatchVideo}
                className="flex items-center space-x-4 text-white group"
              >
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-resort-ink transition-all duration-500">
                  <Play className="w-4 h-4 fill-current ml-1" />
                </div>
                <span className="uppercase tracking-widest text-[10px] font-bold">Watch Film</span>
              </button>
            </div>
          </div>

          {/* Controls & Pagination */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end space-y-8 lg:pb-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-resort-ink transition-all duration-500 backdrop-blur-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-resort-ink transition-all duration-500 backdrop-blur-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center space-x-4 w-full max-w-[240px]">
              <span className="text-white font-mono text-sm">
                {String(activeSlide + 1).padStart(2, '0')}
              </span>
              <div className="h-[1px] flex-grow bg-white/20 relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-resort-gold transition-all duration-500"
                  style={{ width: `${((activeSlide + 1) / slides.length) * 100}%` }}
                />
              </div>
              <span className="text-white/50 font-mono text-sm">
                {String(slides.length).padStart(2, '0')}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce">
        <span className="text-white/50 text-[9px] uppercase tracking-[0.3em] mb-2">Scroll</span>
        <ArrowDown className="w-4 h-4 text-white/50" />
      </div>
    </section>
  );
}
