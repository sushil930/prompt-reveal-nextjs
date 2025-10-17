'use client';

import Image from 'next/image';

interface PromptCardProps {
  imageSrc: string;
  prompt: string;
  category: string;
  generator: string;
}

const PromptCard = ({ imageSrc, prompt, category, generator }: PromptCardProps) => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
      {/* Image - Variable Height */}
      <div className="relative w-full" style={{ aspectRatio: 'auto' }}>
        <Image 
          src={imageSrc} 
          alt={prompt} 
          width={400}
          height={300}
          className="w-full h-auto object-cover"
          unoptimized
        />
      </div>
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center p-6">
        <div className="text-white text-center space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-sm leading-relaxed line-clamp-4">
            {prompt}
          </p>
          <div className="flex items-center justify-center gap-2 text-xs">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {category}
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {generator}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
