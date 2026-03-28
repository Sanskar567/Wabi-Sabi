import { motion } from 'motion/react';
import { FadeUp, StaggerContainer } from '@/src/components/ui/MotionWrappers';
import { Waves, Mountain, Gamepad2, Bike, Sparkles } from 'lucide-react';

const activities = [
  { 
    icon: Waves, 
    title: "Swimming Pool", 
    desc: "Dive into our panoramic infinity pool with stunning mountain views. Perfect for a refreshing morning swim or a sunset soak." 
  },
  { 
    icon: Mountain, 
    title: "Nature Walks", 
    desc: "Explore the lush landscapes of Igatpuri with guided trekking and nature walks through seasonal waterfalls and mist." 
  },
  { 
    icon: Gamepad2, 
    title: "Indoor Games", 
    desc: "Enjoy a variety of indoor and outdoor games, from table tennis to badminton, designed for both kids and adults." 
  },
  { 
    icon: Bike, 
    title: "Cycling", 
    desc: "Pedal through the serene property and surrounding trails for a refreshing adventure in the heart of nature." 
  },
  { 
    icon: Sparkles, 
    title: "Wellness", 
    desc: "Reconnect with your inner self through our wellness programs, including yoga and meditation in a peaceful sanctuary." 
  }
];

export default function ActivitiesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeUp>
            <p className="text-resort-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">Experiences</p>
            <h2 className="text-4xl md:text-6xl font-serif mb-6">Unforgettable Moments</h2>
            <div className="w-24 h-1 bg-resort-gold mx-auto" />
          </FadeUp>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {activities.map((activity, i) => (
            <motion.div
              key={i}
              variants={{
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 }
              }}
              className="group bg-resort-bg p-12 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 text-center"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:bg-resort-gold group-hover:text-white transition-all duration-500">
                <activity.icon className="w-8 h-8 text-resort-gold group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-serif mb-6 uppercase tracking-widest">{activity.title}</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                {activity.desc}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
