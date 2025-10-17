'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromptCard from '@/components/PromptCard';
import { prompts } from '@/data';

// Initial card positions
const initialCardPositions = [
  { id: 'card-1', x: 48, y: 16, rotation: -10, image: '/images/1.webp', size: { w: 32, h: 40 } },
  { id: 'card-2', x: 128, y: 32, rotation: 0, image: '/images/2.webp', size: { w: 32, h: 40 } },
  { id: 'card-3', x: -128, y: 24, rotation: -20, image: '/images/3.webp', size: { w: 32, h: 40 } },
  { id: 'card-4', x: -64, y: -48, rotation: -10, image: '/images/4.webp', size: { w: 32, h: 40 } },
  { id: 'card-5', x: 80, y: 80, rotation: 30, image: '/images/5.webp', size: { w: 32, h: 40 } },
  { id: 'card-6', x: -80, y: 80, rotation: -30, image: '/images/6.webp', size: { w: 32, h: 40 } },
];

export default function Home() {
  const [cardPositions, setCardPositions] = useState(initialCardPositions);
  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredPrompts = prompts;

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent, cardId: string) => {
    e.preventDefault();
    setDraggedCard(cardId);
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const startX = e.clientX;
    const startY = e.clientY;
    const card = cardPositions.find(c => c.id === cardId);
    if (!card) return;
    
    const startCardX = card.x;
    const startCardY = card.y;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      setCardPositions(prev => 
        prev.map(c => 
          c.id === cardId 
            ? { ...c, x: startCardX + deltaX, y: startCardY + deltaY }
            : c
        )
      );
    };

    const handleMouseUp = () => {
      setDraggedCard(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-8 px-6 bg-[#f5f1e8] text-black h-screen flex items-center relative overflow-hidden">
        <div ref={containerRef} className="container mx-auto relative">
          {/* Draggable Floating Cards */}
          <div className="absolute inset-0 pointer-events-none">
            {cardPositions.map((card) => (
              <div
                key={card.id}
                className={`absolute rounded-xl overflow-hidden shadow-xl transition-all duration-200 pointer-events-auto cursor-move select-none ${
                  draggedCard === card.id ? 'z-50 scale-105' : 'z-30'
                } hidden md:block`}
                style={{
                  width: `${card.size.w * 4}px`,
                  height: `${card.size.h * 4}px`,
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${card.x}px), calc(-50% + ${card.y}px))`,
                }}
                onMouseDown={(e) => handleMouseDown(e, card.id)}
              >
                <Image 
                  src={card.image} 
                  alt={`Draggable card ${card.id}`} 
                  fill 
                  className="object-cover pointer-events-none" 
                  unoptimized 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200" />
              </div>
            ))}
          </div>
          
          <div className="max-w-4xl mx-auto text-center relative z-20 pointer-events-none">
            {/* Badge */}
            <div className="inline-block mb-6 px-6 py-3 bg-[#f4d9a6] rounded-full pointer-events-auto">
              <span className="text-gray-800 text-sm font-medium">Join over 100,000 happy creators</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Discover Amazing
              <br />
              <span className="italic font-serif">AI-Generated</span> Art
            </h1>
            
            {/* Subheading */}
            <p className="text-base md:text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Reveal the prompts behind stunning AI art. Hover to see secrets, modify them, and create your own studio-quality masterpieces.
            </p>
            
            {/* CTA Button */}
            <button className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-8 py-3 rounded-full text-base font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 pointer-events-auto">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-[#f4d9a6] rounded-full">
              <span className="text-gray-800 text-sm font-medium">Discover Categories</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Explore <span className="italic font-serif">Creative</span> Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From stunning fashion shoots to product photography, discover prompts across every creative category
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-3xl bg-[#f5f1e8] border-2 border-transparent hover:border-[#ff6b6b] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-[#ff6b6b] to-[#ff5252] rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">👗</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fashion</h3>
              <p className="text-gray-600 leading-relaxed">Studio-quality fashion photography with professional lighting and creative composition techniques</p>
            </div>
            
            <div className="group text-center p-8 rounded-3xl bg-[#f5f1e8] border-2 border-transparent hover:border-[#ff6b6b] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-[#ff6b6b] to-[#ff5252] rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">📦</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Products</h3>
              <p className="text-gray-600 leading-relaxed">Professional product photography perfect for e-commerce, marketing, and brand storytelling</p>
            </div>
            
            <div className="group text-center p-8 rounded-3xl bg-[#f5f1e8] border-2 border-transparent hover:border-[#ff6b6b] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-[#ff6b6b] to-[#ff5252] rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">👤</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Portraits</h3>
              <p className="text-gray-600 leading-relaxed">Stunning portrait photography with cinematic lighting and professional composition</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6 bg-[#f5f1e8]">
        <div className="container mx-auto max-w-7xl">
          {/* Simple Gallery Grid - Masonry Style */}
          {filteredPrompts.length > 0 ? (
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {filteredPrompts.map((prompt) => (
                <div key={prompt.id} className="break-inside-avoid mb-6">
                  <PromptCard
                    imageSrc={prompt.imageSrc}
                    prompt={prompt.prompt}
                    category={prompt.category}
                    generator={prompt.generator}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
              <div className="w-24 h-24 bg-[#f5f1e8] rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No prompts found</h3>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                Try adjusting your filters to discover amazing AI art prompts.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

