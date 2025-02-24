"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { MoveLeft, MoveRight, X } from 'lucide-react';
import RightArrowIcon from '@/svgs/RightArrowIcon';
import RightModalArrowIcon from '@/svgs/rightModalArrowIcon';

interface ImageType {
  id: number;
  url: string;
  alt: string;
}

const ViewModalImage = () => {
  const [images] = useState<ImageType[]>([
    { id: 1, url: "../../../casey-horner-4rDCa5hBlCs-unsplash.png", alt: "Forest canopy view" },
    { id: 2, url: "../../../casey-horner-4rDCa5hBlCs-unsplash.png", alt: "Yellow abstract pattern" },
    { id: 3, url: "../../../casey-horner-4rDCa5hBlCs-unsplash.png", alt: "Ocean waves" },
    { id: 4, url: "../../../casey-horner-4rDCa5hBlCs-unsplash.png", alt: "Colorful abstract art" },
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
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        {/* Thumbnail grid */}
       <div className='flex-col flex md:flex-row gap-2 h-[200px] md:w-1/2'>
            <div
              className="w-1/2 relative aspect-square transform cursor-pointer overflow-hidden rounded-lg transition-all duration-300"
              onClick={() => openModal(images[0].id)}
            >
              <img
                src={images[0].url}
                alt={images[0].alt}
                className="h-full w-full object-cover hover:scale-105"
              />
        </div>
        <div className='flex md:flex-col w-1/2 gap-2'>
        <div
              className="relative aspect-square transform cursor-pointer overflow-hidden rounded-lg transition-all duration-300"
              onClick={() => openModal(images[1].id)}
            >
              <img
                src={images[1].url}
                alt={images[1].alt}
                className="h-full w-full object-cover hover:scale-105"
              />
        </div>
        <div
              className="relative aspect-square transform cursor-pointer overflow-hidden rounded-lg transition-all duration-300"
              onClick={() => openModal(images[2].id)}
            >
              {images.length < 3 && <img
                src={images[2].url}
                alt={images[2].alt}
                className="h-full w-full object-cover hover:scale-105"
              />}
            {images.length > 3 &&   <div onClick={() => openModal(images[2].id)} className='bg-black opacity-30 w-full h-full grid place-content-center'>
                <h1 className='text-3xl text-white font-semibold'>+1</h1>
              </div>}
        </div>
        </div>

       </div>

        {/* Modal */}
        {isModalOpen && selectedImageId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300">
            <div className="relative mx-4 flex md:h-[500px] w-full max-w-3xl flex-col gap-4 rounded-[10px] bg-[#FFFFFF] p-4 md:p-8">
              {/* Modal header */}
              <div className="flex items-center justify-between">
                <h4 className="font-agrandir text-lg font-bold text-[#282828] sm:text-xl">
                  More Images
                </h4>
                <div className="absolute -top-12 right-0 flex items-center gap-4">
                  <button
                    onClick={closeModal}
                    className="rounded-full bg-white/20 p-2 transition-colors duration-200 hover:bg-white/30"
                    aria-label="Close modal"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                </div>
                <div className="flex gap-2 font-poppins">
                  <h5 className="text-[#55534E]">Share Campaign</h5>
                  <RightModalArrowIcon />
                </div>
              </div>

              {/* Main image container */}
              <div className="group relative h-4/5 max-h-[482px] overflow-hidden">
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                  <img
                    src={images.find((img) => img.id === selectedImageId)?.url}
                    alt={images.find((img) => img.id === selectedImageId)?.alt}
                    className={`h-full w-full object-contain transition-opacity duration-300 ${
                      isNavigating ? "opacity-80" : "opacity-100"
                    }`}
                  />
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={() => navigateImage("prev")}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 shadow-lg transition-opacity duration-300 hover:bg-white group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <MoveLeft className="h-6 w-6 text-black/30" />
                </button>
                <button
                  onClick={() => navigateImage("next")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 shadow-lg transition-opacity duration-300 hover:bg-white group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <MoveRight className="h-6 w-6 text-black/30" />
                </button>
              </div>

              {/* Thumbnail strip */}
                <div className="flex w-full justify-between gap-2">
                  {images.map((image) => (
                    <div
                      key={image.id}
                      className={`h-16 cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
                        selectedImageId === image.id
                          ? "ring-2 ring-white"
                          : "opacity-70 hover:opacity-100 border"
                      }`}
                      onClick={() => setSelectedImageId(image.id)}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ViewModalImage;