import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-resort-ink text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="inline-block">
              <img 
                src="https://wabisabiresorts.com/wp-content/uploads/2023/04/Wabi-Sabi-Logo.png" 
                alt="Wabi Sabi Logo"
                className="h-12 w-auto brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-gray-400 font-light leading-relaxed text-sm">
              Experience the harmony of nature and luxury in the heart of Igatpuri. 
              A sanctuary designed for those who seek peace, comfort, and unforgettable memories.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-resort-gold transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-resort-gold transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-resort-gold transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-xl mb-8 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-widest">Our Story</Link></li>
              <li><Link to="/rooms" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-widest">Accommodations</Link></li>
              <li><Link to="/experiences" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-widest">Experiences</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-widest">Gallery</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-widest">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-xl mb-8 uppercase tracking-widest">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-resort-gold shrink-0" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  Gat No. 123, Igatpuri, <br />
                  Nashik, Maharashtra 422403
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone className="w-5 h-5 text-resort-gold shrink-0" />
                <span className="text-gray-400 text-sm">+91 12345 67890</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-resort-gold shrink-0" />
                <span className="text-gray-400 text-sm">info@wabisabiresort.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-xl mb-8 uppercase tracking-widest">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-6 font-light">
              Subscribe to receive updates on seasonal offers and events.
            </p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-gray-700 py-3 text-sm focus:outline-none focus:border-resort-gold transition-colors"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-resort-gold uppercase text-[10px] tracking-widest font-bold">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest">
            © 2026 Wabi Sabi Resort. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <a href="#" className="text-gray-500 hover:text-white text-[10px] uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-[10px] uppercase tracking-widest">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
