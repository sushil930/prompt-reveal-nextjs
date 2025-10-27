'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const categories = [
  {
    id: 1,
    name: 'Fantasy',
    description: 'Magical worlds and mythical creatures',
    image: '/images/1.webp',
    count: 234,
    color: 'from-purple-500 to-pink-500',
    icon: '✨',
    tags: ['Magic', 'Dragons', 'Mystical']
  },
  {
    id: 2,
    name: 'Sci-Fi',
    description: 'Futuristic and technological themes',
    image: '/images/2.webp',
    count: 189,
    color: 'from-blue-500 to-cyan-500',
    icon: '🚀',
    tags: ['Future', 'Tech', 'Space']
  },
  {
    id: 3,
    name: 'Nature',
    description: 'Landscapes and natural beauty',
    image: '/images/3.webp',
    count: 312,
    color: 'from-green-500 to-emerald-500',
    icon: '🌿',
    tags: ['Forest', 'Mountains', 'Ocean']
  },
  {
    id: 4,
    name: 'Abstract',
    description: 'Creative and artistic expressions',
    image: '/images/4.webp',
    count: 156,
    color: 'from-orange-500 to-red-500',
    icon: '🎨',
    tags: ['Art', 'Colors', 'Patterns']
  },
  {
    id: 5,
    name: 'Portrait',
    description: 'Characters and people',
    image: '/images/5.webp',
    count: 278,
    color: 'from-pink-500 to-rose-500',
    icon: '👤',
    tags: ['People', 'Faces', 'Characters']
  },
  {
    id: 6,
    name: 'Architecture',
    description: 'Buildings and structures',
    image: '/images/6.webp',
    count: 145,
    color: 'from-gray-500 to-slate-500',
    icon: '🏛️',
    tags: ['Buildings', 'Cities', 'Design']
  }
];

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8 group">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="font-medium">Back to Home</span>
            </Link>
            
            {/* Main heading with gradient */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 font-heading">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Explore
              </span>
              <br />
              <span className="text-black">Categories</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              Dive into a world of creativity. Browse through different styles and themes 
              <br className="hidden md:block" />
              to find the perfect prompts for your next masterpiece
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-black mb-1">6</div>
                <div className="text-sm text-gray-500 font-light">Categories</div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="text-center">
                <div className="text-4xl font-bold text-black mb-1">1.2K+</div>
                <div className="text-sm text-gray-500 font-light">Prompts</div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="text-center">
                <div className="text-4xl font-bold text-black mb-1">∞</div>
                <div className="text-sm text-gray-500 font-light">Possibilities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group relative bg-white rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  opacity: 0
                }}
                onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
              >
                {/* Image with parallax effect */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-all duration-1000 group-hover:scale-125 group-hover:rotate-2"
                    unoptimized
                  />
                  
                  {/* Animated Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-50 group-hover:opacity-70 transition-all duration-700`} />
                  
                  {/* Shimmer Effect on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </div>

                  {/* Count Badge */}
                  <div className="absolute top-6 right-6 px-5 py-2.5 bg-white/95 backdrop-blur-xl rounded-full text-sm font-bold text-black shadow-xl transform transition-all duration-500 group-hover:scale-110">
                    {category.count} prompts
                  </div>

                  {/* Selected Indicator with Animation */}
                  {selectedCategory === category.name && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl animate-scaleIn">
                        <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Bottom gradient for text readability */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform transition-all duration-500 group-hover:translate-y-[-8px]">
                  <h3 className="text-3xl font-bold mb-3 drop-shadow-lg">
                    {category.name}
                  </h3>
                  <p className="text-white/90 text-base font-light mb-4 drop-shadow-md">
                    {category.description}
                  </p>
                  
                  {/* Tags with Liquid Glass Effect */}
                  <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {category.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="px-4 py-2 bg-white/10 backdrop-blur-2xl rounded-full text-xs font-semibold border border-white/20 shadow-lg relative overflow-hidden group/tag hover:bg-white/20 hover:scale-105 transition-all duration-300"
                        style={{
                          backdropFilter: 'blur(20px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                          boxShadow: '0 8px 32px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.3)'
                        }}
                      >
                        {/* Shimmer effect inside tag */}
                        <span className="absolute inset-0 opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300">
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/tag:translate-x-[100%] transition-transform duration-700" />
                        </span>
                        <span className="relative z-10">{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Glowing border effect */}
                <div className={`absolute inset-0 rounded-[2rem] ring-2 ring-transparent group-hover:ring-4 group-hover:ring-white/50 transition-all duration-700 pointer-events-none`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
