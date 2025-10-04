import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Star, Quote } from "lucide-react";

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
  link,
}: ReviewCardProps) {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  return (
    <div
      data-aos="fade-up"
      className="group relative"
      style={{ width: '320px' }}
    >
      <div className="relative h-full group-hover:-translate-y-2 transition-transform duration-300 ease-out">
        {/* glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-pink-50/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* main card */}
        <div className="relative bg-white/80 backdrop-blur-xl border border-gray-100/50 rounded-3xl p-8 h-full shadow-lg shadow-gray-200/50 overflow-hidden group-hover:border-blue-200/50 transition-all duration-500">
          {/* gradient circles */}
          <div className="absolute bg-signaturee top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-pink-400/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <div className="absolute bg-signaturee bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-400/10 to-blue-400/10 rounded-full -ml-12 -mb-12 blur-2xl group-hover:scale-150 transition-transform duration-700" />

          <div className="relative z-10">
            {/* avatar + quote */}
            <div className="flex items-start justify-between mb-6">
              <div
                data-aos="zoom-in"
                data-aos-delay="200"
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
              </div>

              <div
                data-aos="fade-left"
                data-aos-delay="300"
                className="relative"
              >
                <Quote className="w-8 h-8 text-other transition-colors duration-300" />
              </div>
            </div>

            {/* rating + user info */}
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="mb-5"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    data-aos="zoom-in"
                    data-aos-delay={500 + i * 100}
                    className="inline-block"
                  >
                    <Star
                      className={`w-5 h-5 ${i < rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-200 text-gray-200"
                        } transition-colors duration-300`}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                {verified && (
                  <span
                    data-aos="zoom-in"
                    data-aos-delay="700"
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-blue-50 to-green-50 border border-green-200/50 rounded-full text-xs font-medium text-green-700"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    verified
                  </span>
                )}
              </div>

              {role && <p className="text-sm text-gray-500 mt-1">{role}</p>}

              {skinType && (
                <div
                  data-aos="fade-right"
                  data-aos-delay="800"
                  className="inline-block mt-2"
                >
                  <span className="text-xs px-3 py-1 border bg-black rounded-full text-white font-medium">
                    {skinType}
                  </span>
                </div>
              )}
            </div>

            {/* review text */}
            <p
              data-aos="fade-up"
              data-aos-delay="900"
              className="text-gray-600 leading-relaxed mb-4 line-clamp-6 text-wrap"
            >
              {review}
            </p>

            {/* link */}
            {link && (
              <p
                data-aos="fade-up"
                data-aos-delay="1000"
                className="text-xs text-gray-400 mt-4"
                style={{ textDecoration: 'underline' }}
              >
                <a target="_blank" href={link} rel="noreferrer">
                  see review on instagram
                </a>
              </p>
            )}
          </div>

          {/* bottom bar on hover only
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left" />
          */}
        </div>
      </div>
    </div>
  );
}
