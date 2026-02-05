"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useLocale } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmblaOptionsType } from "embla-carousel";

interface ProductCarouselProps {
  children: React.ReactNode;
  className?: string;
  opts?: EmblaOptionsType;
  plugins?: any[];
  showArrows?: boolean;
}

export const ProductCarousel = ({
  children,
  className,
  opts = { align: "start", loop: true },
  plugins = [],
  showArrows = true,
}: ProductCarouselProps) => {
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { ...opts, direction },
    plugins
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className={cn("relative group", className)} dir={direction}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4 rtl:-mr-4 rtl:ml-0 touch-pan-y">
          {React.Children.map(children, (child) => (
            <div className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] pl-4 rtl:pr-4 rtl:pl-0">
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={scrollPrev}
            className="w-12 h-12 rounded-full bg-[#E5E7EB] flex items-center justify-center text-gray-600 hover:bg-gray-300 transition rtl:scale-x-[-1]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="w-12 h-12 rounded-full bg-[#C59D96] flex items-center justify-center text-white hover:bg-[#a07d75] transition shadow-lg shadow-[#C59D96]/30 rtl:scale-x-[-1]"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
