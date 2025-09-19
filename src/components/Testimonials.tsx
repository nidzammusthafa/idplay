import React, { useState, useEffect, useCallback } from "react";
import { TESTIMONIALS } from "../../constants";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
  }, []);

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  return (
    <section id="testimonials" className="py-20 bg-[#E9ECEF]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 fade-in-section">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#212529]">
            Apa Kata Mereka?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Pengalaman nyata dari pelanggan setia kami.
          </p>
        </div>
        <div
          className="relative max-w-3xl mx-auto fade-in-section"
          style={{ "--delay": "200ms" } as React.CSSProperties}
        >
          <div className="overflow-hidden relative h-64">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center h-full">
                  <p className="text-gray-700 italic text-lg">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="mt-6">
                    <p className="font-bold text-lg text-[#212529]">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-[#0da750] font-semibold">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#ec6210]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#ec6210]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
