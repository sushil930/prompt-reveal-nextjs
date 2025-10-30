import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoriesContent from './CategoriesContent';
import { CATEGORY_METADATA } from '@/data';
import { getCategoryStats } from '@/lib/prompts';

export default async function CategoriesPage() {
  const categoryStats = await getCategoryStats();

  const statsMap = new Map(
    categoryStats.map((entry) => [entry.category.toLowerCase(), entry])
  );

  const categories = CATEGORY_METADATA.map((meta) => {
    const stat = statsMap.get(meta.name.toLowerCase());
    return {
      id: meta.id,
      name: meta.name,
      description: meta.description,
      color: meta.color,
      tags: meta.tags,
      image: stat?.imageSrc ?? meta.image,
      blurDataUrl: stat?.blurDataUrl ?? null,
      count: stat?.count ?? 0,
    };
  });

  const totalPrompts = categoryStats.reduce(
    (sum, entry) => sum + (entry.count ?? 0),
    0
  );
  const totalCategories = categories.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />

      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '1s' }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '2s' }}
          />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative">
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8 group"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="font-medium">Back to Home</span>
            </Link>

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

            <div className="flex items-center justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-black mb-1">{totalCategories}</div>
                <div className="text-sm text-gray-500 font-light">Categories</div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="text-center">
                <div className="text-4xl font-bold text-black mb-1">{totalPrompts}</div>
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

      <section className="pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <CategoriesContent categories={categories} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
