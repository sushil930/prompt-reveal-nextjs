'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

interface PromptDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  blurDataUrl?: string;
  title: string;
  prompt: string;
  negativePrompt?: string | null;
  category: string;
  generator: string;
  likesCount: number;
  savesCount: number;
  viewsCount: number;
  tags?: string[];
  createdAt?: string;
  createdBy?: string;
}

const formatCompactNumber = (value: number) =>
  new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);

const PromptDetailModal = ({
  isOpen,
  onClose,
  imageSrc,
  blurDataUrl,
  title,
  prompt,
  negativePrompt,
  category,
  generator,
  likesCount,
  savesCount,
  viewsCount,
  tags = [],
  createdAt,
  createdBy,
}: PromptDetailModalProps) => {
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      setCopyState('idle');
    };
  }, [isOpen, onClose]);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 2000);
    } catch (error) {
      console.error('Failed to copy prompt', error);
    }
  };

  const handleDownload = () => {
    window.open(imageSrc, '_blank', 'noopener,noreferrer');
  };

  const stats = useMemo(
    () => [
      { label: 'Likes', value: likesCount },
      { label: 'Saves', value: savesCount },
      { label: 'Views', value: viewsCount },
    ],
    [likesCount, savesCount, viewsCount]
  );

  const displayDate = createdAt
    ? new Date(createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg hover:scale-110"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="grid md:grid-cols-2 gap-0 h-full max-h-[90vh]">
          {/* Left Side - Image */}
          <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[600px] bg-gray-100">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
              placeholder={blurDataUrl ? 'blur' : 'empty'}
              blurDataURL={blurDataUrl || undefined}
              sizes="(min-width: 1024px) 50vw, 90vw"
              priority
            />

            {/* Image Actions */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
              <button
                onClick={handleDownload}
                className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-xl text-white rounded-xl font-medium hover:bg-white/30 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download
              </button>
              <a
                href={imageSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 bg-white/20 backdrop-blur-xl text-white rounded-xl font-medium hover:bg-white/30 transition-all duration-200 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="flex flex-col overflow-y-auto p-8 gap-0">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-black/5 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 self-start">
              <span className="w-2 h-2 bg-black rounded-full" />
              {category}
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-black mb-2 leading-tight">
              {title}
            </h2>

            {/* Meta Info */}
            <p className="text-sm text-gray-500 mb-6">
              Generated with{' '}
              <span className="font-medium text-gray-800">{generator}</span>
              {createdBy ? ` · Shared by ${createdBy}` : ''}
              {displayDate ? ` · ${displayDate}` : ''}
            </p>

            {/* Prompt Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Prompt
                </h3>
                <button
                  onClick={handleCopyPrompt}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  {copyState === 'copied' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 max-h-40 overflow-y-auto">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {prompt}
                </p>
              </div>
            </div>

            {/* Negative Prompt Section */}
            {negativePrompt && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  Negative Prompt
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 max-h-32 overflow-y-auto">
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {negativePrompt}
                  </p>
                </div>
              </div>
            )}

            {/* Tags Section */}
            {tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-100">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-black mb-1">
                    {formatCompactNumber(stat.value)}
                  </div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2 pb-4">
              <button className="flex-1 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-200 hover:scale-105">
                Try This Prompt
              </button>
              <button className="px-6 py-3 bg-gray-100 text-black rounded-full font-medium hover:bg-gray-200 transition-all duration-200">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <button className="px-6 py-3 bg-gray-100 text-black rounded-full font-medium hover:bg-gray-200 transition-all duration-200">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptDetailModal;