import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, Search } from 'lucide-react';
import { gsap } from 'gsap';

export default function BookingBar({ startAnimation = true }: { startAnimation?: boolean }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startAnimation) return;

    gsap.fromTo(barRef.current,
      { opacity: 0, y: 100 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.5, 
        delay: 1.2,
        ease: "elastic.out(1, 0.8)" 
      }
    );
  }, [startAnimation]);

  return (
    <div
      ref={barRef}
      className="relative z-20 -mt-10 max-w-6xl mx-auto px-6 opacity-0"
    >
      <div className="bg-white shadow-2xl rounded-xl p-4 md:p-4 flex flex-col md:flex-row items-stretch md:items-center gap-4">
        {/* Check In */}
        <div className="flex-1 flex items-center px-4 md:px-6 py-3 md:py-4 border md:border-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer rounded-lg">
          <Calendar className="w-5 h-5 text-resort-gold mr-4 shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Check In</p>
            <p className="text-sm font-medium text-resort-ink">Select Date</p>
          </div>
        </div>

        {/* Check Out */}
        <div className="flex-1 flex items-center px-4 md:px-6 py-3 md:py-4 border md:border-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer rounded-lg">
          <Calendar className="w-5 h-5 text-resort-gold mr-4 shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Check Out</p>
            <p className="text-sm font-medium text-resort-ink">Select Date</p>
          </div>
        </div>

        {/* Guests */}
        <div className="flex-1 flex items-center px-4 md:px-6 py-3 md:py-4 border md:border-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer rounded-lg">
          <Users className="w-5 h-5 text-resort-gold mr-4 shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Guests</p>
            <p className="text-sm font-medium text-resort-ink">2 Adults, 0 Children</p>
          </div>
        </div>

        {/* Search Button */}
        <button className="bg-resort-ink text-white px-8 md:px-10 py-4 md:py-5 rounded-lg flex items-center justify-center space-x-3 hover:bg-resort-gold transition-all duration-500 group w-full md:w-auto">
          <span className="uppercase tracking-[0.2em] text-xs font-semibold">Check Availability</span>
          <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
}
