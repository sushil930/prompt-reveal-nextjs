'use client';

import { useState } from 'react';
import Image from 'next/image';

type CategoryCard = {
  id: string;
  name: string;
  description: string;
  color: string;
  tags: string[];
  image: string;
  blurDataUrl: string | null;
  count: number;
};

type CategoriesContentProps = {
  categories: CategoryCard[];
};

export default function CategoriesContent({ categories }: CategoriesContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (!categories.length) {
    return (
      <div className="text-center py-24">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">No categories available yet</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Add your first prompt to unlock category statistics. New submissions automatically populate
          their respective category tiles here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {categories.map((category, index) => (
        <button
          type="button"
          key={category.id}
          className="group relative bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-[1.02] focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-500/40"
          style={{ animationDelay: `${index * 100}ms`, animation: 'fadeInUp 0.6s ease-out forwards', opacity: 0 }}
          onClick={() =>
            setSelectedCategory((current) => (current === category.name ? null : category.name))
          }
        >
          <div className="relative h-80 overflow-hidden">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-all duration-1000 group-hover:scale-125 group-hover:rotate-2"
              unoptimized={!category.blurDataUrl}
              {...(category.blurDataUrl ? { placeholder: 'blur', blurDataURL: category.blurDataUrl } : {})}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-50 group-hover:opacity-70 transition-all duration-700`}
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </div>
            <div className="absolute top-6 right-6 px-5 py-2.5 bg-white/95 backdrop-blur-xl rounded-full text-sm font-bold text-black shadow-xl transform transition-all duration-500 group-hover:scale-110">
              {category.count} prompt{category.count === 1 ? '' : 's'}
            </div>
            {selectedCategory === category.name && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl animate-scaleIn">
                  <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform transition-all duration-500 group-hover:translate-y-[-8px]">
            <h3 className="text-3xl font-bold mb-3 drop-shadow-lg">{category.name}</h3>
            <p className="text-white/90 text-base font-light mb-4 drop-shadow-md">{category.description}</p>
            <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              {category.tags.map((tag) => (
                <span
                  key={`${category.id}-${tag}`}
                  className="px-4 py-2 bg-white/10 backdrop-blur-2xl rounded-full text-xs font-semibold border border-white/20 shadow-lg relative overflow-hidden group/tag hover:bg-white/20 hover:scale-105 transition-all duration-300"
                  style={{
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    background:
                      'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                    boxShadow:
                      '0 8px 32px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <span className="absolute inset-0 opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/tag:translate-x-[100%] transition-transform duration-700" />
                  </span>
                  <span className="relative z-10">{tag}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 rounded-[2rem] ring-2 ring-transparent group-hover:ring-4 group-hover:ring-white/50 transition-all duration-700 pointer-events-none" />
        </button>
      ))}
    </div>
  );
}