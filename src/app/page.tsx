'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromptCard from '@/components/PromptCard';
import CategoryFilter from '@/components/CategoryFilter';
import { prompts, categories, generators } from '@/data';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGenerator, setSelectedGenerator] = useState('All');

  const filteredPrompts = prompts.filter((prompt) => {
    const categoryMatch = selectedCategory === 'All' || prompt.category === selectedCategory;
    const generatorMatch = selectedGenerator === 'All' || prompt.generator === selectedGenerator;
    return categoryMatch && generatorMatch;
  });

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center my-8">Prompt Reveal</h1>
        <p className="text-center text-lg mb-8">Hover over an image to see the prompt, modify it, and create your own version.</p>
        
        <div className="flex justify-center space-x-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <CategoryFilter
              categories={categories.filter(c => c !== 'All' && !generators.includes(c))}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Generators</h2>
            <CategoryFilter
              categories={generators.filter(g => g !== 'All')}
              selectedCategory={selectedGenerator}
              onSelectCategory={setSelectedGenerator}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              imageSrc={prompt.imageSrc}
              prompt={prompt.prompt}
              category={prompt.category}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

