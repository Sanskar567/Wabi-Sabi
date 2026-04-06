import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2 } from 'lucide-react';
import { 
  GridBody,
  DraggableContainer,
  GridItem, 
} from "@/components/ui/infinite-drag-scroll";

import kingImg from '@/assets/images/king2.png';
import poolImg from '@/assets/images/pool-hero.png';
import royalImg from '@/assets/images/royal1.png';
import yamaImg from '@/assets/images/yama3.png';
import tentsImg from '@/assets/images/tents1.png';
import preImg from '@/assets/images/pre1.png';
import deckImg from '@/assets/images/deck.jpeg';
import gardenImg from '@/assets/images/garden.png';
import supImg from '@/assets/images/sup3.png';
import wabiImg from '@/assets/images/Wabi sabi.png';
import editImg from '@/assets/images/edit3.png';
import yamaVillaImg from '@/assets/images/yama-villa-hero.webp';

const galleryImages = [
  { 
    id: 1, 
    url: kingImg, 
    title: "Royal Suite", 
    category: "Accommodations"
  },
  { 
    id: 2, 
    url: poolImg, 
    title: "Infinity Pool", 
    category: "Wellness"
  },
  { 
    id: 3, 
    url: royalImg, 
    title: "Gourmet Dining", 
    category: "Cuisine"
  },
  { 
    id: 4, 
    url: yamaImg, 
    title: "Zen Garden", 
    category: "Nature"
  },
  { 
    id: 5, 
    url: tentsImg, 
    title: "Mountain View", 
    category: "Landscape"
  },
  { 
    id: 6, 
    url: preImg, 
    title: "Grand Ballroom", 
    category: "Events"
  },
  { 
    id: 7, 
    url: deckImg, 
    title: "Private Terrace", 
    category: "Luxury"
  },
  { 
    id: 8, 
    url: gardenImg, 
    title: "Sunset Lounge", 
    category: "Relaxation"
  },
  { 
    id: 9, 
    url: supImg, 
    title: "Main Entrance", 
    category: "Resort"
  },
  { 
    id: 10, 
    url: wabiImg, 
    title: "Spa Sanctuary", 
    category: "Wellness"
  },
  { 
    id: 11, 
    url: editImg, 
    title: "Poolside Bar", 
    category: "Dining"
  },
  { 
    id: 12, 
    url: yamaVillaImg, 
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
