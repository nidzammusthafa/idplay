import React, { useState, useEffect } from "react";
import { HERO_SLIDES } from "../../constants";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section
      id="hero"
      className="relative text-white py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#ec6210] to-[#0da750] animate-gradient-xy"></div>
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="wave-container absolute bottom-0 left-0 w-full h-24 z-0">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="h-24 flex items-center justify-center overflow-hidden mb-4 fade-in-section">
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ease-in-out absolute ${
                index === currentSlide
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-full"
              }`}
              style={{ willChange: "transform, opacity" }}
            >
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                {slide.split(" - ")[0]}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mt-1">
                {slide.split(" - ")[1]}
              </p>
            </div>
          ))}
        </div>

        <div
          className="fade-in-section"
          style={{ "--delay": "200ms" } as React.CSSProperties}
        >
          <h2 className="text-xl md:text-2xl font-light mt-8 max-w-3xl mx-auto">
            Koneksi internet fiber optic premium dengan infrastruktur kelas
            korporat.
          </h2>
        </div>
        <div
          className="fade-in-section"
          style={{ "--delay": "400ms" } as React.CSSProperties}
        >
          <a
            href="#paket"
            className="mt-10 inline-block bg-white text-[#ec6210] font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Lihat Paket Harga
          </a>
        </div>
      </div>
      <style>{`
            @keyframes gradient-xy {
                0%, 100% {
                    background-size: 400% 400%;
                    background-position: 10% 0%;
                }
                50% {
                    background-size: 400% 400%;
                    background-position: 91% 100%;
                }
            }
            .animate-gradient-xy {
                animation: gradient-xy 15s ease infinite;
            }
            .wave-container {
                overflow: hidden;
            }
            .wave {
                background: rgba(255, 255, 255, 0.15);
                border-radius: 1000% 1000% 0 0;
                position: absolute;
                width: 200%;
                height: 100%;
                animation: wave-animation linear infinite;
                bottom: 0;
                left: 0;
            }
            .wave:nth-of-type(2) {
                animation-duration: 12s;
                animation-direction: reverse;
                opacity: 0.6;
                bottom: -5px;
            }
            .wave:nth-of-type(3) {
                animation-duration: 18s;
                opacity: 0.3;
                bottom: -10px;
            }
            @keyframes wave-animation {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-50%);
                }
            }
        `}</style>
    </section>
  );
};

export default Hero;
