
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageType {
  id: number;
  url: string;
  alt: string;
}

const ViewModalImage = () => {
  const [images] = useState<ImageType[]>([
    { id: 1, url: ".../../../../a-o-GfQEdpIkkuw-unsplash.png", alt: "Forest canopy view" },
    { id: 2, url: "../../../henrik-donnestad-t2Sai-AqIpI-unsplash.png", alt: "Yellow abstract pattern" },
    { id: 3, url: "../../../jene-stephaniuk-esRJtEsvJhU-unsplash.png", alt: "Ocean waves" },
    { id: 4, url: "../../../jene-stephaniuk-wsVOc34cQ_Q-unsplash.png", alt: "Colorful abstract art" },
    { id: 5, url: "../../../casey-horner-4rDCa5hBlCs-unsplash.png", alt: "Portrait artwork" }
  ]);

  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);

  const openModal = (id: number) => {
    setSelectedImageId(id);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (!selectedImageId) return;
    
    setIsNavigating(true);
    setSelectedImageId(currentId => {
      const currentIndex = images.findIndex(img => img.id === currentId);
      if (direction === 'next') {
        return images[(currentIndex + 1) % images.length].id;
      } else {
        return images[(currentIndex - 1 + images.length) % images.length].id;
      }
    });
    setTimeout(() => setIsNavigating(false), 300);
  }, [images, selectedImageId]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isModalOpen) return;
    
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      navigateImage('prev');
    } else if (e.key === 'ArrowRight') {
      navigateImage('next');
    }
  }, [isModalOpen, navigateImage]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        {/* Thumbnail grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="aspect-square relative rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => openModal(image.id)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && selectedImageId && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center transition-opacity duration-300">
            <div className="relative w-full max-w-7xl mx-4">
              {/* Modal header */}
              <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-10">
                <h4 className="font-bold text-lg sm:text-xl text-white">More Images</h4>
                <div className="flex items-center gap-4">
                  <button
                    onClick={closeModal}
                    className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors duration-200"
                    aria-label="Close modal"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Main image container */}
              <div className="relative group">
                <div className="w-full h-[80vh] relative rounded-lg overflow-hidden">
                  <img
                    src={images.find(img => img.id === selectedImageId)?.url}
                    alt={images.find(img => img.id === selectedImageId)?.alt}
                    className={`w-full h-full object-contain transition-opacity duration-300 ${
                      isNavigating ? 'opacity-80' : 'opacity-100'
                    }`}
                  />
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Thumbnail strip */}
              <div className="absolute bottom-4 left-0 right-0">
                <div className="flex justify-center gap-2 px-4">
                  {images.map((image) => (
                    <div
                      key={image.id}
                      className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                        selectedImageId === image.id ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => setSelectedImageId(image.id)}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ViewModalImage;