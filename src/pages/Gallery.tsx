import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2 } from 'lucide-react';
import { 
  GridBody,
  DraggableContainer,
  GridItem, 
} from "@/components/ui/infinite-drag-scroll";

const galleryImages = [
  { 
    id: 1, 
    url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200", 
    title: "Royal Suite", 
    category: "Accommodations"
  },
  { 
    id: 2, 
    url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=1200", 
    title: "Infinity Pool", 
    category: "Wellness"
  },
  { 
    id: 3, 
    url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200", 
    title: "Gourmet Dining", 
    category: "Cuisine"
  },
  { 
    id: 4, 
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200", 
    title: "Zen Garden", 
    category: "Nature"
  },
  { 
    id: 5, 
    url: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=1200", 
    title: "Mountain View", 
    category: "Landscape"
  },
  { 
    id: 6, 
    url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200", 
    title: "Grand Ballroom", 
    category: "Events"
  },
  { 
    id: 7, 
    url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1200", 
    title: "Private Terrace", 
    category: "Luxury"
  },
  { 
    id: 8, 
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200", 
    title: "Sunset Lounge", 
    category: "Relaxation"
  },
  { 
    id: 9, 
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1200", 
    title: "Main Entrance", 
    category: "Resort"
  },
  { 
    id: 10, 
    url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200", 
    title: "Spa Sanctuary", 
    category: "Wellness"
  },
  { 
    id: 11, 
    url: "https://images.unsplash.com/photo-1515362778563-6a8d0e44bc0b?auto=format&fit=crop&q=80&w=1200", 
    title: "Poolside Bar", 
    category: "Dining"
  },
  { 
    id: 12, 
    url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200", 
    title: "Forest Trail", 
    category: "Nature"
  }
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#0A1A14]">
      {/* Textured Background Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
      
      {/* Header Overlay */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <p className="text-resort-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Visual Narrative</p>
          <h2 className="text-4xl md:text-6xl font-serif text-white/90">The Gallery</h2>
          <p className="text-white/30 text-xs mt-4 tracking-widest uppercase">Drag to explore our sanctuary</p>
        </motion.div>
      </div>

      {/* Draggable Container */}
      <DraggableContainer variant="luxury" className="bg-transparent">
        <GridBody>
          {galleryImages.map((img) => (
            <GridItem
              key={img.id}
              className="relative h-64 w-48 md:h-[500px] md:w-[400px] group"
            >
              <div 
                className="relative w-full h-full"
                onClick={() => setSelectedImage(img.url)}
              >
                {/* Image */}
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Soft Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
                
                {/* Hover Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                  <p className="text-resort-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-2">{img.category}</p>
                  <h3 className="text-white text-xl md:text-3xl font-serif mb-4 md:mb-6">{img.title}</h3>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 self-end">
                    <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
              </div>
            </GridItem>
          ))}
        </GridBody>
      </DraggableContainer>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-[#0A1A14]/98 flex items-center justify-center p-6 md:p-12 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-12 right-12 text-white/40 hover:text-white transition-all duration-500 hover:rotate-90"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-10 h-10" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
              className="relative max-w-6xl w-full h-full flex items-center justify-center"
            >
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-4 opacity-40">
        <div className="w-8 h-[1px] bg-white" />
        <span className="text-[10px] uppercase tracking-[0.5em] text-white font-bold">Explore the Sanctuary</span>
        <div className="w-8 h-[1px] bg-white" />
      </div>
    </main>
  );
}
