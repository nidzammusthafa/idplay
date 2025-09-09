
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#212529] text-gray-400 py-6">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} IdPlay. All Rights Reserved.</p>
        <p className="text-xs text-gray-500 mt-2">
          Developed by{" "}
          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Your Name
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
