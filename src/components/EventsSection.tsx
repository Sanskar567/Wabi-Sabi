import { motion } from 'motion/react';
import { FadeUp } from '@/components/ui/MotionWrappers';
import { Calendar, Users, Heart, Briefcase } from 'lucide-react';

const eventTypes = [
  { icon: Heart, title: "Weddings", desc: "Exchange vows amidst the serene beauty of the mountains and lush greenery." },
  { icon: Briefcase, title: "Corporate", desc: "Inspire your team with a retreat designed for productivity and relaxation." },
  { icon: Users, title: "Private", desc: "Celebrate life's special moments with your loved ones in a private sanctuary." },
  { icon: Calendar, title: "Events", desc: "From workshops to festivals, we offer the perfect setting for any occasion." },
];

export default function EventsSection() {
  return (
    <section className="py-24 bg-resort-green text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Content */}
          <div className="space-y-12">
            <FadeUp>
              <p className="text-resort-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">Celebrations</p>
              <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-[1.1]">Celebrate life’s special moments</h2>
              <p className="text-gray-400 font-light leading-relaxed text-lg">
                Whether it’s a birthday, anniversary, corporate retreat, or private gathering, 
                our resort offers the perfect setting to create unforgettable celebrations surrounded by nature.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {eventTypes.map((event, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="flex items-start space-x-6 group">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-resort-gold group-hover:bg-resort-gold group-hover:text-white transition-all duration-500">
                      <event.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif mb-3 tracking-widest uppercase">{event.title}</h3>
                      <p className="text-gray-500 text-sm font-light leading-relaxed">{event.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.4}>
              <button className="bg-white text-resort-ink px-10 py-4 rounded-full uppercase tracking-[0.2em] text-xs font-bold hover:bg-resort-gold hover:text-white transition-all duration-500 shadow-xl">
                Plan Your Event
              </button>
            </FadeUp>
          </div>

          {/* Image */}
          <div className="relative h-[600px] rounded-2xl overflow-hidden group">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.2 }}
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200" 
              alt="Events at Lumina"
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-resort-ink via-transparent to-transparent opacity-60" />
            
            <div className="absolute bottom-12 left-12 right-12 p-10 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <p className="text-white text-lg font-serif italic mb-4">
                "The most beautiful setting for our anniversary. The team went above and beyond to make it special."
              </p>
              <p className="text-resort-gold text-[10px] uppercase tracking-widest font-bold">
                — Sarah & James, London
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
