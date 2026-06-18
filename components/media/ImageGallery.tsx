'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: { src: string; alt: string; caption?: string }[];
  className?: string;
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images.length) return null;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  };

  const next = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div
        className={`grid gap-4 ${
          images.length === 1
            ? 'grid-cols-1'
            : images.length === 2
            ? 'grid-cols-2'
            : images.length === 3
            ? 'grid-cols-2 sm:grid-cols-3'
            : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
        } ${className ?? ''}`}
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => openLightbox(i)}
            className="group relative overflow-hidden bg-white dark:bg-black brutal-border brutal-shadow brutal-shadow-hover aspect-square transition-all flex items-center justify-center"
            aria-label={`Lihat ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#fde047]/0 group-hover:bg-[#fde047]/80 transition-all duration-300 flex items-center justify-center">
              <span className="font-mono text-3xl font-black text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-none">
                [+]
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black p-4 transition-colors"
          onClick={closeLightbox}
        >
          {/* Brutalist Pattern Background */}
          <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none text-black dark:text-white" style={{ backgroundImage: 'radial-gradient(currentColor 2px, transparent 2px)', backgroundSize: '30px 30px' }} />

          <div
            className="relative max-w-5xl w-full max-h-[90vh] z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-auto max-h-[80vh] flex items-center justify-center">
              <div className="relative w-full max-h-[80vh] bg-black p-2 brutal-border brutal-shadow">
                <Image
                  src={images[lightboxIndex].src}
                  alt={images[lightboxIndex].alt}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[75vh] w-full"
                />
              </div>
            </div>

            {images[lightboxIndex].caption && (
              <p className="mt-4 text-center font-bold uppercase tracking-wider text-black bg-[#fde047] inline-block px-4 py-2 brutal-border brutal-shadow mx-auto block w-fit">
                {images[lightboxIndex].caption}
              </p>
            )}

            {/* Controls */}
            <button
              onClick={closeLightbox}
              className="absolute -top-6 -right-6 bg-white dark:bg-black brutal-border px-3 py-2 text-black dark:text-white hover:bg-[#f87171] dark:hover:bg-[#f87171] dark:hover:text-black brutal-shadow brutal-shadow-hover transition-colors z-20 flex items-center justify-center"
              aria-label="Tutup kotak cahaya"
            >
              <span className="font-mono text-2xl font-black leading-none">[✕]</span>
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white dark:bg-black brutal-border px-3 py-2 text-black dark:text-white hover:bg-[#60a5fa] dark:hover:bg-[#60a5fa] dark:hover:text-black brutal-shadow brutal-shadow-hover transition-colors z-20 flex items-center justify-center"
                  aria-label="Gambar sebelumnya"
                >
                  <span className="font-mono text-2xl font-black leading-none">[←]</span>
                </button>
                <button
                  onClick={next}
                  className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white dark:bg-black brutal-border px-3 py-2 text-black dark:text-white hover:bg-[#60a5fa] dark:hover:bg-[#60a5fa] dark:hover:text-black brutal-shadow brutal-shadow-hover transition-colors z-20 flex items-center justify-center"
                  aria-label="Gambar selanjutnya"
                >
                  <span className="font-mono text-2xl font-black leading-none">[→]</span>
                </button>
                <div className="mt-6 flex justify-center gap-3">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setLightboxIndex(i)}
                      className={`h-4 transition-all brutal-border ${
                        i === lightboxIndex ? 'w-8 bg-black dark:bg-white' : 'w-4 bg-white dark:bg-black hover:bg-[#facc15] dark:hover:bg-[#facc15]'
                      }`}
                      aria-label={`Pergi ke gambar ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
