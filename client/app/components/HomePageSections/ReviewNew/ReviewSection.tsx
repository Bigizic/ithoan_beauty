import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import ReviewCard from "./ReviewCard";
import review from "./review.json";

interface Review {
  name: string;
  role?: string;
  review: string;
  rating: number;
  image?: string;
  skinType?: string;
  verified?: boolean;
  date?: string;
}

interface ReviewSectionProps {
  reviews: Review[];
  title?: string;
  subtitle?: string;
}

export default function ReviewSection({
  title = "What Our Customers Say",
  subtitle = "Our customers share how Tohanniees Skincare products brings glow, confidence, care and trust to their daily routine",
}: ReviewSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
    });

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { reviews } = review;

  return (
    <section className="relative mt-[48px] sm:mt-[80px] pd-default py-2 overflow-hidden">
      {/* background layers */}
      <div className="absolute inset-0 opacity-30" />
      <div className="absolute top-20 left-10 w-72 h-72 " />
      <div className="absolute bottom-20 right-10 w-96 h-96 " />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]" />

      <div className="relative w-full flex flex-col justify-center py-[20px]">
        {/* section header */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-center mb-16"
        >
          <h2
            data-aos="fade-up"
            data-aos-delay="200"
            className="font-bold mb-4 p-0"
          >
            <div className="flex justify-center gap-1 relative">
              <Sparkles
                color="#ffc107"
                size={25}
                style={{ position: "absolute", top: "-30px", left: "0" }}
              />
              <span className="font-spectral heading-text font-extrabold bg-gradient-to-r from-gray-900 via-blue-900 to-pink-900 bg-clip-text">
                {title}
              </span>
              <Sparkles
                color="#ffc107"
                size={25}
                style={{ position: "absolute", top: "30px", right: "0" }}
              />
            </div>
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="subHead-text text-center text-gray-600 max-w-2xl mx-auto"
          >
            {subtitle}
          </p>
        </div>

        {/* review grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={200 + index * 100}
            >
              <ReviewCard {...review} />
            </div>
          ))}
        </div>

        {/* optional button section */}
        {/* 
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="text-center mt-16"
        >
          <div className="inline-block group relative">
            <button className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-pink-600 text-white font-semibold rounded-full shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                View All Reviews
                <svg
                  className="w-5 h-5 animate-bounce-x"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
        */}
      </div>
    </section>
  );
}
