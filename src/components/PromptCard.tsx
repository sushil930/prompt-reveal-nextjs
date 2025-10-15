'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PromptCardProps {
  imageSrc: string;
  prompt: string;
  category: string;
}

const PromptCard = ({ imageSrc, prompt, category }: PromptCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState(prompt);

  const handleGenerate = () => {
    // Placeholder for generating a new image with the edited prompt
    alert(`Generating new image with prompt: ${editedPrompt}`);
  };

  return (
    <div
      className="relative w-full h-64 rounded-lg overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image src={imageSrc} alt={prompt} layout="fill" objectFit="cover" />
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-75 p-4 flex flex-col justify-between">
          <div>
            <textarea
              className="w-full bg-gray-800 text-white p-2 rounded-md"
              value={editedPrompt}
              onChange={(e) => setEditedPrompt(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Generate
            </button>
          </div>
          <p className="text-white text-sm self-end">{category}</p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
