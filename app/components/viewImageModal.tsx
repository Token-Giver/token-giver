"use client";
import React, { useState } from "react";
import RightArrowIcon from "@/svgs/RightArrowIcon";
import Image from "next/image";
import { Dialog, DialogContent } from "../ui/dialog";

interface CampaignModal {
  images: string[];
}

const ViewModalImage = ({ images }: CampaignModal) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  const openModal = (index: number) => {
    setActiveImageIndex(index);
    setIsModalOpen(true);
  };

  const nextImage = () => {
    setIsNavigating(true);
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsNavigating(false), 300);
  };

  const previousImage = () => {
    setIsNavigating(true);
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimeout(() => setIsNavigating(false), 300);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-1">
        {images.slice(0, 4).map((imageUrl, index) => (
          <div
            key={index}
            className="relative h-[11rem] w-full cursor-pointer overflow-clip rounded-[5px]"
            onClick={() => openModal(index)}
          >
            <Image
              src={imageUrl}
              alt={`campaign image ${index + 1}`}
              className="object-cover"
              fill
            />
            {index === 3 && images.length > 4 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="font-agrandir text-2xl text-white">+1</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="h-[80vh] p-4 md:p-6 xl:max-w-[1200px]">
          <div className="flex items-center justify-between">
            <h4 className="font-agrandir text-lg font-bold text-[#282828] sm:text-xl">
              More Images
            </h4>
          </div>
          <div className="flex h-full flex-col">
            <div className="group relative flex-1 overflow-hidden">
              <div
                className="absolute inset-0 scale-110 bg-cover bg-center blur-xl"
                style={{ backgroundImage: `url(${images[activeImageIndex]})` }}
              />

              <Image
                src={images[activeImageIndex]}
                alt={images[activeImageIndex]}
                loader={() => images[activeImageIndex]}
                fill
                className="animate-fadeIn object-contain"
              />

              <div className="absolute top-1/2 z-20 flex w-full -translate-y-1/2 items-center justify-between px-4">
                <button
                  className="grid h-[30px] w-[30px] rotate-180 place-content-center rounded-full bg-gray-200 opacity-50 transition-opacity hover:opacity-100"
                  onClick={previousImage}
                >
                  <RightArrowIcon />
                </button>

                <button
                  className="grid h-[30px] w-[30px] rotate-180 place-content-center rounded-full bg-gray-200 opacity-50 transition-opacity hover:opacity-100"
                  onClick={nextImage}
                >
                  <RightArrowIcon className="inline-block rotate-180" />
                </button>
              </div>

              <div className="absolute bottom-0 left-1/2 z-50 mx-auto flex w-fit -translate-x-1/2 justify-between gap-2 rounded-t-[8px] bg-white p-2">
                {images.map((image, idx) => (
                  <div
                    key={idx}
                    className={`h-[102px] w-[140px] cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
                      idx === activeImageIndex ? "ring-2 ring-accent-green" : ""
                    }`}
                    onClick={() => openModal(idx)}
                  >
                    <img
                      src={image}
                      alt={image}
                      className="relative z-50 h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewModalImage;
