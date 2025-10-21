import React, { useState, useRef, useEffect, useCallback } from "react";
import { PACKAGE_PLANS } from "../../constants";
import { CheckCircleIcon } from "./icons/IconComponents";
import { PackagePlan } from "@/types";

type BillingPeriod = "monthly" | "sixMonths" | "twelveMonths";

const colorMap: { [key: string]: string } = {
  orange: "border-[#ec6210]",
  blue: "border-blue-500",
  purple: "border-purple-500",
  green: "border-[#0da750]",
  yellow: "border-yellow-500",
  red: "border-red-500",
};

const badgeColorMap: { [key: string]: string } = {
  orange: "bg-[#ec6210]",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  green: "bg-[#0da750]",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
};

const PriceCard: React.FC<{
  plan: PackagePlan;
  period: BillingPeriod;
  delay: number;
}> = ({ plan, period, delay }) => {
  const priceInfo = plan.prices[period];
  const isUnavailable = priceInfo.price === "-";
  const borderColor = colorMap[plan.color] || "border-gray-300";
  const badgeColor = badgeColorMap[plan.color] || "bg-gray-500";

  return (
    <div className="w-72 sm:w-80 flex-shrink-0 fade-in-section">
      <div
        className={`relative flex flex-col bg-white rounded-2xl shadow-lg h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-b-8 ${
          plan.badge ? borderColor : "border-gray-200"
        } ${isUnavailable ? "opacity-60 filter grayscale" : ""}`}
      >
        {plan.badge && (
          <div
            className={`absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-white text-sm font-bold px-5 py-1.5 rounded-full shadow-lg z-10 ${badgeColor}`}
          >
            {plan.badge}
          </div>
        )}
        <div className="flex flex-col flex-grow p-6 pt-10">
          <div className="flex-grow">
            <h3 className={`text-2xl font-bold text-center`}>
              {plan.speed} Mbps
            </h3>

            <ul className="text-left text-gray-600 text-sm my-6 space-y-2.5 min-h-[70px]">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircleIcon />
                  <span className="ml-2.5 -mt-px">{feature}</span>
                </li>
              ))}
            </ul>

            {isUnavailable ? (
              <div className="text-center my-6 min-h-[90px] flex flex-col justify-center items-center">
                <p className="font-semibold text-gray-600 px-4">
                  Hanya tersedia untuk langganan bulanan.
                </p>
              </div>
            ) : (
              <div className="text-center my-6 min-h-[90px]">
                <div>
                  <span className="text-3xl sm:text-4xl font-extrabold">
                    Rp {priceInfo.price}
                  </span>
                  <span className="text-gray-500">/bln</span>
                </div>
                {period !== "monthly" && priceInfo.total && (
                  <p className="text-gray-500 text-xs mt-1">
                    Total Rp {priceInfo.total} untuk{" "}
                    {period === "sixMonths" ? "6" : "12"} bulan
                  </p>
                )}
              </div>
            )}

            {period !== "monthly" && !isUnavailable && priceInfo.savings && (
              <div className="text-center bg-green-100 text-green-800 font-semibold p-3 rounded-lg text-sm mb-4">
                <p>
                  Hemat hingga{" "}
                  <span className="font-extrabold text-[#0da750]">
                    Rp {priceInfo.savings}
                  </span>
                </p>
              </div>
            )}
          </div>
          <button
            disabled={isUnavailable}
            className="w-full bg-[#0da750] text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 mt-auto disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100 disabled:hover:bg-gray-400"
          >
            {isUnavailable ? "Tidak Tersedia" : "Pilih Paket"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isScrollable, setIsScrollable] = useState(false);

  const canScrollLeft = isScrollable && currentIndex > 0;
  const canScrollRight =
    isScrollable && currentIndex < PACKAGE_PLANS.length - 1;

  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // 1. Handlers to directly set the index
  const handlePrev = useCallback(() => {
    if (canScrollLeft) {
      isProgrammaticScroll.current = true;
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  }, [canScrollLeft]);

  const handleNext = () => {
    if (canScrollRight) {
      isProgrammaticScroll.current = true;
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    const targetRef = cardRefs.current[currentIndex];

    if (targetRef && container) {
      container.style.scrollSnapType = "none";

      targetRef.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });

      clearTimeout(scrollTimeout.current as NodeJS.Timeout);
      scrollTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
        if (container) {
          // Re-enable scroll-snap for manual interaction.
          container.style.scrollSnapType = "x mandatory";
        }
      }, 1000); // This duration should be longer than the smooth scroll animation.
    }

    return () => {
      clearTimeout(scrollTimeout.current as NodeJS.Timeout);
    };
  }, [currentIndex]);

  const checkScrollability = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      setIsScrollable(container.scrollWidth > container.clientWidth);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollability();
      const resizeObserver = new ResizeObserver(checkScrollability);
      resizeObserver.observe(container);
      return () => resizeObserver.disconnect();
    }
  }, [checkScrollability]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) {
          return;
        }

        let mostVisibleEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (
              !mostVisibleEntry ||
              entry.intersectionRatio > mostVisibleEntry.intersectionRatio
            ) {
              mostVisibleEntry = entry;
            }
          }
        }

        if (mostVisibleEntry && mostVisibleEntry.intersectionRatio >= 0.7) {
          const index = cardRefs.current.findIndex(
            (ref) => ref === mostVisibleEntry.target
          );
          if (index > -1) {
            setCurrentIndex(index);
          }
        }
      },
      {
        root: scrollContainerRef.current,
        threshold: [0.7, 0.8, 0.9, 1.0], // Trigger more often to get better readings
      }
    );

    const currentCardRefs = cardRefs.current;
    currentCardRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentCardRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [billingPeriod]); // Re-observe if billing period changes

  const scrollProgress =
    PACKAGE_PLANS.length > 1
      ? (currentIndex / (PACKAGE_PLANS.length - 1)) * 100
      : 0;

  return (
    <section id="paket" className="py-20 bg-[#E9ECEF] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto fade-in-section">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#212529]">
            Temukan Paket yang Tepat Untukmu
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Harga Flat Setiap Bulan, Tanpa Biaya Tersembunyi, dan 100% True
            Unlimited tanpa FUP (Fair Usage Policy).
          </p>
        </div>
        <div
          className="flex justify-center my-10 fade-in-section"
          style={{ "--delay": `200ms` } as React.CSSProperties}
        >
          <div className="bg-white rounded-xl p-1.5 shadow-md flex space-x-2">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2 text-sm font-bold rounded-lg transition-colors ${
                billingPeriod === "monthly"
                  ? "bg-[#ec6210] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Bulanan
            </button>
            <button
              onClick={() => setBillingPeriod("sixMonths")}
              className={`px-6 py-2 text-sm font-bold rounded-lg transition-colors ${
                billingPeriod === "sixMonths"
                  ? "bg-[#ec6210] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              6 Bulan
            </button>
            <button
              onClick={() => setBillingPeriod("twelveMonths")}
              className={`px-6 py-2 text-sm font-bold rounded-lg transition-colors ${
                billingPeriod === "twelveMonths"
                  ? "bg-[#ec6210] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              12 Bulan
            </button>
          </div>
        </div>
        <div
          className="relative max-w-5xl mx-auto fade-in-section"
          style={{ "--delay": `400ms` } as React.CSSProperties}
        >
          <button
            onClick={handlePrev}
            aria-label="Previous package"
            className={`absolute top-1/2 -left-4 z-10 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-opacity duration-300 ${
              canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
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
          <div
            ref={scrollContainerRef}
            className="flex items-stretch space-x-8 overflow-x-auto pb-8 -mx-6 px-6 scrollbar-hide pt-10 snap-x snap-mandatory"
          >
            {PACKAGE_PLANS.map((plan, index) => (
              <div
                key={plan.speed}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="snap-center"
              >
                <PriceCard
                  plan={plan}
                  period={billingPeriod}
                  delay={index * 100}
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleNext}
            aria-label="Next package"
            className={`absolute top-1/2 -right-4 z-10 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-opacity duration-300 ${
              canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
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
          {isScrollable && (
            <div className="w-full max-w-xs mx-auto mt-2">
              <div className="h-1.5 w-full bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-1.5 bg-[#0da750] rounded-full"
                  style={{
                    width: `${scrollProgress}%`,
                    boxShadow: "0 0 10px #0da750",
                    transition: "width 0.3s ease-out",
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
