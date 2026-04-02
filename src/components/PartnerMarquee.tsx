import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: "Goibibo", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Goibibo_Logo.svg/1200px-Goibibo_Logo.svg.png" },
  { name: "MakeMyTrip", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/MakeMyTrip_Logo.svg/1200px-MakeMyTrip_Logo.svg.png" },
  { name: "Trivago", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Trivago_logo.svg/1200px-Trivago_logo.svg.png" },
  { name: "TripAdvisor", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/TripAdvisor_Logo.svg/1200px-TripAdvisor_Logo.svg.png" },
  { name: "Booking.com", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/1200px-Booking.com_logo.svg.png" },
];

export default function PartnerMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-linked horizontal movement
      gsap.to(trackRef.current, {
        x: (i, target) => {
          return -target.offsetWidth / 2;
        },
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5, // Smooth scrub
        }
      });

      // Individual logo scale effect based on scroll position relative to viewport center
      const logos = gsap.utils.toArray('.marquee-logo');
      logos.forEach((logo: any) => {
        gsap.fromTo(logo, 
          { scale: 0.8, opacity: 0.3 },
          { 
            scale: 1.1, 
            opacity: 1,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: logo,
              start: "left right",
              end: "center center",
              scrub: true,
              containerAnimation: gsap.to(trackRef.current, { x: -trackRef.current!.offsetWidth / 2, ease: "none" })
            }
          }
        );
      });

      // Subtle perspective tilt effect on scroll
      gsap.to(containerRef.current, {
        rotateX: 5,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative z-30 -mt-24 mb-[-60px] py-20 overflow-visible pointer-events-none"
      style={{ perspective: "1200px" }}
    >
      <div 
        className="relative w-[140%] -left-[20%] py-10 md:py-14 bg-white/90 backdrop-blur-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-y border-white/20 rotate-[-2deg] md:rotate-[-4deg] pointer-events-auto transition-transform duration-700 ease-out"
      >
        {/* Edge Fades & Blur */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/40 to-transparent z-10 pointer-events-none backdrop-blur-[2px]" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white via-white/40 to-transparent z-10 pointer-events-none backdrop-blur-[2px]" />

        <div 
          ref={trackRef}
          className="flex whitespace-nowrap items-center will-change-transform"
        >
          {[...partners, ...partners, ...partners, ...partners].map((partner, i) => (
            <div 
              key={i} 
              className="marquee-logo mx-10 md:mx-24 flex items-center justify-center group"
            >
              <div className="rotate-[2deg] md:rotate-[4deg] transition-all duration-700 ease-out group-hover:scale-125 group-hover:rotate-0">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-8 md:h-14 w-auto object-contain grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Subtle shadow layer for depth */}
      <div className="absolute inset-x-0 bottom-10 h-20 bg-black/5 blur-3xl -z-10 rotate-[-4deg] scale-90" />
    </div>
  );
}
