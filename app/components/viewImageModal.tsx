"use client";
import React, { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";
import RightArrowIcon from "@/svgs/RightArrowIcon";
import RightModalArrowIcon from "@/svgs/rightModalArrowIcon";
import LeftArrowIcon from "@/svgs/LeftArrowIcon";
import Xmark from "@/svgs/Xmark";

interface CampaignModal {
  isModalOpen: boolean;
  setSelectedImageId: Dispatch<SetStateAction<number|null>>;
  setIsModalOpen:Dispatch<SetStateAction<boolean>>;
  selectedImageId: number |null;
}

interface ImageType{
  id:number,
  url:string,
  alt:string
}

const ViewModalImage = ({
  isModalOpen,
  selectedImageId,
  setSelectedImageId,
  setIsModalOpen
}:CampaignModal) => {
  const [images] = useState<ImageType[]>([
    {
      id: 1,
      url: "/default-image.webp",
      alt: "Forest canopy view"
    },
    {
      id: 2,
      url: "/default-image.webp",
      alt: "Yellow abstract pattern"
    },
    {
      id: 3,
      url: "/default-image.webp",
      alt: "Ocean waves"
    },
    {
      id: 4,
      url: "/default-image.webp",
      alt: "Colorful abstract art"
    },
    {
      id: 5,
      url: "/default-image.webp",
      alt: "Portrait artwork"
    }
  ]);

  const [isNavigating, setIsNavigating] = useState<boolean>(false);

  const closeModal = () => {
    setIsModalOpen(false);
    document.getElementsByTagName("header")[0].style.zIndex = "55"
    document.body.style.overflow = 'unset';
  };

  const navigateImage = useCallback(
    (direction: "prev" | "next") => {
      if (!selectedImageId) return;

      setIsNavigating(true);
      setSelectedImageId((currentId) => {
        const currentIndex = images.findIndex((img) => img.id === currentId);
        if (direction === "next") {
          return images[(currentIndex + 1) % images.length].id;
        } else {
          return images[(currentIndex - 1 + images.length) % images.length].id;
        }
      });
      setTimeout(() => setIsNavigating(false), 300);
    },
    [images, selectedImageId]
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowLeft") {
        navigateImage("prev");
      } else if (e.key === "ArrowRight") {
        navigateImage("next");
      }
    },
    [isModalOpen, navigateImage]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div
      className={`${isModalOpen && selectedImageId ?"container mx-auto inline px-4 sm:py-6":"hidden"} z-[555555]`}
    >
      {/* Modal */}
      {isModalOpen && selectedImageId && (
        <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300 px-8">
          <div className="relative mx-4 flex w-full max-w-3xl flex-col gap-4 rounded-[10px] bg-[#FFFFFF] p-4 md:h-[500px] md:p-8">
            {/* Modal header */}
            <div className="flex items-center justify-between">
              <h4 className="font-agrandir text-lg font-bold text-[#282828] sm:text-xl">
                More Images
              </h4>
              <div className="absolute -top-12 right-0 flex items-center gap-4">
                <button
                  onClick={closeModal}
                  className="rounded-ful transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <Xmark />
                </button>
              </div>
              <div className="flex gap-2 font-poppins">
                <h5 className="text-[#55534E]">Share Campaign</h5>
                <RightModalArrowIcon />
              </div>
            </div>

            {/* Main image container */}
            <div className="group relative h-4/5 max-h-[482px] overflow-hidden">
              <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
                <img
                  src={
                    images.find((img) => img.id === selectedImageId)?.url ?? ""
                  }
                  alt={
                    images.find((img) => img.id === selectedImageId)?.alt ?? ""
                  }
                  className={`h-[300px] w-full object-cover transition-opacity duration-300 ${
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
                <LeftArrowIcon />
              </button>
              <button
                onClick={() => navigateImage("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 shadow-lg transition-opacity duration-300 hover:bg-white group-hover:opacity-100"
                aria-label="Next image"
              >
                <RightArrowIcon  />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="flex w-full justify-between gap-2">
              {images.map((image) => (
                <div
                  key={image.id}
                  className={`h-16 w-full cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
                    selectedImageId === image.id
                      ? "ring-2 ring-white"
                      : "border opacity-70 hover:opacity-100"
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
  );
};

export default ViewModalImage;