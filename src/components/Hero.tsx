import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { cn } from '@/src/lib/utils';

// Import hero images
import galleryBg from '@/src/components/images/GalleryBackground_19_11zon.png';
import yamaVillaHero from '@/src/components/images/yama_villa_hero_2.webp';
import gardenImg from '@/src/components/images/garden.png';
import poolHeroImg from '@/src/components/images/pool_hero.png';

const slides = [
  {
    title: "Mountain Sanctuary",
    location: "Igatpuri, Maharashtra",
    image: galleryBg,
    desc: "Experience the harmony of nature and luxury in our mountain retreat."
  },
  {
    title: "Royal Suite",
    location: "Luxury Accommodations",
    image: yamaVillaHero,
    desc: "Spacious and elegantly designed, offering breathtaking views."
  },
  {
    title: "Infinity Pool",
    location: "Wellness & Relaxation",
    image: gardenImg,
    desc: "Dive into tranquility with our panoramic infinity pool."
  },
  {
    title: "Swiss Tents",
    location: "Adventure & Comfort",
    image: poolHeroImg,
    desc: "Reconnect with nature without compromising on modern comfort."
  }
];

interface HeroProps {
  startAnimation?: boolean;
}

export default function Hero({ startAnimation }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (startAnimation) {
      const tl = gsap.timeline();
      
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out"
      }, 0.2);

      tl.to(subtextRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out"
      }, 0.4);

      tl.to(carouselRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out"
      }, 0.6);
    }
  }, [startAnimation]);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-play timer (3 second gap)
  useEffect(() => {
    if (!startAnimation) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(timer);
  }, [startAnimation, nextSlide]);

  return (
    <section className="relative h-screen min-h-[800px] w-full overflow-hidden bg-resort-ink">
      {/* Background Image Layer */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 transition-all duration-1000 ease-in-out scale-105"
      >
        <img 
          src={slides[activeSlide].image} 
          alt="Resort Background"
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-resort-ink/60 via-transparent to-resort-ink/80" />
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="overflow-hidden">
              <h1 
                ref={titleRef}
                className="text-5xl md:text-7xl lg:text-8xl text-white font-serif leading-[1.1] opacity-0 translate-y-20"
              >
                Creating happy and <br />
                <span className="italic text-resort-gold">everlasting</span> experiences
              </h1>
            </div>
            
          

            <div className="flex items-center space-x-8 pt-4">
              <button className="bg-resort-gold text-white px-10 py-4 rounded-full uppercase tracking-[0.2em] text-xs font-bold hover:bg-white hover:text-resort-ink transition-all duration-500 shadow-xl">
                Explore Property
              </button>
              <button className="flex items-center space-x-4 text-white group">
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-resort-ink transition-all duration-500">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <span className="uppercase tracking-widest text-[10px] font-bold">Watch Video</span>
              </button>
            </div>
          </div>

          {/* 3D Curved Carousel */}
          <div 
            ref={carouselRef}
            className="relative h-[400px] md:h-[500px] perspective-1000 opacity-0 translate-y-20 hidden md:flex items-center justify-center"
          >
            <div className="relative w-full h-full preserve-3d flex items-center justify-center">
              {slides.map((slide, i) => {
                const offset = (i - activeSlide + slides.length) % slides.length;
                let rotateY = 0;
                let translateZ = 0;
                let opacity = 0;
                let zIndex = 0;
                let scale = 1;

                if (offset === 0) {
                  rotateY = 0;
                  translateZ = 200;
                  opacity = 1;
                  zIndex = 10;
                  scale = 1.1;
                } else if (offset === 1 || offset === - (slides.length - 1)) {
                  rotateY = -45;
                  translateZ = 0;
                  opacity = 0.5;
                  zIndex = 5;
                  scale = 0.8;
                } else if (offset === slides.length - 1 || offset === -1) {
                  rotateY = 45;
                  translateZ = 0;
                  opacity = 0.5;
                  zIndex = 5;
                  scale = 0.8;
                }

                return (
                  <div
                    key={i}
                    className="absolute w-[300px] h-[450px] transition-all duration-1000 ease-out cursor-pointer"
                    style={{
                      transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
                      opacity: opacity,
                      zIndex: zIndex,
                    }}
                    onClick={() => setActiveSlide(i)}
                  >
                    <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                      <img 
                        src={slide.image} 
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                        <p className="text-resort-gold text-[10px] uppercase tracking-widest mb-2">{slide.location}</p>
                        <h3 className="text-white text-2xl font-serif">{slide.title}</h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Controls */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center space-x-6">
              <button 
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-resort-ink transition-all duration-500"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex space-x-2">
                {slides.map((_, i) => (
                  <div 
                    key={i}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-500",
                      activeSlide === i ? "bg-resort-gold w-8" : "bg-white/20"
                    )}
                  />
                ))}
              </div>
              <button 
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-resort-ink transition-all duration-500"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
}
