import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BookingData {
  location: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  userInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
  paymentInfo: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
}

interface BookingContextType {
  booking: BookingData;
  updateBooking: (data: Partial<BookingData>) => void;
  resetBooking: () => void;
}

const initialBooking: BookingData = {
  location: 'Igatpuri',
  roomType: 'King Room',
  checkIn: '',
  checkOut: '',
  guests: 2,
  userInfo: {
    fullName: '',
    email: '',
    phone: '',
  },
  paymentInfo: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  },
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [booking, setBooking] = useState<BookingData>(initialBooking);

  const updateBooking = (data: Partial<BookingData>) => {
    setBooking((prev) => ({ ...prev, ...data }));
  };

  const resetBooking = () => {
    setBooking(initialBooking);
  };

  return (
    <BookingContext.Provider value={{ booking, updateBooking, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
