import React from "react";
import { INSTALLATION_STEPS } from "../../constants";

const InstallationProcess = () => {
  return (
    <section id="proses-instalasi" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 fade-in-section">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#212529]">
            Proses Instalasi Mudah & Cepat
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Hanya 4 langkah mudah untuk menikmati internet super cepat dari
            IdPlay.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start">
          {INSTALLATION_STEPS.map((step, index) => (
            <React.Fragment key={index}>
              <div
                className="flex items-start md:flex-col md:items-center text-center w-full md:w-1/4 fade-in-section p-2"
                style={{ "--delay": `${index * 150}ms` } as React.CSSProperties}
              >
                <div className="relative mb-4 flex-shrink-0">
                  <div className="flex items-center justify-center h-24 w-24 bg-white border-4 border-[#0da750] rounded-full text-[#0da750] shadow-lg">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 bg-[#ec6210] text-white font-bold text-lg h-9 w-9 flex items-center justify-center rounded-full border-4 border-white">
                    {index + 1}
                  </span>
                </div>
                <div className="md:mt-4 text-left md:text-center ml-6 md:ml-0">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                  <p className="text-xs font-semibold text-gray-500 uppercase mt-3 tracking-wider">
                    {step.timeline}
                  </p>
                </div>
              </div>

              {index < INSTALLATION_STEPS.length - 1 && (
                <div
                  className="hidden md:block h-1 w-full bg-gray-200 flex-1 self-center"
                  style={{ marginTop: "-6rem" }}
                ></div>
              )}
              {index < INSTALLATION_STEPS.length - 1 && (
                <div className="md:hidden w-1 h-12 bg-gray-200 ml-12 my-2 self-start"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstallationProcess;
