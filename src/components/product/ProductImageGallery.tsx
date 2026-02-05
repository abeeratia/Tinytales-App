"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

export const ProductImageGallery = ({
  images,
  title,
}: ProductImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  ]);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  const scrollPrev = useCallback(
    () => emblaMainApi && emblaMainApi.scrollPrev(),
    [emblaMainApi]
  );
  const scrollNext = useCallback(
    () => emblaMainApi && emblaMainApi.scrollNext(),
    [emblaMainApi]
  );

  const galleryImages =
    images && images.length > 0 ? images : ["/placeholder.png"];

  return (
    <div className="space-y-6">
      <div className="relative aspect-[4/5] w-full bg-[#f0f0f0] rounded-[40px] overflow-hidden shadow-sm group">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {galleryImages.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "w-12 h-1 rounded-full shadow-sm transition-all duration-300",
                idx === selectedIndex ? "bg-white" : "bg-white/50"
              )}
            />
          ))}
        </div>

        <div className="overflow-hidden h-full" ref={emblaMainRef}>
          <div className="flex h-full touch-pan-y">
            {galleryImages.map((src, idx) => (
              <div
                className="flex-[0_0_100%] min-w-0 relative h-full"
                key={idx}
              >
                <Image
                  src={src}
                  alt={`${title} - view ${idx + 1}`}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollPrev}
          className="absolute top-1/2 left-6 -translate-y-1/2 w-12 h-12 bg-[#B0B0B0] hover:bg-gray-500 text-white rounded-full flex items-center justify-center transition-all z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute top-1/2 right-6 -translate-y-1/2 w-12 h-12 bg-[#C59D96] hover:bg-[#b08b85] text-white rounded-full flex items-center justify-center transition-all shadow-lg shadow-[#C59D96]/30 z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="overflow-hidden" ref={emblaThumbsRef}>
        <div className="flex gap-4">
          {galleryImages.map((src, idx) => (
            <div
              key={idx}
              className={cn(
                "relative flex-[0_0_96px] h-24 bg-white rounded-3xl overflow-hidden cursor-pointer border-2 transition-all",
                idx === selectedIndex
                  ? "border-white ring-1 ring-gray-200"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
              onClick={() => onThumbClick(idx)}
            >
              <div className="w-full h-full flex items-center justify-center bg-[#f4f7fa]">
                <Image
                  src={src}
                  width={60}
                  height={60}
                  alt="thumb"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
