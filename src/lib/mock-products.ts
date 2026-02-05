import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "J.VER Man Shirts Solid Long Sleeve Stretch Wrinkle-Free With Blue",
    price: 300.0,
    oldPrice: 360.0,
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy. Lorem ipsum dolor sit amet, diam nonummy.",
    rating: 4.5,
    reviewsCount: "3.0K",
    images: ["/placeholder-1.jpg"],
    colors: [
      { name: "Red", value: "#D91818" },
      { name: "Light Blue", value: "#CFE2F3", selected: true },
      { name: "Olive", value: "#989053" },
      { name: "Blue", value: "#5B8AC0" },
      { name: "Dark", value: "#4A4A4A" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    types: ["Cotton", "Polyester", "Linen"],
  },
  {
    id: 2,
    title: "Casual Cotton T-Shirt Round Neck",
    price: 45.0,
    oldPrice: 55.0,
    description:
      "Soft cotton t-shirt perfect for everyday wear. Breathable fabric and comfortable fit.",
    rating: 4.8,
    reviewsCount: "1.2K",
    images: ["/placeholder-2.jpg"],
    colors: [
      { name: "White", value: "#FFFFFF" },
      { name: "Black", value: "#000000" },
      { name: "Navy", value: "#000080" },
    ],
    sizes: ["S", "M", "L", "XL"],
    types: ["Cotton"],
  },
  {
    id: 3,
    title: "Denim Jacket Vintage Style",
    price: 120.0,
    oldPrice: 150.0,
    description:
      "Classic denim jacket with a vintage wash. Durable and stylish for any season.",
    rating: 4.6,
    reviewsCount: "850",
    images: ["/placeholder-3.jpg"],
    colors: [
      { name: "Blue Denim", value: "#3b5998" },
      { name: "Black Denim", value: "#222" },
    ],
    sizes: ["M", "L", "XL", "2XL"],
    types: ["Denim"],
  },
  {
    id: 4,
    title: "Summer Floral Dress",
    price: 85.0,
    oldPrice: 100.0,
    description:
      "Lightweight and airy floral dress, perfect for summer outings and beach days.",
    rating: 4.9,
    reviewsCount: "2.1K",
    images: ["/placeholder-4.jpg"],
    colors: [
      { name: "Pink Floral", value: "#FFB6C1" },
      { name: "Blue Floral", value: "#ADD8E6" },
    ],
    sizes: ["S", "M", "L"],
    types: ["Chiffon"],
  },
];
