import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { FadeUp, StaggerContainer } from './ui/MotionWrappers';
import { Camera, Compass, Utensils, Waves } from 'lucide-react';

const activities = [
  { icon: Waves, title: "Swimming Pool", desc: "Take a refreshing dip in our pristine pool with a mountain view." },
  { icon: Compass, title: "Nature Trails", desc: "Explore the lush green landscapes of Igatpuri on guided walks." },
  { icon: Utensils, title: "Artisan Dining", desc: "Enjoy authentic local and international cuisines at our restaurant." },
  { icon: Camera, title: "Photography", desc: "Capture the stunning sunrises and sunsets over the Sahyadri range." },
];

export default function ActivitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0.2, 0.5],
    ["inset(10%)", "inset(0%)"]
  );

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <FadeUp>
              <p className="text-resort-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">Adventure & Leisure</p>
              <h2 className="text-4xl md:text-6xl font-serif mb-8">Resort Activities</h2>
              <p className="text-gray-500 font-light leading-relaxed mb-12 max-w-lg">
                At Wabi Sabi, we offer a range of activities designed to help you reconnect with nature and yourself. Whether you seek adventure or tranquility, there's something for everyone.
              </p>
            </FadeUp>
            
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {activities.map((act, i) => (
                <motion.div
                  key={i}
                  variants={{
                    initial: { opacity: 0, x: -20 },
                    animate: { opacity: 1, x: 0 }
                  }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-resort-bg rounded-lg flex items-center justify-center shrink-0">
                    <act.icon className="w-6 h-6 text-resort-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif uppercase tracking-widest text-sm mb-2">{act.title}</h4>
                    <p className="text-gray-400 text-xs font-light leading-relaxed">{act.desc}</p>
                  </div>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
          
          <div className="w-full md:w-1/2 relative">
            <motion.div
              style={{ clipPath }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="aspect-[4/5] rounded-[24px] overflow-hidden shadow-2xl"
            >
              <img
                src="https://wabisabiresorts.com/wp-content/uploads/2023/04/Swimming-Pool-Wabi-Sabi-Igatpuri.jpg"
                alt="Activities"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-resort-gold rounded-[24px] -z-10 hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
