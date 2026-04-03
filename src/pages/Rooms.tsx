import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Car, Utensils, Sparkles, Wifi, ConciergeBell, 
  Trees, Wind, Waves, CreditCard, Gamepad2,
  Users, BedDouble, Maximize2, X, ChevronLeft, ChevronRight,
  ArrowRight
} from 'lucide-react';
import { FadeUp, StaggerContainer } from '@/src/components/ui/MotionWrappers';
import { cn } from '@/src/lib/utils';
import { useBooking } from '../context/BookingContext';
import kingImg from '@/src/components/images/king2_11zon.png';
import royalImg from '@/src/components/images/royal1.png';
import preImg from '@/src/components/images/pre1_11zon.png';
import tentsImg from '@/src/components/images/tents1.png';
import villaImg from '@/src/components/images/yama3_11zon.png';

const facilities = [
  { icon: Car, label: "Private Parking" },
  { icon: Utensils, label: "Room Service" },
  { icon: Sparkles, label: "Housekeeping" },
  { icon: Wifi, label: "Free WiFi" },
  { icon: ConciergeBell, label: "24x7 Front Desk" },
  { icon: Trees, label: "Outdoor Lawn Area" },
  { icon: Wind, label: "Air Conditioning" },
  { icon: Waves, label: "Swimming Pool" },
  { icon: CreditCard, label: "Accepts Card" },
  { icon: Gamepad2, label: "Game Zone" },
];

const roomsData = [
  {
    id: 'king-room',
    title: "King Room",
    price: "8,500",
    image: kingImg,
    desc: "Spacious and elegantly designed, the King Room offers breathtaking views of the surrounding mountains, premium interiors, and a peaceful atmosphere perfect for relaxation.",
    longDesc: "Our King Room is designed for the modern traveler who appreciates the finer things in life. With a spacious layout and large windows that frame the majestic Igatpuri mountains, this room offers a sanctuary of peace. The interiors feature a blend of natural textures and contemporary luxury, ensuring a stay that is both comfortable and aesthetically pleasing. Enjoy premium linens, a well-appointed bathroom, and a private seating area where you can soak in the tranquility.",
    size: "450 sq.ft",
    guests: "2 Adults",
    bed: "King Size",
    gallery: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200"
    ],
    amenities: ["Mountain View", "Mini Bar", "Smart TV", "Coffee Maker", "Luxury Toiletries"]
  },
  {
    id: 'royal-suite',
    title: "Royal Suite",
    price: "12,500",
    image: royalImg,
    desc: "Spacious and elegantly designed, the Royal Suite offers breathtaking views of the surrounding mountains, premium interiors, and a peaceful atmosphere perfect for relaxation.",
    longDesc: "The Royal Suite is the pinnacle of luxury at Wabi Sabi Resorts. This expansive suite features a separate living area, a master bedroom with a plush king-size bed, and a private balcony that offers panoramic views of the mist-covered peaks. The decor is a curated mix of traditional craftsmanship and modern elegance, creating an atmosphere of refined comfort. Whether you're celebrating a special occasion or simply seeking the best, the Royal Suite provides an unmatched experience of luxury in nature.",
    size: "750 sq.ft",
    guests: "2 Adults",
    bed: "King Size",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1591088398332-8a77d399a8a9?auto=format&fit=crop&q=80&w=1200"
    ],
    amenities: ["Private Balcony", "Separate Living Area", "Jacuzzi", "Butler Service", "Premium Sound System"]
  },
  {
    id: 'premium-suite',
    title: "Premium Suite",
    price: "10,500",
    image: preImg,
    desc: "A perfect blend of modern aesthetics and natural charm. The Premium Suite offers a cozy yet sophisticated retreat with high-end amenities and a serene garden view.",
    longDesc: "Our Premium Suite is designed to provide a seamless connection between the indoors and the lush natural surroundings. Featuring large glass walls and a private terrace, this suite allows you to wake up to the sight of verdant greenery and the sound of birdsong. The interiors are minimalist yet warm, using sustainable materials and soft lighting to create a calming environment. It's the ideal choice for those who want to immerse themselves in nature without sacrificing any modern comforts.",
    size: "600 sq.ft",
    guests: "2 Adults",
    bed: "King Size",
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80&w=1200"
    ],
    amenities: ["Garden View", "Private Terrace", "Rain Shower", "Work Desk", "Plush Bathrobes"]
  },
  {
    id: 'swiss-tent',
    title: "Swiss Tent",
    price: "6,500",
    image: tentsImg,
    desc: "Experience nature up close with our luxury Swiss tents, combining outdoor charm with modern comfort for a unique and memorable stay.",
    longDesc: "For the adventurous soul who still appreciates luxury, our Swiss Tents offer a unique 'glamping' experience. These high-end tents are pitched in prime locations across the property, offering direct access to the natural beauty of Igatpuri. Inside, you'll find a comfortable queen-size bed, elegant furnishings, and a fully equipped private bathroom. The sound of the wind through the canvas and the proximity to the stars at night make this a truly magical way to stay at Wabi Sabi.",
    size: "350 sq.ft",
    guests: "2 Adults",
    bed: "Queen Size",
    gallery: [
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1200"
    ],
    amenities: ["Outdoor Deck", "Portable AC", "Cozy Lighting", "Nature Proximity", "Private En-suite"]
  },
  {
    id: 'yama-villa',
    title: "Yama Villa",
    price: "22,000",
    image: villaImg,
    desc: "The Yama Villa is our most exclusive offering, providing ultimate privacy and luxury for families or groups seeking a private sanctuary.",
    longDesc: "Named after the Sanskrit word for 'mountain peaks', the Yama Villa sits at the highest point of our resort. This two-bedroom villa features a private plunge pool, a large outdoor deck, and a spacious living area with a fireplace. The architecture is inspired by traditional mountain lodges, updated with modern luxury and floor-to-ceiling windows that offer 360-degree views. It's a place where you can truly disconnect from the world and reconnect with those who matter most.",
    size: "1200 sq.ft",
    guests: "4 Adults",
    bed: "2 King Beds",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200"
    ],
    amenities: ["Private Plunge Pool", "Fireplace", "Full Kitchen", "Dedicated Host", "360-degree Views"]
  }
];

