import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { 
  Calendar, Users, Home, ArrowRight, ArrowLeft, 
  CreditCard, User, ShieldCheck, Info, CheckCircle2 
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import HouseRules from '@/components/HouseRules';

const steps = [
  { id: 1, title: 'Booking Info', icon: Info },
  { id: 2, title: 'Guest Details', icon: User },
  { id: 3, title: 'Payment Info', icon: CreditCard },
  { id: 4, title: 'Guidelines', icon: ShieldCheck },
];

export default function Booking() {
  const { booking, updateBooking } = useBooking();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const constructBookingUrl = () => {
    const baseUrl = "https://www.booking.com/hotel/in/wabi-sabi-resort-nashik.html";
    if (!booking.checkIn || !booking.checkOut) return baseUrl;

    try {
      const checkin = new Date(booking.checkIn).toISOString().split('T')[0];
      const checkout = new Date(booking.checkOut).toISOString().split('T')[0];
      const adults = booking.guests || 2;
      const rooms = 1;

      return `${baseUrl}?checkin=${checkin}&checkout=${checkout}&group_adults=${adults}&no_rooms=${rooms}`;
    } catch (e) {
      return baseUrl;
    }
  };

  const nextStep = () => {
    if (currentStep === 2) {
      if (!booking.userInfo.fullName || !booking.userInfo.email || !booking.userInfo.phone) {
        alert('Please fill in all guest details.');
        return;
      }
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(booking.userInfo.email)) {
        alert('Please enter a valid email address.');
        return;
      }
    }
    
    if (currentStep === 3) {
      if (!booking.paymentInfo.cardNumber || !booking.paymentInfo.expiryDate || !booking.paymentInfo.cvv) {
        alert('Please fill in all payment details.');
        return;
      }
      // Basic card number validation (16 digits)
      if (booking.paymentInfo.cardNumber.replace(/\s/g, '').length < 16) {
        alert('Please enter a valid 16-digit card number.');
        return;
      }
    }

    if (currentStep < steps.length) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      // Final Step: Redirect to Booking.com
      handleFinalRedirect();
    }
  };

  const handleFinalRedirect = () => {
    setIsRedirecting(true);
    
    // Tracking
    console.log('Analytics: Booking Redirect Clicked', {
      property: 'wabi-sabi-resort-nashik',
      checkin: booking.checkIn,
      checkout: booking.checkOut,
      guests: booking.guests,
      timestamp: new Date().toISOString()
    });

    const url = constructBookingUrl();

    // 2 second delay for UX
    setTimeout(() => {
      window.open(url, '_blank');
      setIsRedirecting(false);
      navigate('/thank-you');
    }, 2000);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <div className="pt-32 pb-20 bg-resort-bg min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className={`flex flex-col items-center space-y-2 transition-colors duration-500 ${
                  currentStep >= step.id ? 'text-resort-gold' : 'text-gray-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                  currentStep >= step.id ? 'border-resort-gold bg-resort-gold text-white' : 'border-gray-200 bg-white'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold hidden md:block">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              className="absolute top-0 left-0 h-full bg-resort-gold transition-all duration-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden min-h-[500px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="w-full"
                >
                  {currentStep === 1 && <Step1Info booking={booking} updateBooking={updateBooking} />}
                  {currentStep === 2 && <Step2Details booking={booking} updateBooking={updateBooking} />}
                  {currentStep === 3 && <Step3Payment booking={booking} updateBooking={updateBooking} />}
                  {currentStep === 4 && <Step4Guidelines />}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="mt-12 flex items-center justify-between pt-8 border-t border-gray-100">
                <button 
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center space-x-2 text-xs uppercase tracking-widest font-bold transition-colors ${
                    currentStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-resort-ink hover:text-resort-gold'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button 
                  onClick={nextStep}
                  className="bg-resort-ink text-white px-10 py-4 rounded-full flex items-center space-x-3 hover:bg-resort-gold transition-all duration-500 group"
                >
                  <span className="text-xs uppercase tracking-widest font-bold">
                    {currentStep === steps.length ? 'Proceed to Secure Booking' : 'Next Step'}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="bg-resort-ink text-white rounded-3xl p-8 sticky top-32">
              <h3 className="text-2xl font-serif mb-8 border-b border-white/10 pb-4">Booking Summary</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Home className="w-5 h-5 text-resort-gold shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Room Type</p>
                    <p className="text-sm font-medium">{booking.roomType}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Calendar className="w-5 h-5 text-resort-gold shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Check In - Out</p>
                    <p className="text-sm font-medium">
                      {booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : 'Not selected'} - <br />
                      {booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : 'Not selected'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Users className="w-5 h-5 text-resort-gold shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Guests</p>
                    <p className="text-sm font-medium">{booking.guests} Adults</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/60 text-sm">Room Total</span>
                  <span className="font-bold">₹8,500</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/60 text-sm">Taxes & Fees</span>
                  <span className="font-bold">₹1,530</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <span className="text-resort-gold text-lg font-serif">Total Amount</span>
                  <span className="text-2xl font-serif">₹10,030</span>
                </div>
                <p className="text-[10px] text-white/40 mt-4 italic">
                  * Payment will be collected at the property during check-in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Redirect Overlay */}
      <AnimatePresence>
        {isRedirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-resort-ink/95 backdrop-blur-md flex flex-col items-center justify-center text-white p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-8 max-w-md"
            >
              <div className="relative w-24 h-24 mx-auto">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-resort-gold/20 border-t-resort-gold rounded-full"
                />
                <ShieldCheck className="absolute inset-0 m-auto w-10 h-10 text-resort-gold" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-serif">Secure Redirect</h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  You're being redirected to our official Booking.com page to securely complete your reservation.
                </p>
                <div className="flex items-center justify-center space-x-2 pt-4">
                  <div className="w-1.5 h-1.5 bg-resort-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-resort-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-resort-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Step1Info({ booking, updateBooking }: any) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-serif text-resort-ink">Review Your Stay</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Check-In Date</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-resort-gold" />
            <DatePicker
              selected={booking.checkIn ? new Date(booking.checkIn) : null}
              onChange={(date) => updateBooking({ checkIn: date?.toISOString() })}
              className="w-full pl-12 pr-4 py-4 bg-resort-bg rounded-xl border-none outline-none text-sm font-medium"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Check-Out Date</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-resort-gold" />
            <DatePicker
              selected={booking.checkOut ? new Date(booking.checkOut) : null}
              onChange={(date) => updateBooking({ checkOut: date?.toISOString() })}
              className="w-full pl-12 pr-4 py-4 bg-resort-bg rounded-xl border-none outline-none text-sm font-medium"
            />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Number of Guests</label>
        <div className="flex items-center space-x-4 p-4 bg-resort-bg rounded-xl">
          <Users className="w-5 h-5 text-resort-gold" />
          <div className="flex-1 flex items-center justify-between">
            <span className="text-sm font-medium">Adults & Children</span>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => updateBooking({ guests: Math.max(1, booking.guests - 1) })}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-resort-gold hover:text-white transition-all"
              >
                -
              </button>
              <span className="font-bold">{booking.guests}</span>
              <button 
                onClick={() => updateBooking({ guests: booking.guests + 1 })}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-resort-gold hover:text-white transition-all"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step2Details({ booking, updateBooking }: any) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-serif text-resort-ink">Guest Details</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Full Name</label>
          <input 
            type="text"
            value={booking.userInfo.fullName}
            onChange={(e) => updateBooking({ userInfo: { ...booking.userInfo, fullName: e.target.value } })}
            placeholder="Enter your full name"
            className="w-full px-6 py-4 bg-resort-bg rounded-xl border-none outline-none text-sm font-medium focus:ring-2 ring-resort-gold/20 transition-all"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Email Address</label>
            <input 
              type="email"
              value={booking.userInfo.email}
              onChange={(e) => updateBooking({ userInfo: { ...booking.userInfo, email: e.target.value } })}
              placeholder="your@email.com"
              className="w-full px-6 py-4 bg-resort-bg rounded-xl border-none outline-none text-sm font-medium focus:ring-2 ring-resort-gold/20 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Phone Number</label>
            <input 
              type="tel"
              value={booking.userInfo.phone}
              onChange={(e) => updateBooking({ userInfo: { ...booking.userInfo, phone: e.target.value } })}
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-6 py-4 bg-resort-bg rounded-xl border-none outline-none text-sm font-medium focus:ring-2 ring-resort-gold/20 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Step3Payment({ booking, updateBooking }: any) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-serif text-resort-ink">Payment Information</h2>
      <div className="p-6 bg-resort-gold/10 rounded-2xl border border-resort-gold/20 flex items-start space-x-4 mb-8">
        <ShieldCheck className="w-6 h-6 text-resort-gold shrink-0 mt-1" />
        <p className="text-sm text-resort-ink/70 leading-relaxed">
          We only require your card details to guarantee the reservation. <span className="font-bold text-resort-ink">No amount will be charged now.</span> Full payment will be collected at the resort.
        </p>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Card Number</label>
          <div className="relative">
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              value={booking.paymentInfo.cardNumber}
              onChange={(e) => updateBooking({ paymentInfo: { ...booking.paymentInfo, cardNumber: e.target.value } })}
              placeholder="XXXX XXXX XXXX XXXX"
              className="w-full pl-12 pr-6 py-4 bg-resort-bg rounded-xl border-none outline-none text-sm font-medium focus:ring-2 ring-resort-gold/20 transition-all"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Expiry Date</label>
            <input 
              type="text"
              value={booking.paymentInfo.expiryDate}
              onChange={(e) => updateBooking({ paymentInfo: { ...booking.paymentInfo, expiryDate: e.target.value } })}
              placeholder="MM / YY"
              className="w-full px-6 py-4 bg-resort-bg rounded-xl border-none outline-none text-sm font-medium focus:ring-2 ring-resort-gold/20 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">CVV</label>
            <input 
              type="password"
              value={booking.paymentInfo.cvv}
              onChange={(e) => updateBooking({ paymentInfo: { ...booking.paymentInfo, cvv: e.target.value } })}
              placeholder="XXX"
              className="w-full px-6 py-4 bg-resort-bg rounded-xl border-none outline-none text-sm font-medium focus:ring-2 ring-resort-gold/20 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Step4Guidelines() {
  return (
    <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
      <h2 className="text-3xl font-serif text-resort-ink">House Rules</h2>
      <HouseRules />
    </div>
  );
}
