'use client';

import React, { useState } from 'react';
import NextImage, { ImageLoaderProps } from 'next/image';

type ImageProps = {
  alt: string;
  src: string;
  className?: string;
};

export const Image = ({ alt, src, className = '' }: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const thumbnailLoader = ({ src }: ImageLoaderProps) =>
    `${process.env.NEXT_PUBLIC_API}/api/images/${src}?thumbnail=true`;

  const loader = ({
    width,
    quality,
    src,
  }: {
    width: number;
    quality?: number;
    src: string;
  }) => {
    const props = [`w=${width}`];
    if (quality) props.push(`q=${quality}`);

    const queryString = props.join('&');

    return `${process.env.NEXT_PUBLIC_API}/api/images/${src}?${queryString}`;
  };

  return (
    <div
      className={`w-full h-full relative rounded-lg overflow-hidden ${className}`}
    >
      <NextImage
        sizes="10px"
        fill
        priority
        alt={alt}
        src={src}
        className="object-cover h-full w-full"
        loader={thumbnailLoader}
      />

      <NextImage
        fill
        alt={alt}
        src={src}
        loader={loader}
        className={`object-cover h-full w-full transition-opacity duration-150 ease-in-out ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};
