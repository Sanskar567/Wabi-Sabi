import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { FadeUp, StaggerContainer } from '@/components/ui/MotionWrappers';
import { Maximize2, Users, BedDouble, ArrowRight } from 'lucide-react';
import kingImg from '@/assets/images/king2.png';
import royalImg from '@/assets/images/royal1.png';
import preImg from '@/assets/images/pre1.png';
import tentsImg from '@/assets/images/tents1.png';
import villaImg from '@/assets/images/yama3.png';

const rooms = [
  {
    title: "King Room",
    price: "8,500",
    image: kingImg,
    desc: "Spacious and elegantly designed, the King Room offers breathtaking views of the surrounding mountains, premium interiors, and a peaceful atmosphere perfect for relaxation.",
    size: "450 sq.ft",
    guests: "2 Adults",
    bed: "King Size"
  },
  {
    title: "Royal Suite",
    price: "12,500",
    image: royalImg,
    desc: "The Royal Suite is a masterpiece of luxury, featuring a private balcony, a separate living area, and panoramic views of the Igatpuri mist. Designed for those who seek the extraordinary.",
    size: "750 sq.ft",
    guests: "3 Adults",
    bed: "King Size + Sofa Bed"
  },
  {
    title: "Premium Suite",
    price: "10,500",
    image: preImg,
    desc: "A perfect blend of modern aesthetics and natural charm. The Premium Suite offers a cozy yet sophisticated retreat with high-end amenities and a serene garden view.",
    size: "600 sq.ft",
    guests: "2 Adults",
    bed: "King Size"
  },
  {
    title: "Swiss Tents",
    price: "6,500",
    image: tentsImg,
    desc: "Reconnect with nature in our luxury Swiss Tents. Experience the thrill of camping without compromising on comfort, featuring private decks and mountain-facing views.",
    size: "350 sq.ft",
    guests: "2 Adults",
    bed: "Queen Size"
  },
  {
    title: "Luxury Villa",
    price: "25,000",
    image: villaImg,
    desc: "The ultimate private sanctuary. Our Luxury Villa features a private plunge pool, three bedrooms, and a dedicated butler service, all nestled within a lush private garden.",
    size: "2500 sq.ft",
    guests: "6 Adults",
    bed: "3 King Size"
  }
];

export default function RoomsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
          <FadeUp className="max-w-2xl">
            <p className="text-resort-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">Accommodations</p>
            <h2 className="text-4xl md:text-6xl font-serif mb-6">Luxury Retreats</h2>
            <p className="text-gray-500 font-light leading-relaxed">
              Every room at Wabi Sabi is a testament to the beauty of imperfection and the tranquility of the natural world. 
              Find your perfect sanctuary among our curated selection of suites and villas.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <button className="text-xs uppercase tracking-[0.3em] font-bold border-b border-resort-ink/20 pb-2 hover:border-resort-gold transition-colors">
              View All Rooms
            </button>
          </FadeUp>
        </div>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {rooms.map((room, i) => (
            <motion.div
              key={i}
              variants={{
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 }
              }}
              className="group flex flex-col md:flex-row bg-resort-bg rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image */}
              <div className="md:w-2/5 h-64 md:h-auto overflow-hidden relative">
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  src={room.image} 
                  alt={room.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
                  <p className="text-xs font-bold text-resort-ink">₹{room.price} <span className="text-[10px] font-normal text-gray-400">/ Night</span></p>
                </div>
              </div>

              {/* Content */}
              <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif mb-4 group-hover:text-resort-gold transition-colors">{room.title}</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">
                    {room.desc}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <Maximize2 className="w-4 h-4 text-resort-gold" />
                      <span className="text-[10px] uppercase tracking-widest text-gray-400">{room.size}</span>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-2">
                      <Users className="w-4 h-4 text-resort-gold" />
                      <span className="text-[10px] uppercase tracking-widest text-gray-400">{room.guests}</span>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-2">
                      <BedDouble className="w-4 h-4 text-resort-gold" />
                      <span className="text-[10px] uppercase tracking-widest text-gray-400">{room.bed}</span>
                    </div>
                  </div>
                </div>

                <Link 
                  to="/rooms"
                  className="flex items-center space-x-4 text-xs uppercase tracking-[0.2em] font-bold text-resort-ink group/btn"
                >
                  <span>Explore Room</span>
                  <div className="w-8 h-[1px] bg-resort-ink group-hover/btn:w-12 transition-all duration-500" />
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-2 transition-transform duration-500" />
                </Link>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
