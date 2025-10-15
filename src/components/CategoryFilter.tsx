'use client';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="flex justify-center space-x-4 my-8">
      <button
        onClick={() => onSelectCategory('All')}
        className={`px-4 py-2 rounded-md ${selectedCategory === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-md ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
