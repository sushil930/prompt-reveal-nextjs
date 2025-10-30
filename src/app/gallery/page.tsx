import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromptCard from '@/components/PromptCard';
import { getAllPrompts } from '@/lib/prompts';

export default async function GalleryPage() {
  const prompts = await getAllPrompts({ take: 120, sort: 'newest' });

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />

      {/* Gallery Header */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-8">
            <Link href="/" prefetch={true} className="inline-flex items-center text-gray-600 hover:text-black transition-colors mb-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-heading">
              Complete Gallery
            </h1>
            <p className="text-xl text-gray-600 font-light">
              Explore all prompts from our community
            </p>
          </div>
        </div>
      </section>

      {/* Full Gallery Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          {prompts.length === 0 ? (
            <div className="py-20 text-center text-gray-500 border border-dashed border-gray-200 rounded-3xl">
              <p className="text-lg font-medium">Nothing here yet. Be the first to share an AI prompt.</p>
              <Link
                href="/add-prompt"
                prefetch={true}
                className="inline-flex mt-6 px-6 py-3 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-all"
              >
                Add a prompt
              </Link>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-5 2xl:columns-6 gap-6 space-y-6">
              {prompts.map((prompt, index) => (
                <div
                  key={`${prompt.id}-${index}`}
                  className="break-inside-avoid animate-fadeInUp"
                  style={{
                    animationDelay: `${index * 20}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <PromptCard
                    id={prompt.id}
                    title={prompt.title}
                    prompt={prompt.prompt}
                    negativePrompt={prompt.negativePrompt}
                    category={prompt.category}
                    generator={prompt.generator}
                    imageSrc={prompt.imageSrc}
                    fullImageSrc={prompt.imageUrl}
                    blurDataUrl={prompt.blurDataUrl}
                    likesCount={prompt.likesCount}
                    savesCount={prompt.savesCount}
                    viewsCount={prompt.viewsCount}
                    tags={prompt.tags}
                    createdAt={prompt.createdAt}
                    createdBy={prompt.createdBy}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );

}
