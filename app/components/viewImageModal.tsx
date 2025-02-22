// "use client";
// import React, { useState } from 'react';

// interface ImageType {
//   id: number;
//   url: string;
//   alt: string;
// }

// const ViewModalImage = () => {

//   const [images] = useState<ImageType[]>([
//     { id: 1, url: ".../../../../a-o-GfQEdpIkkuw-unsplash.png", alt: "Forest canopy view" },
//     { id: 2, url: "../../../henrik-donnestad-t2Sai-AqIpI-unsplash.png", alt: "Yellow abstract pattern" },
//     { id: 3, url: "../../../jene-stephaniuk-esRJtEsvJhU-unsplash.png", alt: "Ocean waves" },
//     { id: 4, url: "../../../jene-stephaniuk-wsVOc34cQ_Q-unsplash.png", alt: "Colorful abstract art" },
//     { id: 5, url: "../../../henrik-donnestad-t2Sai-AqIpI-unsplash.png", alt: "Portrait artwork" }
//   ]);

//   const [selectedImageId, setSelectedImageId] = useState<number | null>(null);


//   const handleImageClick = (id: number) => {
//     setSelectedImageId(id);

//   };

//   return (
//     <main className='bg-white' >
//       <div className='flex justify-between container px-4 '>
//         <div>
//           <h4 className='font-bold'>View Image</h4>
//         </div>
//         <div>
//           <h3 className='text-gray-300'>Share Campaign</h3>
//         </div>
//       </div>
//       <div className="container mx-auto px-4 py-8 bg-white">
//         {/* Main featured image */}
//         <div className="mb-8">
//           {selectedImageId ? (
//             <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative rounded-lg overflow-hidden">
//               <img
//                 src={images.find(img => img.id === selectedImageId)?.url}
//                 alt={images.find(img => img.id === selectedImageId)?.alt}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ) : (
//             <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative rounded-lg overflow-hidden">
//               <img
//                 src={images[0].url}
//                 alt={images[0].alt}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           )}
//         </div>

//         {/* Thumbnail grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//           {images.map((image) => (
//             <div
//               key={image.id}
//               className="aspect-square relative rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
//               onClick={() => handleImageClick(image.id)}
//             >
//               <img
//                 src={image.url}
//                 alt={image.alt}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>

//       </div>
//     </main>
//   );
// };

// export default ViewModalImage;



"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Redo } from 'lucide-react';

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

  const [selectedImageId, setSelectedImageId] = useState<number>(1);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
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
  }, [images]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      navigateImage('prev');
    } else if (e.key === 'ArrowRight') {
      navigateImage('next');
    }
  }, [navigateImage]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleImageClick = (id: number) => {
    setSelectedImageId(id);
  };

  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-bold text-lg sm:text-xl">View Image</h4>
          <div className='flex gap-2'>
            <h3 className="text-gray-300 text-sm sm:text-base">Share Campaign</h3>
            <Redo className='w-6 h-6 font-bold text-gray-300' />
          </div>

        </div>

        {/* Main image container */}
        <div className="relative mb-8 group">
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative rounded-lg overflow-hidden">
            <img
              src={images.find(img => img.id === selectedImageId)?.url}
              alt={images.find(img => img.id === selectedImageId)?.alt}
              className={`w-full h-full object-cover transition-opacity duration-300 ${isNavigating ? 'opacity-80' : 'opacity-100'
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

        {/* Thumbnail grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className={`aspect-square relative rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 ${selectedImageId === image.id ? 'ring-2 ring-blue-500' : ''
                }`}
              onClick={() => handleImageClick(image.id)}
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
    </main>
  );
};

export default ViewModalImage;