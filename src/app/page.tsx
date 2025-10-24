'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromptCard from '@/components/PromptCard';
import { prompts } from '@/data';

export default function Home() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Header />
      
      {/* Hero Section - Minimalist Modern */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16 bg-white relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
        
        <div className="container mx-auto max-w-5xl relative">
          {/* Hero Content */}
          <div className="max-w-3xl mx-auto text-center relative z-20">
            {/* Small label with iOS liquid glass effect */}
            <div className="inline-flex items-center gap-1.5 mb-6 px-3 py-1.5 glass-badge glass-shimmer text-gray-800 rounded-full text-xs font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="w-1.5 h-1.5 bg-gray-800 rounded-full animate-pulse relative z-10"></span>
              <span className="relative z-10">AI Art Prompts Library</span>
            </div>
            
            {/* Main Heading - Editorial with text-outline layer */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[0.95] tracking-tight">
              <div className="relative">
                {/* Outline layer behind */}
                <span className="absolute inset-0 text-outline select-none pointer-events-none" aria-hidden="true">
                  Discover the
                  <br />
                  prompts behind
                  <br />
                  stunning AI art
                </span>
                {/* Main text layer */}
                <span className="relative">
                  Discover the
                  <br />
                  <span className="bg-gradient-to-r from-black via-gray-600 to-black bg-clip-text text-transparent">prompts behind</span>
                  <br />
                  stunning AI art
                </span>
              </div>
            </h1>
            
            {/* Subheading - Clean and minimal */}
            <p className="text-base md:text-lg text-gray-600 mb-8 max-w-xl mx-auto font-light leading-relaxed drop-shadow-sm">
              Browse thousands of curated AI prompts. Copy, modify, and create your own masterpieces.
            </p>
            
            {/* CTA Buttons - Modern minimal style */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button className="group relative px-6 py-3 bg-black text-white rounded-full text-sm font-medium overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                <span className="relative z-10">Browse Gallery</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button className="px-6 py-3 bg-transparent text-black border-2 border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
                Learn More
              </button>
            </div>
            
            {/* Stats - Minimal */}
            <div className="mt-14 grid grid-cols-3 gap-6 max-w-xl mx-auto">
              <div className="text-center p-4 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                <div className="text-2xl font-bold mb-1">10K+</div>
                <div className="text-xs text-gray-500 font-light">Prompts</div>
              </div>
              <div className="text-center border-x border-gray-200 p-4 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                <div className="text-2xl font-bold mb-1">100K+</div>
                <div className="text-xs text-gray-500 font-light">Creators</div>
              </div>
              <div className="text-center p-4 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                <div className="text-2xl font-bold mb-1">5</div>
                <div className="text-xs text-gray-500 font-light">AI Models</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section - Infinite Scrolling Cards */}
      <section className="py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 max-w-7xl mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
              Explore Categories
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Browse through different styles and themes
            </p>
          </div>
          
          <div className="flex gap-6 overflow-visible relative py-8">
            <div className="flex gap-6 animate-scroll">
              {/* First set */}
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="flex-shrink-0 w-64 h-80 rounded-3xl overflow-hidden shadow-lg category-card relative cursor-pointer hover:shadow-2xl">
                  <Image
                    src={`/images/${num}.webp`}
                    alt={`Category ${num}`}
                    width={256}
                    height={320}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
              ))}
              {/* Second set for seamless loop */}
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={`dup1-${num}`} className="flex-shrink-0 w-64 h-80 rounded-3xl overflow-hidden shadow-lg category-card relative cursor-pointer hover:shadow-2xl">
                  <Image
                    src={`/images/${num}.webp`}
                    alt={`Category ${num}`}
                    width={256}
                    height={320}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
              ))}
              {/* Third set for extra smoothness */}
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={`dup2-${num}`} className="flex-shrink-0 w-64 h-80 rounded-3xl overflow-hidden shadow-lg category-card relative cursor-pointer hover:shadow-2xl">
                  <Image
                    src={`/images/${num}.webp`}
                    alt={`Category ${num}`}
                    width={256}
                    height={320}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
              Trending Prompts
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Discover the most popular prompts from our community
            </p>
          </div>
          
          {/* Limited to 2 rows - showing 15 cards to fill 5 columns */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-5 2xl:columns-6 gap-6 space-y-6 mb-12">
            {[...prompts, ...prompts, ...prompts].slice(0, 15).map((prompt, index) => (
              <div
                key={`${prompt.id}-${index}`}
                className="break-inside-avoid animate-fadeInUp"
                style={{
                  animationDelay: `${index * 30}ms`,
                  animationFillMode: 'both'
                }}
              >
                <PromptCard {...prompt} />
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center">
            <Link href="/gallery">
              <button className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all hover:shadow-lg hover:scale-105 transform duration-200">
                View More Prompts
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

