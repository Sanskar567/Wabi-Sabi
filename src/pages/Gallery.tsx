import { motion } from 'motion/react';
import { FadeUp, StaggerContainer } from '@/src/components/ui/MotionWrappers';

const galleryImages = [
  {
    url: "https://wabisabiresorts.com/wp-content/uploads/2023/04/Wabi-Sabi-Resort-Igatpuri-Hero.jpg",
    title: "Resort Exterior",
    category: "Exterior"
  },
  {
    url: "https://wabisabiresorts.com/wp-content/uploads/2023/04/Luxury-Suite-Wabi-Sabi.jpg",
    title: "Luxury Suite",
    category: "Rooms"
  },
  {
    url: "https://wabisabiresorts.com/wp-content/uploads/2023/04/Swimming-Pool-Wabi-Sabi-Igatpuri.jpg",
    title: "Infinity Pool",
    category: "Amenities"
  },
  {
    url: "https://wabisabiresorts.com/wp-content/uploads/2023/04/Dining-Wabi-Sabi.jpg",
    title: "Dining Area",
    category: "Dining"
  },
  {
    url: "https://wabisabiresorts.com/wp-content/uploads/2023/04/Poolside-Wabi-Sabi.jpg",
    title: "Poolside Seating",
    category: "Amenities"
  },
  {
    url: "https://wabisabiresorts.com/wp-content/uploads/2023/04/Nature-View-Wabi-Sabi.jpg",
    title: "Morning View",
    category: "Exterior"
  },
  {
    url: "https://wabisabiresorts.com/wp-content/uploads/2023/04/Lawn-Area-Wabi-Sabi.jpg",
    title: "Garden Path",
    category: "Exterior"
  },
  {
    url: "https://wabisabiresorts.com/wp-content/uploads/2023/04/Swiss-Tents-Wabi-Sabi.jpg",
    title: "Swiss Tent Interior",
    category: "Rooms"
  },
  {
    url: "https://wabisabiresorts.com/wp-content/uploads/2023/04/Premium-Suite-View.jpg",
    title: "Premium Suite",
    category: "Rooms"
  },
  {
    url: "https://wabisabiresorts.com/wp-content/uploads/2023/04/Games-Room-Wabi-Sabi.jpg",
    title: "Indoor Games",
    category: "Amenities"
  }
];

export default function Gallery() {
  return (
    <div className="pt-32 pb-24 bg-resort-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeUp>
            <p className="text-resort-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">Visual Journey</p>
            <h2 className="text-5xl md:text-7xl font-serif mb-6">Our Gallery</h2>
            <div className="w-24 h-1 bg-resort-gold mx-auto" />
          </FadeUp>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, i) => (
            <motion.div
              key={i}
              variants={{
                initial: { opacity: 0, scale: 0.9, y: 20 },
                animate: { opacity: 1, scale: 1, y: 0 }
              }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer shadow-lg"
            >
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.8 }}
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <p className="text-resort-gold text-xs uppercase tracking-widest mb-2">{image.category}</p>
                <h3 className="text-white text-2xl font-serif">{image.title}</h3>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
