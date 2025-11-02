'use client';

import { useState, useEffect } from 'react';
import { ImageCrop, ImageCropContent, ImageCropApply, ImageCropReset } from '@/components/ui/shadcn-io/image-crop';

interface ImageCropModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedImageBlob: Blob) => void;
}

export default function ImageCropModal({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
}: ImageCropModalProps) {
  const [file, setFile] = useState<File | null>(null);

  // Convert data URL to File when imageSrc changes
  useEffect(() => {
    if (imageSrc) {
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'image.png', { type: blob.type });
          setFile(file);
        });
    }
  }, [imageSrc]);

  const handleCrop = async (croppedImageDataUrl: string) => {
    try {
      // Convert data URL to blob
      const response = await fetch(croppedImageDataUrl);
      const blob = await response.blob();
      onCropComplete(blob);
    } catch (error) {
      console.error('Error converting cropped image:', error);
    }
  };

  if (!isOpen || !file) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-black">Crop Image</h2>
              <p className="text-sm text-gray-500 mt-1">
                Adjust the crop area • 3:4 aspect ratio
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Crop Area - Scrollable */}
        <div className="flex-1 overflow-auto p-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <ImageCrop
              file={file}
              aspect={3 / 4}
              onCrop={handleCrop}
            >
              {/* Crop Content - No aspect ratio constraint, let image maintain natural proportions */}
              <div className="bg-white rounded-xl shadow-inner overflow-hidden border border-gray-200">
                <ImageCropContent 
                  className="w-full min-h-[300px] max-h-[600px]" 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
              </div>
              
              {/* Helper Text */}
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-800 flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>
                    <strong>Tip:</strong> Drag the crop box to reposition. Use the corners and edges to resize while maintaining the 3:4 aspect ratio.
                  </span>
                </p>
              </div>

              {/* Actions inside ImageCrop context */}
              <div className="flex items-center gap-3 justify-between mt-6">
                <ImageCropReset asChild>
                  <button className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all duration-200 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reset
                  </button>
                </ImageCropReset>
                
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <ImageCropApply asChild>
                    <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Apply Crop
                    </button>
                  </ImageCropApply>
                </div>
              </div>
            </ImageCrop>
          </div>
        </div>
      </div>
    </div>
  );
}