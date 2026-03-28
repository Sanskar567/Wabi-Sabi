import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scaleImage = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT SIDE: Image with Parallax */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl group"
          >
            <motion.div 
              style={{ y: yParallax, scale: scaleImage }}
              className="absolute inset-0 w-full h-[120%]"
            >
              <img 
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200" 
                alt="Sanctuary in Igatpuri"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-resort-ink/10 group-hover:bg-transparent transition-colors duration-700" />
            </motion.div>
            
            {/* Decorative element */}
            <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-white text-[10px] uppercase tracking-[0.3em] font-bold text-center">
                Est.<br/>2023
              </span>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Storytelling Content */}
          <div className="flex flex-col space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-resort-gold uppercase tracking-[0.4em] text-xs font-bold mb-6">
                About Us
              </p>
              
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-resort-ink leading-[1.1] mb-8">
                A sanctuary in the <br/>
                <span className="italic text-resort-gold">heart of nature</span>
              </h2>
              
              <div className="w-20 h-[1px] bg-resort-gold mb-8" />
              
              <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                Nestled in the serene beauty of Igatpuri, surrounded by majestic mountains and lush greenery, our resort is designed to bring you closer to nature while offering unmatched comfort and luxury.
              </p>
              
              <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-xl mt-6">
                Every corner of Wabi Sabi is a testament to the beauty of imperfection and the tranquility of the natural world. From our curated suites to our panoramic mountain views, we invite you to find your peace.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="pt-8"
            >
              <Link 
                to="/about"
                className="group relative inline-flex items-center space-x-4 px-8 py-4 bg-resort-ink text-white rounded-full overflow-hidden transition-all duration-500 hover:pr-12"
              >
                <span className="relative z-10 uppercase tracking-[0.2em] text-xs font-bold">
                  Discover More
                </span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                <div className="absolute inset-0 bg-resort-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
      
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 -right-24 -translate-y-1/2 pointer-events-none select-none hidden xl:block">
        <span className="text-[20vw] font-serif text-resort-bg/50 leading-none uppercase tracking-tighter">
          Wabi Sabi
        </span>
      </div>
    </section>
  );
}
