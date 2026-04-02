import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Calendar, Users, MapPin, Search, Plus, Minus, Home } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';

interface BookingBarProps {
  startAnimation?: boolean;
}

export default function BookingBar({ startAnimation }: BookingBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const { booking, updateBooking } = useBooking();
  const navigate = useNavigate();
  
  const [checkIn, setCheckIn] = useState<Date | null>(booking.checkIn ? new Date(booking.checkIn) : null);
  const [checkOut, setCheckOut] = useState<Date | null>(booking.checkOut ? new Date(booking.checkOut) : null);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [showRoomPicker, setShowRoomPicker] = useState(false);

  useEffect(() => {
    if (startAnimation) {
      gsap.to(barRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.5
      });
    }
  }, [startAnimation]);

  const handleCheckAvailability = () => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }
    
    updateBooking({
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
    });
    
    navigate('/rooms');
  };

  const updateGuests = (val: number) => {
    const newGuests = Math.max(1, booking.guests + val);
    updateBooking({ guests: newGuests });
  };

  return (
    <div 
      ref={barRef}
      className="relative z-30 mt-12 max-w-6xl mx-auto px-6 opacity-0"
    >
      <div className="bg-white shadow-2xl rounded-xl p-2 md:p-4 flex flex-col md:flex-row items-stretch md:items-center space-y-4 md:space-y-0 md:space-x-2">
        
        {/* Location (Static for now as per requirement) */}
        <div className="flex-1 flex items-center px-4 py-4 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-default rounded-lg">
          <MapPin className="w-5 h-5 text-resort-gold mr-3" />
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Location</p>
            <p className="text-sm font-medium text-resort-ink">{booking.location}</p>
          </div>
        </div>

        {/* Room Type Dropdown */}
        <div className="flex-1 relative">
          <div 
            onClick={() => setShowRoomPicker(!showRoomPicker)}
            className="flex items-center px-4 py-4 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer rounded-lg"
          >
            <Home className="w-5 h-5 text-resort-gold mr-3" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Room Type</p>
              <p className="text-sm font-medium text-resort-ink">{booking.roomType}</p>
            </div>
          </div>
          
          {showRoomPicker && (
            <div className="absolute top-full left-0 w-full bg-white shadow-2xl rounded-xl mt-2 p-4 z-50 border border-gray-100">
              {['King Room', 'Luxury Suite', 'Garden Villa', 'Mountain View Suite'].map((type) => (
                <div 
                  key={type}
                  onClick={() => {
                    updateBooking({ roomType: type });
                    setShowRoomPicker(false);
                  }}
                  className="px-4 py-2 hover:bg-resort-gold/10 rounded-lg cursor-pointer text-sm text-resort-ink transition-colors"
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Check In */}
        <div className="flex-1 flex items-center px-4 py-4 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer rounded-lg relative">
          <Calendar className="w-5 h-5 text-resort-gold mr-3" />
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Check In</p>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={new Date()}
              placeholderText="Select Date"
              className="text-sm font-medium text-resort-ink bg-transparent border-none outline-none w-full cursor-pointer"
            />
          </div>
        </div>

        {/* Check Out */}
        <div className="flex-1 flex items-center px-4 py-4 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer rounded-lg relative">
          <Calendar className="w-5 h-5 text-resort-gold mr-3" />
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Check Out</p>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn || new Date()}
              placeholderText="Select Date"
              className="text-sm font-medium text-resort-ink bg-transparent border-none outline-none w-full cursor-pointer"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="flex-1 relative">
          <div 
            onClick={() => setShowGuestPicker(!showGuestPicker)}
            className="flex items-center px-4 py-4 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer rounded-lg"
          >
            <Users className="w-5 h-5 text-resort-gold mr-3" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Guests</p>
              <p className="text-sm font-medium text-resort-ink">{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</p>
            </div>
          </div>
          
          {showGuestPicker && (
            <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-xl mt-2 p-6 z-50 border border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-resort-ink">Adults / Children</span>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => updateGuests(-1)}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-resort-gold hover:border-resort-gold hover:text-white transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold w-4 text-center">{booking.guests}</span>
                  <button 
                    onClick={() => updateGuests(1)}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-resort-gold hover:border-resort-gold hover:text-white transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setShowGuestPicker(false)}
                className="w-full mt-6 py-2 bg-resort-ink text-white rounded-lg text-xs uppercase tracking-widest font-bold hover:bg-resort-gold transition-colors"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Search Button */}
        <button 
          onClick={handleCheckAvailability}
          className="bg-resort-ink text-white px-8 py-5 rounded-lg flex items-center justify-center space-x-3 hover:bg-resort-gold transition-all duration-500 group"
        >
          <span className="uppercase tracking-[0.2em] text-xs font-semibold whitespace-nowrap">Check Availability</span>
          <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
}
