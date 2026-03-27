import { motion } from 'motion/react';
import { FadeUp, StaggerContainer } from './ui/MotionWrappers';
import { ArrowRight, Maximize2, Users, BedDouble } from 'lucide-react';

const rooms = [
  {
    id: 1,
    name: "Royal Suite",
    price: "₹8,500",
    image: "https://wabisabiresorts.com/wp-content/uploads/2023/04/Luxury-Suite-Wabi-Sabi.jpg",
    size: "450 sq.ft",
    guests: "2 Adults",
    bed: "King Size"
  },
  {
    id: 2,
    name: "Swiss AC Tent",
    price: "₹6,500",
    image: "https://wabisabiresorts.com/wp-content/uploads/2023/04/Swiss-Tents-Wabi-Sabi.jpg",
    size: "350 sq.ft",
    guests: "2 Adults",
    bed: "Queen Size"
  },
  {
    id: 3,
    name: "Yama Villa",
    price: "₹25,000",
    image: "https://wabisabiresorts.com/wp-content/uploads/2023/04/Yama-Villa-Wabi-Sabi.jpg",
    size: "1200 sq.ft",
    guests: "6 Adults",
    bed: "3 King Size"
  }
];

export default function RoomsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
          <FadeUp>
            <p className="text-resort-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">Our Accommodations</p>
            <h2 className="text-4xl md:text-6xl font-serif">Refined Living Spaces</h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <button className="px-8 py-4 border border-resort-ink/10 rounded-full text-xs uppercase tracking-widest hover:bg-resort-ink hover:text-white transition-all duration-500">
              View All Rooms
            </button>
          </FadeUp>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              variants={{
                initial: { opacity: 0, y: 40 },
                animate: { opacity: 1, y: 0 }
              }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] mb-6">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
                  <p className="text-xs font-bold tracking-widest text-resort-ink">FROM {room.price}</p>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                    <ArrowRight className="text-resort-ink w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-serif group-hover:text-resort-gold transition-colors duration-300">{room.name}</h3>
                <div className="flex items-center space-x-6 text-gray-400">
                  <div className="flex items-center text-[10px] uppercase tracking-widest">
                    <Maximize2 className="w-3 h-3 mr-2" />
                    {room.size}
                  </div>
                  <div className="flex items-center text-[10px] uppercase tracking-widest">
                    <Users className="w-3 h-3 mr-2" />
                    {room.guests}
                  </div>
                  <div className="flex items-center text-[10px] uppercase tracking-widest">
                    <BedDouble className="w-3 h-3 mr-2" />
                    {room.bed}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
