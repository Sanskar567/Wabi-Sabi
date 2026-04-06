import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Phone, Mail, Navigation, 
  MessageSquare, Clock, Calendar, Users,
  ArrowRight, ExternalLink
} from 'lucide-react';
import { FadeUp, StaggerContainer } from '@/components/ui/MotionWrappers';
import contact_img from '@/assets/images/edit.png';
import { cn } from '@/lib/utils';

const contactCards = [
  {
    icon: Phone,
    title: "Call Us",
    text: "+91 98765 43210",
    subtext: "Available 24/7 for reservations",
    action: "tel:+919876543210"
  },
  {
    icon: Mail,
    title: "Email Us",
    text: "info@wabisabiresorts.com",
    subtext: "We respond within 24 hours",
    action: "mailto:info@wabisabiresorts.com"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    text: "Igatpuri, Maharashtra",
    subtext: "Get directions to sanctuary",
    action: "https://maps.app.goo.gl/ZWvnVex3B42gBzZR7"
  }
];

export default function Contact() {
  return (
    <main className="bg-resort-bg min-h-screen overflow-hidden">
      {/* 1. HERO BANNER */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src= {contact_img}
            alt="Scenic Mountain View"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-resort-ink/60 via-resort-ink/40 to-resort-ink/60" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h1 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-8xl font-serif text-white mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg md:text-xl text-white/80 font-light leading-relaxed tracking-wide"
          >
            We’re here to help you plan your perfect escape into nature.
          </motion.p>
        </div>
      </section>

      {/* 2. CONTACT INFO + FORM SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            
            {/* LEFT SIDE: CONTACT DETAILS */}
            <div className="space-y-12">
              <FadeUp>
                <p className="text-resort-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">Concierge</p>
                <h2 className="text-4xl md:text-6xl font-serif text-resort-ink mb-8 leading-[1.1]">Reach out to our sanctuary</h2>
                <p className="text-gray-500 font-light leading-relaxed text-lg max-w-lg">
                  Whether you have a question about our villas, want to plan a special event, or simply need assistance with your booking, our dedicated team is here to ensure your journey to Wabi Sabi is seamless.
                </p>
              </FadeUp>

              <StaggerContainer className="space-y-10">
                <motion.div variants={{ initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } }} className="flex items-start space-x-6 group">
                  <div className="w-14 h-14 rounded-full bg-resort-bg flex items-center justify-center text-resort-gold group-hover:bg-resort-gold group-hover:text-white transition-all duration-500 shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-2 text-resort-ink">Location</h4>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">Igatpuri, Maharashtra, India</p>
                  </div>
                </motion.div>

                <motion.div variants={{ initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } }} className="flex items-start space-x-6 group">
                  <div className="w-14 h-14 rounded-full bg-resort-bg flex items-center justify-center text-resort-gold group-hover:bg-resort-gold group-hover:text-white transition-all duration-500 shadow-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-2 text-resort-ink">Phone</h4>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">+91 98765 43210</p>
                  </div>
                </motion.div>

                <motion.div variants={{ initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } }} className="flex items-start space-x-6 group">
                  <div className="w-14 h-14 rounded-full bg-resort-bg flex items-center justify-center text-resort-gold group-hover:bg-resort-gold group-hover:text-white transition-all duration-500 shadow-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-2 text-resort-ink">Email</h4>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">info@wabisabiresorts.com</p>
                  </div>
                </motion.div>

                <motion.div variants={{ initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } }} className="flex items-start space-x-6 group">
                  <div className="w-14 h-14 rounded-full bg-resort-bg flex items-center justify-center text-resort-gold group-hover:bg-resort-gold group-hover:text-white transition-all duration-500 shadow-sm">
                    <Navigation className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-2 text-resort-ink">Distance</h4>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">
                      Located 150 km from Mumbai <br />
                      28 km from Nashik
                    </p>
                  </div>
                </motion.div>
              </StaggerContainer>
            </div>

            {/* RIGHT SIDE: CONTACT FORM */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-50">
              <form className="space-y-8">
                <StaggerContainer>
                  <motion.div variants={{ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }} className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-resort-bg/30 border-b border-gray-100 py-4 px-4 rounded-xl focus:outline-none focus:border-resort-gold focus:bg-white focus:shadow-lg transition-all duration-300 placeholder:text-gray-300" 
                    />
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div variants={{ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }} className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full bg-resort-bg/30 border-b border-gray-100 py-4 px-4 rounded-xl focus:outline-none focus:border-resort-gold focus:bg-white focus:shadow-lg transition-all duration-300 placeholder:text-gray-300" 
                      />
                    </motion.div>
                    <motion.div variants={{ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }} className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="+91 00000 00000"
                        className="w-full bg-resort-bg/30 border-b border-gray-100 py-4 px-4 rounded-xl focus:outline-none focus:border-resort-gold focus:bg-white focus:shadow-lg transition-all duration-300 placeholder:text-gray-300" 
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div variants={{ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }} className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Check-in</label>
                      <div className="relative">
                        <input 
                          type="date" 
                          className="w-full bg-resort-bg/30 border-b border-gray-100 py-4 px-4 rounded-xl focus:outline-none focus:border-resort-gold focus:bg-white focus:shadow-lg transition-all duration-300 text-gray-500" 
                        />
                      </div>
                    </motion.div>
                    <motion.div variants={{ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }} className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Check-out</label>
                      <div className="relative">
                        <input 
                          type="date" 
                          className="w-full bg-resort-bg/30 border-b border-gray-100 py-4 px-4 rounded-xl focus:outline-none focus:border-resort-gold focus:bg-white focus:shadow-lg transition-all duration-300 text-gray-500" 
                        />
                      </div>
                    </motion.div>
                    <motion.div variants={{ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }} className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Guests</label>
                      <select 
                        defaultValue="2 Guests"
                        className="w-full bg-resort-bg/30 border-b border-gray-100 py-4 px-4 rounded-xl focus:outline-none focus:border-resort-gold focus:bg-white focus:shadow-lg transition-all duration-300 text-gray-500 appearance-none"
                      >
                        <option value="1 Guest">1 Guest</option>
                        <option value="2 Guests">2 Guests</option>
                        <option value="3 Guests">3 Guests</option>
                        <option value="4+ Guests">4+ Guests</option>
                      </select>
                    </motion.div>
                  </div>

                  <motion.div variants={{ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }} className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Message</label>
                    <textarea 
                      rows={4} 
                      placeholder="Tell us about your requirements..."
                      className="w-full bg-resort-bg/30 border-b border-gray-100 py-4 px-4 rounded-xl focus:outline-none focus:border-resort-gold focus:bg-white focus:shadow-lg transition-all duration-300 resize-none placeholder:text-gray-300" 
                    />
                  </motion.div>

                  <motion.button 
                    variants={{ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-resort-green text-white py-5 rounded-xl uppercase tracking-[0.3em] text-xs font-bold hover:bg-resort-gold transition-all duration-500 shadow-xl mt-4"
                  >
                    Send Inquiry
                  </motion.button>
                </StaggerContainer>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAP SECTION */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-1000">
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
        
        {/* Map Overlay Card */}
        <div className="absolute top-12 left-6 md:left-12 max-w-sm">
          <FadeUp>
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20">
              <h3 className="text-xl font-serif text-resort-ink mb-4">Wabi Sabi Sanctuary</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed mb-6">
                Plot No. 42, Mist Valley, <br />
                Igatpuri, Maharashtra 422403
              </p>
              <a 
                href="https://maps.app.goo.gl/ZWvnVex3B42gBzZR7" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center text-[10px] uppercase tracking-widest font-bold text-resort-gold hover:text-resort-ink transition-colors"
              >
                Get Directions <ExternalLink className="w-3 h-3 ml-2" />
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 5. QUICK CONTACT CARDS */}
      <section className="py-24 bg-resort-bg">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactCards.map((card, i) => (
              <motion.a
                key={i}
                href={card.action}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -8 }}
                className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 group text-center"
              >
                <div className="w-16 h-16 bg-resort-bg rounded-full flex items-center justify-center text-resort-gold mx-auto mb-6 group-hover:bg-resort-gold group-hover:text-white transition-all duration-500">
                  <card.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-serif text-resort-ink mb-2">{card.title}</h4>
                <p className="text-resort-gold font-bold mb-2 tracking-wide">{card.text}</p>
                <p className="text-gray-400 text-xs uppercase tracking-widest">{card.subtext}</p>
              </motion.a>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1920" 
            alt="CTA Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-resort-ink/60" />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <h2 className="text-4xl md:text-7xl font-serif text-white mb-12">
              Plan your stay <br /> <span className="italic text-resort-gold">with us today</span>
            </h2>
            <Link 
              to="/booking"
              className="inline-block bg-resort-gold text-white px-12 py-5 rounded-full uppercase tracking-[0.3em] text-xs font-bold hover:bg-white hover:text-resort-ink transition-all duration-500 shadow-2xl"
            >
              Book Your Stay
            </Link>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
