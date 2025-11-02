'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageCropModal from '@/components/ImageCropModal';
import { createPrompt } from '@/actions/createPrompt';
import { CATEGORY_OPTIONS, GENERATOR_OPTIONS } from '@/data';
import type { GeneratorModel } from '@/lib/prompts';

const initialFormState = {
  title: '',
  prompt: '',
  negativePrompt: '',
  category: CATEGORY_OPTIONS[0] ?? '',
  generator: GENERATOR_OPTIONS[0]?.value ?? 'MIDJOURNEY',
  tags: '',
};

const defaultUserEmail = process.env.NEXT_PUBLIC_DEMO_USER_EMAIL ?? 'demo@promptreveal.app';
const defaultUserName = process.env.NEXT_PUBLIC_DEMO_USER_NAME ?? 'Demo Contributor';
const defaultUserAvatar = process.env.NEXT_PUBLIC_DEMO_USER_AVATAR;

export default function AddPromptPage() {
  const [formState, setFormState] = useState(initialFormState);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [showCropModal, setShowCropModal] = useState(false);
  const [tempImageForCrop, setTempImageForCrop] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Allowed file types
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        setUploadError('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.');
        e.target.value = ''; // Reset input
        return;
      }

      // Validate file size
      if (file.size > MAX_SIZE) {
        setUploadError('File too large. Maximum size is 10MB.');
        e.target.value = ''; // Reset input
        return;
      }

      setUploadError('');
      
      // Read file and show crop modal
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImageForCrop(reader.result as string);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    // Convert blob to File
    const croppedFile = new File([croppedBlob], 'cropped-image.png', { type: 'image/png' });
    setImageFile(croppedFile);
    
    // Generate preview from blob
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(croppedBlob);
    
    setShowCropModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUploadError('');
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      setUploadError('Please upload an image before submitting.');
      return;
    }

    if (!formState.prompt.trim() || !formState.title.trim()) {
      setUploadError('Title and prompt are required.');
      return;
    }

    setIsSubmitting(true);
    setUploadError('');

    try {
      const uploadPayload = new FormData();
      uploadPayload.append('file', imageFile);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: uploadPayload,
      });

      const uploadJson = await uploadResponse.json();

      if (!uploadResponse.ok || !uploadJson?.success) {
        throw new Error(uploadJson?.error || 'Failed to upload image.');
      }

      const uploadData = uploadJson.data;

      const tags = formState.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

      const result = await createPrompt({
        title: formState.title.trim() || 'Untitled Prompt',
        promptText: formState.prompt.trim(),
        negativePrompt: formState.negativePrompt.trim() || undefined,
  category: formState.category,
  model: formState.generator as GeneratorModel,
        image: {
          url: uploadData.url,
          thumbnailUrl: uploadData.thumbnailUrl ?? uploadData.url,
          key: uploadData.key,
          blurDataUrl: uploadData.blurDataUrl ?? '',
          width: uploadData.width ?? 0,
          height: uploadData.height ?? 0,
        },
        tags,
        userEmail: defaultUserEmail,
        userName: defaultUserName,
        userAvatar: defaultUserAvatar,
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to save prompt.');
      }

      setShowSuccess(true);
      setFormState(initialFormState);
      setImageFile(null);
      setImagePreview('');

      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Prompt submission error:', error);
      const message = error instanceof Error ? error.message : 'Something went wrong while saving your prompt.';
      setUploadError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-8">
            <Link href="/" prefetch={true} className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6 group">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="font-medium">Back to Home</span>
            </Link>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-heading">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Add Your
              </span>
              <br />
              <span className="text-black">Prompt</span>
            </h1>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Share your AI-generated artwork and the prompt that created it with the community
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Thumbnail Image *
                </label>
                
                {/* Image Upload Area */}
                <div className="relative">
                  {imagePreview ? (
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview('');
                            setUploadError('');
                          }}
                          className="px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
                        >
                          Change Image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="block aspect-[4/5] rounded-2xl border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
                      <div className="h-full flex flex-col items-center justify-center text-center p-6">
                        <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm font-medium text-gray-700 mb-1">Click to upload image</p>
                        <p className="text-xs text-gray-500">JPEG, PNG, WebP, GIF (max 10MB)</p>
                        <p className="text-xs text-gray-500 mt-2">Recommended: 4:5 aspect ratio</p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                        onChange={handleImageChange}
                        className="hidden"
                        required
                      />
                    </label>
                  )}

                  {/* Upload Error Message */}
                  {uploadError && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-xs text-red-600 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {uploadError}
                      </p>
                    </div>
                  )}
                </div>

                {/* Image Info */}
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-600">
                    <strong>Accepted formats:</strong> JPEG, PNG, WebP, GIF
                    <br />
                    <strong>Max size:</strong> 10MB
                    <br />
                    <strong>Tips:</strong> Upload high-quality images for best results.
                  </p>
                </div>
              </div>

              {/* Right Column - Form Fields */}
              <div className="space-y-6">
                {/* Title Field */}
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-3">
                    Title *
                  </label>
                  <input
                    id="title"
                    name="title"
                    value={formState.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Give your prompt a short, descriptive title"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-700"
                  />
                </div>

                {/* Prompt Field */}
                <div>
                  <label htmlFor="prompt" className="block text-sm font-semibold text-gray-700 mb-3">
                    Prompt *
                  </label>
                  <textarea
                    id="prompt"
                    name="prompt"
                    value={formState.prompt}
                    onChange={handleInputChange}
                    rows={6}
                    required
                    placeholder="Enter the full prompt you used to generate this image..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none text-gray-700"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {formState.prompt.length} characters
                  </p>
                </div>

                {/* Negative Prompt Field */}
                <div>
                  <label htmlFor="negativePrompt" className="block text-sm font-semibold text-gray-700 mb-3">
                    Negative Prompt
                  </label>
                  <textarea
                    id="negativePrompt"
                    name="negativePrompt"
                    value={formState.negativePrompt}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Optional: specify what the model should avoid"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none text-gray-700"
                  />
                </div>

                {/* Category Field */}
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-3">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formState.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-700 bg-white"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Generator Field */}
                <div>
                  <label htmlFor="generator" className="block text-sm font-semibold text-gray-700 mb-3">
                    AI Generator *
                  </label>
                  <select
                    id="generator"
                    name="generator"
                    value={formState.generator}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-700 bg-white"
                  >
                    {GENERATOR_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags Field */}
                <div>
                  <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-3">
                    Tags
                  </label>
                  <input
                    id="tags"
                    name="tags"
                    value={formState.tags}
                    onChange={handleInputChange}
                    placeholder="Comma separated keywords (e.g. neon, cyberpunk, portrait)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-700"
                  />
                </div>

                {/* Guidelines */}
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <h4 className="text-sm font-semibold text-purple-900 mb-2">Community Guidelines</h4>
                  <ul className="text-xs text-purple-700 space-y-1">
                    <li>✓ Share original AI-generated content</li>
                    <li>✓ Provide accurate and complete prompts</li>
                    <li>✓ Be respectful and inclusive</li>
                    <li>✗ No offensive or inappropriate content</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex gap-4">
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !imageFile ||
                  !formState.prompt.trim() ||
                  !formState.title.trim()
                }
                className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Prompt'
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormState(initialFormState);
                  setImageFile(null);
                  setImagePreview('');
                  setUploadError('');
                  setShowSuccess(false);
                  setShowCropModal(false);
                  setTempImageForCrop('');
                }}
                className="px-8 py-4 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center animate-scaleIn">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">Success!</h3>
            <p className="text-gray-600">
              Your prompt has been submitted successfully. Thank you for contributing to our community!
            </p>
          </div>
        </div>
      )}

      {/* Image Crop Modal */}
      <ImageCropModal
        isOpen={showCropModal && !!tempImageForCrop}
        imageSrc={tempImageForCrop}
        onCropComplete={handleCropComplete}
        onClose={() => {
          setShowCropModal(false);
          setTempImageForCrop('');
          // Reset file input when cancelled
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }}
      />

      <Footer />
    </main>
  );
}
