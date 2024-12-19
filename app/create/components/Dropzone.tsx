"use client";
import { InputDateType } from "@/types";
import {
  useState,
  useCallback,
  useRef,
  DragEvent,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

const Dropzone = ({
  address,
  setInputData,
}: {
  address: string | undefined;
  setInputData: Dispatch<SetStateAction<InputDateType>>;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const maxSize = 50 * 1024 * 1024; // 50 MB

  const isImageFile = (file: File) => file.type.startsWith("image/");
  const isValidSize = (file: File) => file.size <= maxSize;

  const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => 
      isImageFile(file) && isValidSize(file)
    );
    setFiles(prev => [...prev, ...validFiles]);
  }, []);

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  useEffect(() => {
    setInputData((prev) => {
      const [mainImage, ...additionalImages] = files;
      return {
        ...prev,
        image: mainImage || null,
        additionalImages: additionalImages || [],
      };
    });
  }, [files, setInputData]);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="relative">
      <p className="absolute top-[-1.2rem] right-[.5em] lg:right-[31%] text-red text-[.7em]">
        Required*
      </p>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
        className={`lg:w-[70%] border-dashed border-[2px] px-4 py-8 leading-6 rounded-[10px] flex flex-col gap-2 relative ${
          !address ? "border-gray-200" : "border-gray-300"
        }`}
      >
        <p className="text-[#878787]">
          Drag and drop image files here (max size: 50 MB), or{" "}
          <span className="underline text-blue">click</span> to select files
        </p>
        <input
          type="file"
          name="image"
          accept="image/*"
          disabled={!address}
          required
          multiple
          ref={fileInputRef}
          onChange={(event) => {
            if (event.target.files) {
              const newFiles = Array.from(event.target.files);
              const validFiles = newFiles.filter(file => 
                isImageFile(file) && isValidSize(file)
              );
              setFiles(prev => [...prev, ...validFiles]);
            }
          }}
          className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
        />
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li key={file.name + index} className="flex justify-between items-center text-[0.875em]">
              <span>{file.name}</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropzone;
