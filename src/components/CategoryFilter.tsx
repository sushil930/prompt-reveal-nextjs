'use client';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button
        onClick={() => onSelectCategory('All')}
        className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
          selectedCategory === 'All' 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50' 
            : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-gray-700'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
            selectedCategory === category 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50' 
              : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-gray-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
