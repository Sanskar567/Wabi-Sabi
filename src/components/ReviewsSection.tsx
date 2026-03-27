import { motion } from 'motion/react';
import { FadeUp, StaggerContainer } from './ui/MotionWrappers';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Prabhavi G",
    text: "The experience was truly magical. The staff was incredibly attentive and the views of Igatpuri are breathtaking.",
    rating: 5
  },
  {
    name: "Tina T",
    text: "Perfect getaway from the city. The Swiss Tents are a must-try for anyone looking for a unique stay.",
    rating: 5
  },
  {
    name: "Rahul S",
    text: "Wabi Sabi Resort exceeded all expectations. The food, the pool, and the overall vibe are just perfect.",
    rating: 5
  }
];

export default function ReviewsSection() {
  return (
    <section className="py-24 bg-resort-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeUp>
            <p className="text-resort-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-6xl font-serif">Guest Experiences</h2>
          </FadeUp>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              variants={{
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 }
              }}
              className="bg-white p-10 rounded-2xl relative shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-resort-gold/10" />
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-resort-gold fill-resort-gold" />
                ))}
              </div>
              <p className="text-gray-500 italic mb-8 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-resort-gold/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-resort-gold font-bold">{review.name[0]}</span>
                </div>
                <h4 className="font-serif uppercase tracking-widest text-sm">{review.name}</h4>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
