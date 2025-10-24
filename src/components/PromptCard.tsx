'use client';

import { useState } from 'react';
import Image from 'next/image';
import PromptDetailModal from './PromptDetailModal';

interface PromptCardProps {
  imageSrc: string;
  prompt: string;
  category: string;
  generator: string;
}

const PromptCard = ({ imageSrc, prompt, category, generator }: PromptCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div 
        className="group relative bg-white rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Image Container - 4:5 Aspect Ratio */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <Image 
          src={imageSrc} 
          alt={prompt} 
          width={400}
          height={500}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-90"
          unoptimized
        />
        
        {/* Pinterest-style Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {/* Top Actions */}
          <div className="absolute top-4 right-4 flex gap-2 transform transition-all duration-500" style={{ transform: isHovered ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.8)', opacity: isHovered ? 1 : 0 }}>
            <button className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 border border-white/30">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 border border-white/30">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-all duration-500" style={{ transform: isHovered ? 'translateY(0)' : 'translateY(30px)', opacity: isHovered ? 1 : 0 }}>
            <p className="text-sm font-light leading-relaxed line-clamp-2 mb-4 drop-shadow-lg">
              {prompt}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs px-3 py-1.5 bg-white/15 backdrop-blur-xl rounded-full border border-white/30 font-medium">
                {category}
              </span>
              <span className="text-xs px-3 py-1.5 bg-white/15 backdrop-blur-xl rounded-full border border-white/30 font-medium">
                {generator}
              </span>
            </div>

            {/* Action Button */}
            <button 
              onClick={handleViewDetails}
              className="w-full bg-white text-black px-4 py-3 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl"
            >
              View Details →
            </button>
          </div>
        </div>

        {/* Subtle Gradient Overlay (always visible) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>
      
      {/* Animated Border Effect */}
      <div className="absolute inset-0 rounded-3xl ring-2 ring-transparent group-hover:ring-black/10 transition-all duration-500 pointer-events-none" />
    </div>

    {/* Detail Modal */}
    <PromptDetailModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      imageSrc={imageSrc}
      prompt={prompt}
      category={category}
      generator={generator}
    />
    </>
  );
};

export default PromptCard;