const experiences = [
  { title: "Nature Walks", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800" },
  { title: "Infinity Pool", image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800" },
  { title: "Wellness Spa", image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800" },
  { title: "Outdoor Games", image: "https://images.unsplash.com/photo-1530143311094-34d807799e8f?auto=format&fit=crop&q=80&w=800" },
];

export default function Rooms() {
  const [selectedRoom, setSelectedRoom] = useState<typeof roomsData[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { updateBooking } = useBooking();
  const navigate = useNavigate();

  const handleBookNow = (roomTitle: string) => {
    updateBooking({ roomType: roomTitle });
    navigate('/booking');
  };

  const nextImage = () => {
    if (selectedRoom) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedRoom.gallery.length);
    }
  };

  const prevImage = () => {
    if (selectedRoom) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedRoom.gallery.length) % selectedRoom.gallery.length);
    }
  };

  return (
    <main className="bg-resort-bg min-h-screen overflow-hidden">
      {/* 1. HERO BANNER */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1920" 
            alt="Luxury Room View"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-resort-ink/50" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h1 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-8xl font-serif text-white mb-6"
          >
            Our Rooms & Stays
          </motion.h1>
          <motion.p 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg md:text-xl text-white/80 font-light leading-relaxed"
          >
            Experience comfort, elegance, and nature in every stay. Choose from a range of thoughtfully designed rooms, suites, and villas.
          </motion.p>
        </div>
      </section>

      {/* 2. FACILITIES / AMENITIES SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="text-center mb-16">
            <p className="text-resort-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">World Class</p>
            <h2 className="text-4xl md:text-6xl font-serif text-resort-ink">Resort Facilities</h2>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-y-12 gap-x-8">
            {facilities.map((facility, i) => (
              <motion.div
                key={i}
                variants={{
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 }
                }}
                className="flex flex-col items-center text-center group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 rounded-full bg-resort-bg flex items-center justify-center mb-4 transition-colors group-hover:bg-resort-gold/10"
                >
                  <facility.icon className="w-8 h-8 text-resort-gold transition-colors group-hover:text-resort-gold" />
                </motion.div>
                <span className="text-xs uppercase tracking-widest font-bold text-gray-500 group-hover:text-resort-ink transition-colors">
                  {facility.label}
                </span>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 3. ROOMS LISTING SECTION */}
      <section className="py-24 bg-resort-bg">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="mb-16">
            <p className="text-resort-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">Accommodations</p>
            <h2 className="text-4xl md:text-6xl font-serif text-resort-ink">Choose Your Sanctuary</h2>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roomsData.map((room, i) => (
              <motion.div
                key={room.id}
                variants={{
                  initial: { opacity: 0, y: 40 },
                  animate: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer"
                onClick={() => {
                  setSelectedRoom(room);
                  setCurrentImageIndex(0);
                }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    src={room.image} 
                    alt={room.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-resort-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-md text-resort-ink px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-serif text-resort-ink mb-4 group-hover:text-resort-gold transition-colors">
                    {room.title}
                  </h3>
                  
                  {/* Icons Row */}
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-widest">{room.guests}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <BedDouble className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-widest">{room.bed}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Maximize2 className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-widest">{room.size}</span>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm font-light leading-relaxed mb-8 line-clamp-3">
                    {room.desc}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <p className="text-resort-ink font-bold">
                      ₹{room.price} <span className="text-[10px] font-normal text-gray-400 uppercase tracking-widest">/ Night</span>
                    </p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookNow(room.title);
                      }}
                      className="text-xs uppercase tracking-widest font-bold text-resort-gold hover:text-resort-ink transition-colors flex items-center space-x-2"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 6. EXPERIENCE HIGHLIGHT SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <FadeUp>
              <p className="text-resort-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">Beyond Luxury</p>
              <h2 className="text-4xl md:text-6xl font-serif text-resort-ink mb-6">More than just a stay</h2>
              <p className="text-gray-500 font-light leading-relaxed text-lg">
                Enjoy access to curated experiences including nature walks, swimming pool, games, and wellness activities designed to elevate your stay.
              </p>
            </FadeUp>
            <div className="flex justify-end">
              <Link to="/gallery" className="text-xs uppercase tracking-[0.3em] font-bold border-b border-resort-ink/20 pb-2 hover:border-resort-gold transition-colors">
                View All Experiences
              </Link>
            </div>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={{
                  initial: { opacity: 0, scale: 0.95 },
                  animate: { opacity: 1, scale: 1 }
                }}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img 
                  src={exp.image} 
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-resort-ink/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h4 className="text-white text-xl font-serif tracking-widest uppercase">{exp.title}</h4>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 7. CALL TO ACTION SECTION */}
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
              Ready to experience <br /> <span className="italic text-resort-gold">luxury in nature?</span>
            </h2>
            <button 
              onClick={() => navigate('/rooms')}
              className="bg-resort-gold text-white px-12 py-5 rounded-full uppercase tracking-[0.3em] text-xs font-bold hover:bg-white hover:text-resort-ink transition-all duration-500 shadow-2xl"
            >
              Book Your Stay
            </button>
          </FadeUp>
        </div>
      </section>

      {/* 5. ROOM DETAILS MODAL */}
      <AnimatePresence>
        {selectedRoom && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-resort-ink/90 backdrop-blur-sm"
              onClick={() => setSelectedRoom(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
            >
              <button 
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-resort-ink hover:bg-resort-gold hover:text-white transition-all duration-300 shadow-lg"
                onClick={() => setSelectedRoom(null)}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Gallery Slider */}
              <div className="lg:w-1/2 relative h-64 lg:h-auto bg-gray-100">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    src={selectedRoom.gallery[currentImageIndex]}
                    alt={`${selectedRoom.title} Gallery ${currentImageIndex}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-4">
                  <button 
                    onClick={prevImage}
                    className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-resort-ink hover:bg-resort-gold hover:text-white transition-all shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-resort-ink shadow-lg">
                    {currentImageIndex + 1} / {selectedRoom.gallery.length}
                  </div>
                  <button 
                    onClick={nextImage}
                    className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-resort-ink hover:bg-resort-gold hover:text-white transition-all shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Details Content */}
              <div className="lg:w-1/2 p-8 md:p-12 overflow-y-auto">
                <div className="mb-8">
                  <p className="text-resort-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-2">Room Details</p>
                  <h2 className="text-3xl md:text-5xl font-serif text-resort-ink mb-4">{selectedRoom.title}</h2>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-widest">{selectedRoom.guests}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <BedDouble className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-widest">{selectedRoom.bed}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Maximize2 className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-widest">{selectedRoom.size}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  <p className="text-gray-500 font-light leading-relaxed">
                    {selectedRoom.longDesc}
                  </p>
                  
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-resort-ink mb-4">Room Amenities</h4>
                    <div className="grid grid-cols-2 gap-y-3">
                      {selectedRoom.amenities.map((amenity, i) => (
                        <div key={i} className="flex items-center space-x-3 text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-resort-gold" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between space-y-6 sm:space-y-0">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Starting from</p>
                    <p className="text-2xl font-bold text-resort-ink">₹{selectedRoom.price} <span className="text-xs font-normal text-gray-400">/ Night</span></p>
                  </div>
                  <button 
                    onClick={() => handleBookNow(selectedRoom.title)}
                    className="w-full sm:w-auto bg-resort-ink text-white px-10 py-4 rounded-full uppercase tracking-[0.2em] text-xs font-bold hover:bg-resort-gold transition-all duration-500 shadow-xl"
                  >
                    Book This Room
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

