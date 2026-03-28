import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FadeUp, StaggerContainer } from '@/src/components/ui/MotionWrappers';
import { X, Maximize2 } from 'lucide-react';

const galleryImages = [
  { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200", category: "Resort" },
  { url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=1200", category: "Rooms" },
  { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200", category: "Dining" },
  { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200", category: "Nature" },
  { url: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=1200", category: "Resort" },
  { url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200", category: "Events" },
  { url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1200", category: "Rooms" },
  { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200", category: "Dining" },
  { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1200", category: "Resort" },
  { url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200", category: "Rooms" },
  { url: "https://images.unsplash.com/photo-1515362778563-6a8d0e44bc0b?auto=format&fit=crop&q=80&w=1200", category: "Dining" },
  { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200", category: "Nature" }
];

const categories = ["All", "Resort", "Rooms", "Dining", "Events", "Nature"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <main className="pt-32 pb-24 bg-resort-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeUp>
            <p className="text-resort-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">Visual Journey</p>
            <h2 className="text-4xl md:text-6xl font-serif mb-8">Gallery</h2>
            <div className="w-24 h-1 bg-resort-gold mx-auto mb-12" />
          </FadeUp>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-500 border ${
                    activeCategory === cat 
                      ? "bg-resort-ink text-white border-resort-ink" 
                      : "bg-white text-gray-400 border-gray-100 hover:border-resort-gold hover:text-resort-gold"
                  }`}
                >
                  {cat}
                </button>
              </FadeUp>
            ))}
          </div>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, i) => (
              <motion.div
                layout
                key={img.url}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
                className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer"
                onClick={() => setSelectedImage(img.url)}
              >
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  src={img.url}
                  alt={img.category}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-resort-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <p className="text-white text-[10px] uppercase tracking-widest font-bold bg-resort-gold px-3 py-1 rounded-full">
                    {img.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </StaggerContainer>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-resort-ink/95 flex items-center justify-center p-6 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-12 right-12 text-white/60 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
