"use client";

import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InstallationProcess from "@/components/InstallationProcess";
import Pricing from "@/components/Pricing";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import PromoToast from "@/components/PromoToast";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(".fade-in-section");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="bg-[#F8F9FA] text-[#212529]">
      <Header />
      <main>
        <Hero />
        <Pricing />
        <Services />
        <InstallationProcess />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <PromoToast />
    </div>
  );
}
