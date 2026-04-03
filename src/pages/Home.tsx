import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import BookingBar from '@/components/BookingBar';
import FloatingStrip from '@/components/FloatingStrip';
import RoomsSection from '@/components/RoomsSection';
import EventsSection from '@/components/EventsSection';
import StatsSection from '@/components/StatsSection';
import ActivitiesSection from '@/components/ActivitiesSection';
import SplashScreen from '@/components/SplashScreen';
import Testimonials from '@/components/ui/twitter-testimonial-cards';
import { FadeUp, StaggerContainer } from '@/components/ui/MotionWrappers';
import { motion, AnimatePresence } from 'motion/react';
import { Wind, Sun, Waves, Coffee, MapPin, Play, X, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';

const experiences = [
  { icon: Wind, title: "Pure Air", desc: "Breathe in the freshest mountain breeze." },
  { icon: Sun, title: "Golden Sun", desc: "Bask in the warmth of eternal summer." },
  { icon: Waves, title: "Ocean Calm", desc: "Listen to the rhythmic dance of waves." },
  { icon: Coffee, title: "Morning Bliss", desc: "Start your day with artisan perfection." },
];

const attractions = [
  {
    title: "Igatpuri Hills",
    desc: "Majestic mountain peaks offering breathtaking views and trekking trails",
    distance: "5 km from resort",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Bhatsa River Valley",
    desc: "A serene valley with panoramic views of the river and surrounding hills",
    distance: "12 km from resort",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Tringalwadi Fort",
    desc: "Historic fort located at an elevation of 3,000 feet with a small cave at the base",
    distance: "15 km from resort",
    image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Ashoka Waterfall",
    desc: "A beautiful seasonal waterfall surrounded by dense forest and rock formations",
    distance: "8 km from resort",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Camel Valley",
    desc: "Deep valley offering stunning views of the waterfalls and the river below",
    distance: "10 km from resort",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800"
  }
];

const partners = [
  { name: "Goibibo", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Goibibo_Logo.svg/1200px-Goibibo_Logo.svg.png" },
  { name: "MakeMyTrip", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/MakeMyTrip_Logo.svg/1200px-MakeMyTrip_Logo.svg.png" },
  { name: "Trivago", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Trivago_logo.svg/1200px-Trivago_logo.svg.png" },
  { name: "TripAdvisor", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/TripAdvisor_Logo.svg/1200px-TripAdvisor_Logo.svg.png" },
  { name: "Booking.com", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/1200px-Booking.com_logo.svg.png" },
];

const featuredVideos = [
  {
    title: "Weekend Getaway in Nashik | Wabi Sabi Resort",
    thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder
  },
  {
    title: "Full Resort Tour – Igatpuri",
    thumbnail: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Anniversary Celebration at Wabi Sabi",
    thumbnail: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Luxury Stay Near Mumbai",
    thumbnail: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

export default function Home() {
  const [showSplash, setShowSplash] = useState(false);
  const [startHeroAnim, setStartHeroAnim] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    setShowSplash(true);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setStartHeroAnim(true);
  };

  return (
    <main className="overflow-hidden">
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <Hero startAnimation={startHeroAnim} />
      <BookingBar startAnimation={startHeroAnim} />
      <FloatingStrip startAnimation={startHeroAnim} />
      
      {/* Experience Section */}
      <section className="py-24 bg-resort-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeUp>
              <p className="text-resort-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">The Experience</p>
              <h2 className="text-4xl md:text-6xl font-serif">Sensory Harmony</h2>
            </FadeUp>
          </div>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={{
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -10, rotate: i % 2 === 0 ? 1 : -1 }}
                className="bg-white p-10 rounded-2xl text-center shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="w-16 h-16 bg-resort-bg rounded-full flex items-center justify-center mx-auto mb-6">
                  <exp.icon className="w-8 h-8 text-resort-gold" />
                </div>
                <h3 className="text-xl font-serif mb-4 uppercase tracking-widest">{exp.title}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{exp.desc}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* About Section (Detailed Story) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative h-[600px] rounded-2xl overflow-hidden group">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.2 }}
                src="https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=1200" 
                alt="About Wabi Sabi"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-resort-ink/40 via-transparent to-transparent opacity-60" />
            </div>

            <div className="space-y-12">
              <FadeUp>
                <p className="text-resort-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">Our Story</p>
                <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-[1.1]">A retreat designed by nature</h2>
                <div className="space-y-6 text-gray-500 font-light leading-relaxed text-lg">
                  <p>
                    Nestled in the tranquil landscapes of Igatpuri, our resort is surrounded by majestic mountains, 
                    seasonal waterfalls, and dense greenery. Designed to reflect harmony with nature, every space 
                    here allows you to slow down, reconnect, and experience peace away from the chaos of city life.
                  </p>
                  <p>
                    From the crisp mountain air to the calming sounds of birds and flowing water, every moment is 
                    thoughtfully curated to create a deep connection with nature while offering modern comfort and luxury.
                  </p>
                  <p>
                    Our philosophy is rooted in the Japanese concept of Wabi Sabi—finding beauty in imperfection and 
                    the natural cycle of growth and decay. This is reflected in our architecture, our curated experiences, 
                    and the way we welcome every guest into our sanctuary.
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <Link 
                  to="/about"
                  className="inline-block bg-resort-ink text-white px-10 py-4 rounded-full uppercase tracking-[0.2em] text-xs font-bold hover:bg-resort-gold transition-all duration-500 shadow-xl"
                >
                  Discover More
                </Link>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      <RoomsSection />

      {/* Nearby Attractions Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeUp>
              <h2 className="text-4xl md:text-6xl font-serif mb-6 text-resort-ink">Nearby Attractions</h2>
              <p className="text-gray-500 font-light max-w-2xl mx-auto">
                Explore the rich history and natural beauty surrounding Wabi Sabi Resort
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {attractions.map((attr, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                whileHover={{ y: -8 }}
                className="flex flex-col sm:flex-row gap-8 items-center group"
              >
                <div className="w-full sm:w-64 h-64 rounded-3xl overflow-hidden shadow-lg shrink-0">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    src={attr.image} 
                    alt={attr.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3 text-resort-ink">
                    <MapPin className="w-5 h-5 text-resort-gold" />
                    <h3 className="text-2xl font-serif">{attr.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                    <Navigation className="w-4 h-4" />
                    <span>{attr.distance}</span>
                  </div>
                  <p className="text-gray-500 font-light leading-relaxed">
                    {attr.desc}
                  </p>
                  <button className="text-resort-gold text-xs font-bold uppercase tracking-widest border-b border-transparent hover:border-resort-gold transition-all pb-1">
                    Learn More →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-resort-bg overflow-hidden border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <FadeUp>
            <h2 className="text-3xl font-serif text-center text-resort-ink">Our Partners</h2>
          </FadeUp>
        </div>
        
        <div className="relative flex overflow-x-hidden group">
          <div className="flex animate-marquee whitespace-nowrap py-12 group-hover:[animation-play-state:paused]">
            {[...partners, ...partners].map((partner, i) => (
              <div key={i} className="mx-12 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-12 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Videos Section */}
      <section className="py-32 bg-resort-ink text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-8">
              <FadeUp>
                <p className="text-resort-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Cinematic Stories</p>
                <h2 className="text-5xl md:text-7xl font-serif leading-[1.1]">The Wabi Sabi Experience</h2>
                <p className="text-white/40 font-light text-lg leading-relaxed max-w-md">
                  Watch our curated collection of visual narratives that capture the essence of tranquility and mountain luxury.
                </p>
              </FadeUp>
              
              <div className="flex items-center space-x-6 pt-8">
                <div className="flex -space-x-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-resort-ink bg-gray-800 overflow-hidden shadow-xl">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <p className="text-xs uppercase tracking-widest text-white/60 font-bold">10k+ Views this month</p>
              </div>
            </div>

            <div className="lg:col-span-7 relative">
              <div className="grid grid-cols-2 gap-6">
                {featuredVideos.map((video, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "relative aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer group shadow-2xl",
                      i % 2 === 1 ? "mt-12" : "-mt-12"
                    )}
                    onClick={() => setActiveVideo(video.url)}
                  >
                    <motion.img 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 1.2 }}
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <div className="mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                        <p className="text-resort-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-2">Watch Film</p>
                        <h4 className="text-xl font-serif leading-tight">{video.title}</h4>
                      </div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 self-end"
                      >
                        <Play className="w-5 h-5 text-white fill-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <EventsSection />
      <StatsSection />
      <ActivitiesSection />
      {/* Reviews Section */}
      <section className="py-32 bg-resort-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <FadeUp>
                <p className="text-resort-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Guest Voices</p>
                <h2 className="text-5xl md:text-7xl font-serif leading-[1.1]">Whispers of <br /> Satisfaction</h2>
                <p className="text-gray-500 font-light text-lg leading-relaxed max-w-md">
                  Discover why our guests find solace in the mountains. Real stories from real travelers who found their peace at Wabi Sabi.
                </p>
              </FadeUp>
              
              <div className="pt-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Sun key={i} className="w-5 h-5 text-resort-gold fill-resort-gold" />
                  ))}
                </div>
                <p className="text-resort-ink font-serif text-2xl">4.9 / 5.0 Rating</p>
                <p className="text-gray-400 text-sm tracking-widest uppercase mt-2">Based on 2,500+ reviews</p>
              </div>
            </div>

            <div className="relative py-20">
              <Testimonials />
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe
                src={activeVideo}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <FadeUp>
              <p className="text-resort-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">Visual Journey</p>
              <h2 className="text-4xl md:text-6xl font-serif">Gallery</h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <Link to="/gallery" className="text-xs uppercase tracking-[0.3em] font-bold border-b border-resort-ink/20 pb-2 hover:border-resort-gold transition-colors">
                View Full Gallery
              </Link>
            </FadeUp>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
            ].map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="relative aspect-square overflow-hidden rounded-lg group"
              >
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  src={url}
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-resort-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-resort-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-12">
              <FadeUp>
                <p className="text-resort-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">Contact Us</p>
                <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-[1.1]">Plan your escape</h2>
                <p className="text-gray-500 font-light leading-relaxed text-lg">
                  Located in the heart of Igatpuri, our resort is easily accessible from Mumbai and Nashik. 
                  Reach out to us to plan your perfect mountain retreat.
                </p>
              </FadeUp>

              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-resort-gold shadow-sm">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Distance</h4>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">
                      120 km from Mumbai (approx. 3 hours) <br />
                      45 km from Nashik (approx. 1 hour)
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-[300px] rounded-2xl overflow-hidden shadow-xl grayscale hover:grayscale-0 transition-all duration-1000">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15000!2d73.5!3d19.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd96f0!2sIgatpuri!5e0!3m2!1sen!2sin!4v1234567890" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="bg-white p-12 rounded-2xl shadow-2xl">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                    <input type="text" className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-resort-gold transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                    <input type="email" className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-resort-gold transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Subject</label>
                  <input type="text" className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-resort-gold transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Message</label>
                  <textarea rows={4} className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-resort-gold transition-colors resize-none" />
                </div>
                <button className="w-full bg-resort-ink text-white py-5 rounded-lg uppercase tracking-[0.2em] text-xs font-bold hover:bg-resort-gold transition-all duration-500 shadow-xl">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
