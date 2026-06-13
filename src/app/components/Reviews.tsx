import { useState } from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const initialReviews = [
  {
    id: 1,
    name: 'Sarah Chen',
    rating: 5,
    review: 'Beautiful experience. Loved the storytelling.',
  },
  {
    id: 2,
    name: 'Marcus Rivera',
    rating: 5,
    review: 'The animations are incredibly smooth and the metaphor is powerful.',
  },
  {
    id: 3,
    name: 'Aisha Patel',
    rating: 5,
    review: 'This is art meets technology. Absolutely stunning work.',
  },
];

export function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 5,
  });
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.review.trim()) {
      setReviews([
        {
          id: reviews.length + 1,
          ...formData,
        },
        ...reviews,
      ]);
      setFormData({ name: '', review: '', rating: 5 });
    }
  };

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center py-20 px-4">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Leave Your Mark
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Review Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-sm uppercase tracking-wider text-[#C9A66B]">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-[#C9A66B]/30 rounded-lg text-[#F5F1E8] placeholder:text-[#F5F1E8]/40 focus:outline-none focus:border-[#C9A66B] transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm uppercase tracking-wider text-[#C9A66B]">
                  Review
                </label>
                <textarea
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-[#C9A66B]/30 rounded-lg text-[#F5F1E8] placeholder:text-[#F5F1E8]/40 focus:outline-none focus:border-[#C9A66B] transition-colors resize-none"
                  placeholder="Share your thoughts..."
                />
              </div>

              <div>
                <label className="block mb-3 text-sm uppercase tracking-wider text-[#C9A66B]">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= formData.rating
                            ? 'fill-[#C9A66B] text-[#C9A66B]'
                            : 'text-[#F5F1E8]/30'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#C9A66B] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#d4b47a] transition-colors"
              >
                Submit Review
              </button>
            </form>
          </motion.div>

          {/* Review Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#C9A66B]/20 to-transparent rounded-3xl blur-2xl" />

              {/* Review Card */}
              <div className="relative min-h-[300px] p-8 bg-gradient-to-br from-white/5 to-transparent border border-[#C9A66B]/30 rounded-3xl backdrop-blur-lg">
                <motion.div
                  key={currentReviewIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(reviews[currentReviewIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#C9A66B] text-[#C9A66B]" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-xl text-[#F5F1E8]/90 leading-relaxed italic">
                    "{reviews[currentReviewIndex].review}"
                  </p>

                  {/* Author */}
                  <p className="text-[#C9A66B] font-medium">
                    — {reviews[currentReviewIndex].name}
                  </p>
                </motion.div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={prevReview}
                    className="px-4 py-2 bg-white/5 border border-[#C9A66B]/30 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    ←
                  </button>

                  <div className="flex gap-2">
                    {reviews.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentReviewIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentReviewIndex
                            ? 'w-8 bg-[#C9A66B]'
                            : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextReview}
                    className="px-4 py-2 bg-white/5 border border-[#C9A66B]/30 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
