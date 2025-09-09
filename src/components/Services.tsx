import React from "react";
import { SERVICES } from "../../constants";

const Services = () => {
  return (
    <section id="layanan" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 fade-in-section">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#212529]">
            Kenapa Memilih IdPlay?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Kami memberikan lebih dari sekadar koneksi internet. Kami memberikan
            keandalan.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 fade-in-section"
              style={{ "--delay": `${index * 150}ms` } as React.CSSProperties}
            >
              <div className="service-icon-bounce flex items-center justify-center h-20 w-20 mx-auto bg-[#ec6210] rounded-2xl text-white shadow-lg">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mt-6 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
