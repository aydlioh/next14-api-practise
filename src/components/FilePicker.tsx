'use client';

import { ChangeEvent, DragEvent, useEffect, useRef, useState } from 'react';

type FilePickerProps = {
  onSelect: (file: File | null) => void;
  image: File | null;
  previewTools?: React.ReactNode;
};

export const FilePicker = ({
  onSelect,
  image,
  previewTools,
}: FilePickerProps) => {
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onSelect(file);
    } else {
      setIsError(true);
      errorTimeoutRef.current = setTimeout(() => setIsError(false), 4000);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onSelect(file);
    } else {
      setIsError(true);
      errorTimeoutRef.current = setTimeout(() => setIsError(false), 4000);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  useEffect(() => {
    () => {
      errorTimeoutRef.current && clearTimeout(errorTimeoutRef.current);
    };
  });

  return (
    <div
      className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg transition-colors duration-300 border-blue-400 bg-white"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <label
        htmlFor="file-upload"
        className={`flex flex-col items-center justify-center w-full h-48 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer hover:bg-blue-300/10 transition-colors ${
          isDragOver && 'bg-blue-300/10 border-blue-500'
        }`}
      >
        <span className="text-gray-500">Upload an image</span>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      {isError && (
        <div className="text-rose-500 mt-4 sm:text-start text-center">
          <span>Please select a valid image file. </span>
          <br className="sm:block hidden" />
          <span>[.jpg, .jpeg, .png, .gif, .webp]</span>
        </div>
      )}
      {image && (
        <div className="mt-4 w-full">
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-full h-auto rounded-lg shadow-md mb-5"
          />
          {previewTools}
        </div>
      )}
    </div>
  );
};
