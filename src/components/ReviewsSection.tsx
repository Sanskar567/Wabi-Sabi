import { motion } from 'motion/react';
import { FadeUp, StaggerContainer } from '@/components/ui/MotionWrappers';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Aarav Sharma",
    review: "The most serene experience I've ever had. The mountain views from the Royal Suite are simply breathtaking. Highly recommend for anyone looking to escape the city chaos.",
    rating: 5,
    initial: "A"
  },
  {
    name: "Priya Patel",
    review: "Wabi Sabi is a true sanctuary. The attention to detail in the design and the warmth of the staff made our anniversary celebration unforgettable. We'll definitely be back!",
    rating: 5,
    initial: "P"
  },
  {
    name: "Rohan Gupta",
    review: "The Swiss Tents are a must-try! It's the perfect blend of adventure and luxury. The nature walks and the infinity pool were the highlights of our stay.",
    rating: 5,
    initial: "R"
  }
];

export default function ReviewsSection() {
  return (
    <section className="py-24 bg-resort-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeUp>
            <p className="text-resort-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-6xl font-serif mb-6">Guest Stories</h2>
            <div className="w-24 h-1 bg-resort-gold mx-auto" />
          </FadeUp>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              variants={{
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 }
              }}
              className="bg-white p-12 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 relative group"
            >
              <div className="absolute -top-6 left-12 w-12 h-12 bg-resort-ink rounded-full flex items-center justify-center text-white shadow-lg group-hover:bg-resort-gold transition-colors duration-500">
                <Quote className="w-5 h-5" />
              </div>

              <div className="flex space-x-1 mb-8">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-resort-gold text-resort-gold" />
                ))}
              </div>

              <p className="text-gray-500 font-light leading-relaxed mb-10 italic">
                "{review.review}"
              </p>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-resort-bg rounded-full flex items-center justify-center text-resort-ink font-serif font-bold">
                  {review.initial}
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest">{review.name}</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Verified Guest</p>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
