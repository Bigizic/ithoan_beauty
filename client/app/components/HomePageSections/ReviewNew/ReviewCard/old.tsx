import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ReviewCardProps {
  name: string;
  role?: string;
  review: string;
  rating: number;
  image?: string;
  skinType?: string;
  verified?: boolean;
  link?: string;
}

export default function ReviewCard({
  name,
  role,
  review,
  rating,
  image,
  skinType,
  verified = true,
  link
}: ReviewCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-pink-50/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative bg-white/80 backdrop-blur-xl border border-gray-100/50 rounded-3xl p-8 h-full shadow-lg shadow-gray-200/50 overflow-hidden group-hover:border-blue-200/50 transition-all duration-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-pink-400/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-400/10 to-blue-400/10 rounded-full -ml-12 -mb-12 blur-2xl group-hover:scale-150 transition-transform duration-700" />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isVisible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <div className="relative w-16 h-16 bg-black rounded-[5px] flex items-center justify-center overflow-hidden ring-2 ring-white shadow-xl">
                  {image ? (
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-xl font-semibold">
                      {name.charAt(0)}
                    </span>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative"
              >
                <Quote className="w-8 h-8 text-signaturee transition-colors duration-300" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-5"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        i < rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-gray-200 text-gray-200'
                      } transition-colors duration-300`}
                    />
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                {verified && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-blue-50 to-green-50 border border-green-200/50 rounded-full text-xs font-medium text-green-700"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </motion.span>
                )}
              </div>

              {role && (
                <p className="text-sm text-gray-500 mt-1">{role}</p>
              )}

              {skinType && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="inline-block mt-2"
                >
                  <span className="text-xs px-3 py-1 border bg-black rounded-full text-white font-medium">
                    {skinType}
                  </span>
                </motion.div>
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="text-gray-600 leading-relaxed mb-4 line-clamp-6"
            >
              {review}
            </motion.p>

            {link && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="text-xs text-gray-400 mt-4"
              >
                <a target='_blank' href={link}>see review on instagram</a>
              </motion.p>
            )}
          </div>

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
