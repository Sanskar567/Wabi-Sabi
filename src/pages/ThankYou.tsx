import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, Users, Home } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function ThankYou() {
  const { booking } = useBooking();

  return (
    <div className="pt-48 pb-32 text-center bg-resort-bg min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-24 h-24 bg-resort-gold rounded-full flex items-center justify-center mx-auto mb-12 shadow-xl"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-serif text-resort-ink mb-8"
        >
          Thank You, <br /> <span className="text-resort-gold italic">{booking.userInfo.fullName || 'Guest'}</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-500 font-light text-lg mb-12 max-w-xl mx-auto"
        >
          Your reservation for <span className="font-bold text-resort-ink">{booking.roomType}</span> has been confirmed. A confirmation email has been sent to <span className="font-bold text-resort-ink">{booking.userInfo.email || 'your email'}</span>.
        </motion.p>

        {/* Booking Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12 text-left grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-resort-gold mb-2">
              <Home className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Room</span>
            </div>
            <p className="text-lg font-serif text-resort-ink">{booking.roomType}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-resort-gold mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Dates</span>
            </div>
            <p className="text-sm font-medium text-resort-ink">
              {booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : 'N/A'} - <br />
              {booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : 'N/A'}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-resort-gold mb-2">
              <Users className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Guests</span>
            </div>
            <p className="text-lg font-serif text-resort-ink">{booking.guests} Adults</p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <p className="text-sm text-gray-400 italic">
            * Please note: Full payment of ₹10,030 will be collected at the property.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-resort-ink text-white px-12 py-5 rounded-full uppercase tracking-[0.3em] text-xs font-bold hover:bg-resort-gold transition-all duration-500 shadow-xl"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
