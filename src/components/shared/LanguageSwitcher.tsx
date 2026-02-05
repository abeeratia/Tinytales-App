"use client";

import { useRouter } from "@/navigation";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useState, useTransition, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLocale = (nextLocale: string) => {
    startTransition(() => {
      let cleanPath = pathname;
      const segments = pathname.split("/");
      if (
        segments.length > 1 &&
        (segments[1] === "en" || segments[1] === "ar")
      ) {
        cleanPath = "/" + segments.slice(2).join("/");
      }

      router.replace(cleanPath, { locale: nextLocale });
      setIsOpen(false);
    });
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 hover:text-[#b58e85] transition font-bold text-sm"
        disabled={isPending}
      >
        <span>{locale.toUpperCase()}</span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`transition duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-2 right-0 flex flex-col items-start min-w-[100px]">
          <button
            onClick={() => switchLocale("en")}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#b58e85] transition ${
              locale === "en" ? "text-[#b58e85] font-bold" : "text-gray-700"
            }`}
          >
            English
          </button>
          <button
            onClick={() => switchLocale("ar")}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#b58e85] transition ${
              locale === "ar" ? "text-[#b58e85] font-bold" : "text-gray-700"
            }`}
          >
            العربية
          </button>
        </div>
      )}
    </div>
  );
}
