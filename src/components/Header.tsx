'use client';

import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="container mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          {/* Logo - Minimal */}
          <Link href="/" className="group flex items-center space-x-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-bold text-black tracking-tight">
              PromptReveal
            </span>
          </Link>

          {/* Desktop Navigation - Clean */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-1">
              <li>
                <Link 
                  href="/gallery" 
                  className="text-gray-600 hover:text-black px-4 py-2 rounded-full hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories" 
                  className="text-gray-600 hover:text-black px-4 py-2 rounded-full hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link 
                  href="#about" 
                  className="text-gray-600 hover:text-black px-4 py-2 rounded-full hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
                >
                  About
                </Link>
              </li>
              <li className="ml-4 pl-4 border-l border-gray-200">
                <Link 
                  href="#login" 
                  className="text-gray-600 hover:text-black px-4 py-2 rounded-full hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
                >
                  Log in
                </Link>
              </li>
              <li>
                <button className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-full transition-all duration-200 text-sm font-medium">
                  Get Started
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6 text-black" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col space-y-2 pb-4">
            <Link 
              href="/gallery" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-600 hover:text-black px-4 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
            >
              Gallery
            </Link>
            <Link 
              href="/categories" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-600 hover:text-black px-4 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
            >
              Categories
            </Link>
            <Link 
              href="#about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-600 hover:text-black px-4 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
            >
              About
            </Link>
            <div className="border-t border-gray-100 my-2"></div>
            <Link 
              href="#login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-600 hover:text-black px-4 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
            >
              Log in
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-black hover:bg-gray-800 text-white px-5 py-3 rounded-full transition-all duration-200 text-sm font-medium text-center"
            >
              Get Started
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
