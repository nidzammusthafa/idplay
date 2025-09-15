
import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#paket', label: 'Paket' },
    { href: '#layanan', label: 'Layanan' },
    { href: '#proses-instalasi', label: 'Proses Instalasi' },
    { href: '#faq', label: 'FAQ' },
    { href: '#kontak', label: 'Kontak' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-extrabold text-[#ec6210]">
          IdPlay
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-[#212529] font-medium hover:text-[#ec6210] transition-colors duration-300">
              {link.label}
            </a>
          ))}
        </nav>
        <Link href="/cek-jangkauan" className="hidden md:inline-block bg-[#ec6210] text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
          Cek Jangkauan Area
        </Link>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#212529] focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4">
          <nav className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-[#212529] font-medium hover:text-[#ec6210] transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <Link href="/cek-jangkauan" className="bg-[#ec6210] text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-300" onClick={() => setIsMenuOpen(false)}>
              Cek Jangkauan Area
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;