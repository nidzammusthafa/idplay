import React, { useState } from "react";
import { FAQ_ITEMS } from "../../constants";

const FaqItemComponent: React.FC<{
  item: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
}> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-5 px-6 focus:outline-none"
      >
        <span className="text-lg font-medium text-[#212529]">
          {item.question}
        </span>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <svg
            className="w-6 h-6 text-[#ec6210]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div
          className={`p-6 pt-0 text-gray-600 ${
            isOpen ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 fade-in-section">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#212529]">
            Pertanyaan Umum
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Menemukan jawaban yang Anda cari.
          </p>
        </div>
        <div
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden fade-in-section"
          style={{ "--delay": "200ms" } as React.CSSProperties}
        >
          {FAQ_ITEMS.map((item, index) => (
            <FaqItemComponent
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
