"use client";

import { useState } from "react";
import { Star, Heart, ShoppingBag, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Product } from "@/types";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { ProductCarousel } from "@/components/shared/ProductCarousel";

interface ProductDetailsClientProps {
  product: Product;
  similarProducts: Product[];
}

export default function ProductDetailsClient({
  product,
  similarProducts,
}: ProductDetailsClientProps) {
  const t = useTranslations("Product");
  const navT = useTranslations("Navbar");

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0
      ? product.colors[0]
      : { name: "Default", value: "#000" }
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : "One Size"
  );
  const [selectedType, setSelectedType] = useState(
    product.types && product.types.length > 0 ? product.types[0] : "General"
  );

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="relative w-full h-[220px] bg-[#F3F4F6] flex flex-col items-center justify-center overflow-hidden">
        <span
          className="absolute text-[80px] md:text-[100px] font-bold text-white opacity-60 select-none whitespace-nowrap pointer-events-none uppercase tracking-widest"
          style={{ WebkitTextStroke: "2px #E5E7EB", color: "transparent" }}
        >
          Product Details
        </span>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 z-10 relative">
          Product Details
        </h1>
      </div>

      <div className="bg-white py-4">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28">
          <div className="bg-[#F8F9FB] rounded-lg px-6 py-3 inline-flex items-center gap-2 text-sm text-gray-500 w-full">
            <span className="font-bold text-gray-900 hover:text-[#b58e85] cursor-pointer transition">
              {navT("home")}
            </span>
            <span className="text-gray-400 text-lg">›</span>
            <span className="font-bold text-gray-900 hover:text-[#b58e85] cursor-pointer transition">
              {navT("category")}
            </span>
            <span className="text-gray-400 text-lg">›</span>
            <span className="text-gray-400">Product Details</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <ProductImageGallery
              images={product.images}
              title={product.title}
            />
          </div>

          <div className="py-4">
            <div className="flex justify-between items-start mb-6">
              <span className="inline-flex items-center px-6 py-2 rounded-full border border-[#fcece9] text-[#C59D96] text-sm font-semibold bg-[#fff8f7]">
                {selectedType}
              </span>
              <div className="flex gap-3">
                <button className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#C59D96] hover:border-[#C59D96] transition-colors bg-white">
                  <ShoppingBag size={20} strokeWidth={1.5} />
                </button>
                <button className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors bg-white">
                  <Heart size={20} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {product.title}
            </h1>

            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="text-lg text-gray-400 line-through decoration-1">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mb-6 font-medium">
              {t("taxes_note")}
            </p>

            <div className="text-gray-500 mb-8 leading-relaxed text-sm">
              <p>{product.description}</p>
              <p className="mt-2">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy.
              </p>
            </div>

            <hr className="border-gray-100 mb-8" />

            <div className="space-y-4 mb-8 w-full max-w-sm">
              <div className="border border-gray-100 rounded-2xl px-5 py-2 relative cursor-pointer hover:border-gray-300 transition group bg-white">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5">
                  Type
                </label>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-bold text-sm">
                    {selectedType}
                  </span>
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
                <select
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {product.types?.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="border border-gray-100 rounded-2xl px-5 py-2 relative cursor-pointer hover:border-gray-300 transition group bg-white">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5">
                  Size
                </label>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-bold text-sm">
                    {selectedSize}
                  </span>
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
                <select
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {product.sizes?.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {t("color") || "Colors"}
              </h3>
              <div className="flex gap-4">
                {product.colors &&
                  product.colors.map((color) => (
                    <div
                      key={color.name}
                      className="flex flex-col items-center gap-2"
                    >
                      <button
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                          selectedColor.name === color.name
                            ? "ring-2 ring-offset-2 ring-[#bd928a]"
                            : "hover:scale-105"
                        )}
                        title={color.name}
                      >
                        <span
                          className="w-full h-full rounded-full shadow-inner border border-black/5"
                          style={{ backgroundColor: color.value }}
                        ></span>
                      </button>
                      {selectedColor.name === color.name && (
                        <span className="text-xs font-medium text-gray-600 animate-in fade-in slide-in-from-top-1">
                          {color.name}
                        </span>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {t("quantity")}{" "}
                <span className="text-gray-400 text-sm font-normal ml-1">
                  (${product.price.toFixed(2)} for Piece)
                </span>
              </h3>

              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center bg-[#F8F8F8] rounded-xl p-1 h-14">
                    <button
                      onClick={decrement}
                      className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 font-bold text-xl transition"
                    >
                      -
                    </button>
                    <div className="w-10 text-center font-bold text-lg text-gray-900">
                      {quantity.toString().padStart(2, "0")}
                    </div>
                    <button
                      onClick={increment}
                      className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 font-bold text-xl transition"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-2xl font-bold text-gray-900">
                    ${(product.price * quantity).toFixed(2)}
                  </div>
                </div>

                <div className="flex-1">
                  <Button
                    size="lg"
                    className="w-full h-14 bg-[#C59D96] hover:bg-[#b08b85] text-white rounded-xl text-lg font-semibold shadow-none flex items-center justify-center gap-3"
                  >
                    {t("add_to_cart") || "Add To Cart"}
                    <ShoppingBag size={20} className="opacity-90" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 relative inline-block">
              Rating & Reviews
              <span className="absolute -bottom-3 left-0 w-12 h-[3px] bg-[#C59D96] rounded-full"></span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 items-center">
            <div className="lg:col-span-3 flex items-end gap-2">
              <span className="text-[80px] leading-none font-bold text-black tracking-tighter">
                {product.rating ? product.rating.toFixed(1) : "4.5"}
              </span>
              <span className="text-gray-400 text-2xl mb-2 font-light">/5</span>
            </div>

            <div className="lg:col-span-6 space-y-3">
              {[
                { s: 5, p: 67 },
                { s: 4, p: 15 },
                { s: 3, p: 6 },
                { s: 2, p: 3 },
                { s: 1, p: 9 },
              ].map((row) => (
                <div key={row.s} className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 min-w-[30px] text-gray-500 font-medium">
                    <Star size={14} className="fill-[#C59D96] text-[#C59D96]" />
                    {row.s}
                  </div>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C59D96] rounded-full"
                      style={{ width: `${row.p}%` }}
                    ></div>
                  </div>
                  <div className="w-8 text-right text-gray-500 text-xs font-bold">
                    %{row.p}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-3 hidden lg:flex flex-col items-center justify-center gap-2 text-center">
              <div className="flex flex-col items-center">
                <span className="text-gray-500 text-sm">Total Reviews</span>
                <span className="text-4xl font-bold text-black">
                  {product.reviewsCount || "3.0K"}
                </span>
              </div>
              <button className="mt-4 bg-[#C59D96] text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-[#a67c74] transition shadow-md shadow-[#C59D96]/20 w-fit flex items-center justify-center gap-2">
                <span>Add Comment</span>
                <Image
                  src="/chat 01.png"
                  alt=""
                  width={18}
                  height={18}
                  className="object-contain opacity-80"
                />
              </button>
            </div>
          </div>

          <div className="space-y-12">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border-b border-gray-50 pb-8 last:border-0 last:pb-0"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                  <div className="flex items-center gap-4">
                    <h4 className="font-bold text-gray-900 text-lg">
                      Alex Daewn
                    </h4>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={14}
                          className="fill-[#C59D96] text-[#C59D96]"
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">
                    4 months ago
                  </span>
                </div>

                <p className="text-gray-500 text-sm leading-7">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy dolor sit.
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-[#F8F8F8] text-[#C59D96] px-8 py-3 rounded-lg font-bold text-sm hover:bg-gray-100 transition">
              View More Comments
            </button>
          </div>
        </div>

        <div className="mt-24 max-w-[1440px] mx-auto mb-20">
          <div className="flex items-center gap-4 mb-10 w-fit">
            <h2 className="text-2xl font-bold text-gray-900 border-b-[3px] border-[#C59D96] pb-2 inline-block">
              Similar Items
            </h2>
          </div>

          <ProductCarousel className="w-full">
            {similarProducts.map((item) => (
              <div
                key={item.id}
                className="bg-transparent group cursor-pointer block h-full"
              >
                <div className="relative aspect-4/5 bg-[#F9F9F9] rounded-[20px] mb-4 overflow-hidden flex items-center justify-center border border-transparent hover:border-gray-100 transition-all">
                  <Image
                    src={item.images[0]}
                    fill
                    className="object-cover hover:scale-105 transition duration-300"
                    alt={item.title}
                  />

                  {item.oldPrice && (
                    <div className="absolute top-4 left-4 bg-white text-gray-900 text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                      {Math.round((1 - item.price / item.oldPrice) * 100)}% OFF
                    </div>
                  )}

                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-400 hover:text-[#C59D96] shadow-sm transition">
                      <ShoppingBag size={14} />
                    </button>
                    <button className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm transition">
                      <Heart size={14} />
                    </button>
                  </div>
                </div>

                <div className="px-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                      {item.types[0] || "General"}
                    </span>
                    <div className="flex items-center text-xs font-bold text-gray-700">
                      <Star
                        size={12}
                        className="text-[#bd928a] mr-1"
                        fill="#bd928a"
                      />{" "}
                      {item.rating}{" "}
                      <span className="text-gray-400 font-normal ml-0.5">
                        ({item.reviewsCount || "150"})
                      </span>
                    </div>
                  </div>

                  <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-3 line-clamp-2 min-h-[40px]">
                    {item.title}
                  </h3>

                  <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-gray-900">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center -space-x-1.5">
                      <div className="w-5 h-5 rounded-full bg-[#C59D96] border border-white"></div>
                      <div className="w-5 h-5 rounded-full bg-black border border-white"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ProductCarousel>
        </div>
      </div>
    </div>
  );
}
