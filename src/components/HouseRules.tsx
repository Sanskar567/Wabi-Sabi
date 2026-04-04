import React from 'react';
import { ShieldCheck, Clock, Users, CreditCard, Ban, Info } from 'lucide-react';

export const houseRulesData = [
  {
    title: "Check-in & Check-out",
    icon: Clock,
    items: [
      "Check-in: From 2:00 PM to 6:00 PM",
      "Check-out: From 10:30 AM to 11:00 AM",
      "Wabi Sabi Resort, Igatpuri takes special requests – add in the next step!"
    ]
  },
  {
    title: "Cancellation & Prepayment",
    icon: Info,
    items: [
      "Cancellation and prepayment policies vary according to accommodation type.",
      "Check what conditions apply to each option when making your selection."
    ]
  },
  {
    title: "Children & Extra Beds",
    icon: Users,
    items: [
      "Children of all ages are welcome.",
      "Children 18 and above will be charged as adults at this property.",
      "To see correct prices and occupancy info, add the number and ages of children in your group to your search.",
      "Extra bed upon request (18+ years): ₹ 1,500 per person, per night.",
      "Prices for extra beds aren't included in the total price. They'll have to be paid for separately during your stay.",
      "There are no cribs available at this property.",
      "All extra beds are subject to availability."
    ]
  },
  {
    title: "Other Policies",
    icon: Ban,
    items: [
      "Age restriction: The minimum age for check-in is 18.",
      "Pets: Pets are not allowed.",
      "Payments: Booking.com takes your payment on behalf of the hotel for this reservation.",
      "Extras: Pay for any extras during your stay using American Express, Visa, Mastercard and Maestro."
    ]
  }
];

export default function HouseRules() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {houseRulesData.map((section, i) => (
          <div key={i} className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-resort-gold/10 flex items-center justify-center">
                <section.icon className="w-4 h-4 text-resort-gold" />
              </div>
              <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-resort-ink">
                {section.title}
              </h3>
            </div>
            <div className="space-y-3 pl-11">
              {section.items.map((item, j) => (
                <div key={j} className="flex items-start space-x-3">
                  <div className="w-1 h-1 rounded-full bg-resort-gold shrink-0 mt-2" />
                  <p className="text-sm text-resort-ink/70 leading-relaxed font-light">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-8 bg-resort-ink text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          <div className="w-14 h-14 bg-resort-gold rounded-full flex items-center justify-center shrink-0">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-resort-gold mb-1">Secure Booking</p>
            <p className="text-xs text-white/60 leading-relaxed">Your reservation is handled securely. Payment is taken on behalf of the hotel.</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 grayscale opacity-50">
          <CreditCard className="w-6 h-6" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Amex / Visa / Mastercard / Maestro</span>
        </div>
      </div>
    </div>
  );
}
