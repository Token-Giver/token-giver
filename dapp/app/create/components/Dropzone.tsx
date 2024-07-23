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
  const [file, setFile] = useState<File | null>(null);
  const maxSize = 50 * 1024 * 1024; // 50 MB

  const isImageFile = (file: File) => file.type.startsWith("image/");
  const isValidSize = (file: File) => file.size <= maxSize;

  const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const validFile = isImageFile(event.dataTransfer.files[0]);
    const validSize = isValidSize(event.dataTransfer.files[0]);
    if (validFile && validSize) {
      setFile(event.dataTransfer.files[0]);
    }
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
      return {
        ...prev,
        image: file,
      };
    });
  }, [file]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={`lg:w-[70%] border-dashed border-[2px]  px-4 py-8 leading-6 rounded-[10px] flex flex-col gap-2 relative ${
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
        ref={fileInputRef}
        onChange={(event) => {
          if (event.target.files) {
            setFile(event.target.files[0]);
          }
        }}
        className="absolute top-0 left-0 w-full h-full cursor-pointer"
        style={{
          opacity: "0",
        }}
      />
      <ul>{file && <li className="text-[0.875em]">{file.name}</li>}</ul>
    </div>
  );
};

export default Dropzone;
