import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-resort-ink text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="inline-block">
              <img 
                src="src/components/WabiSabiLogo.webp" 
                alt="Wabi Sabi Logo"
                className="h-12 w-auto brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-white/50 font-light leading-relaxed text-sm">
              Experience the serene beauty of Wabi Sabi Resorts in Igatpuri. Luxury accommodations, swimming pool, and unforgettable experiences.
            </p>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: '#C5A059' }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-resort-gold">Explore</h4>
            <ul className="space-y-4">
              {['About Us', 'Our Rooms', 'Experiences', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-white/60 hover:text-white transition-colors text-sm font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-resort-gold">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-resort-gold shrink-0" />
                <span className="text-white/60 text-sm font-light">Wabi-Sabi Resort, Gat - 853, Murambi Gaon, Wadiware, Tal - Igatpuri, Nashik, Maharashtra 422403</span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone className="w-5 h-5 text-resort-gold shrink-0" />
                <span className="text-white/60 text-sm font-light">+91 8908916363</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-resort-gold shrink-0" />
                <span className="text-white/60 text-sm font-light">resortwabisabi@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-resort-gold">Newsletter</h4>
            <p className="text-white/50 text-sm font-light">Subscribe to receive exclusive offers and updates.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-white/5 border-b border-white/10 py-3 px-0 text-sm focus:outline-none focus:border-resort-gold transition-colors"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-resort-gold uppercase text-[10px] tracking-widest font-bold">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-white/30 text-[10px] uppercase tracking-widest">
            © 2026 Wabi Sabi Resort. All Rights Reserved.
          </p>
          <div className="flex space-x-8">
            <a href="#" className="text-white/30 text-[10px] uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/30 text-[10px] uppercase tracking-widest hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
