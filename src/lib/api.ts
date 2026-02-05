import { Product } from "@/types";

const BASE_URL = "https://dummyjson.com";

interface DummyProduct {
  id: number;
  title: string;
  price: number;
  discountPercentage?: number;
  description: string;
  rating: number;
  images: string[];
  thumbnail: string;
  category: string;
}

const mapProduct = (item: DummyProduct): Product => {
  const discount = item.discountPercentage || 0;
  const oldPrice = discount > 0 ? item.price / (1 - discount / 100) : undefined;

  const mockColors = [
    { name: "Red", value: "#D91818" },
    { name: "Blue", value: "#5B8AC0" },
    { name: "Black", value: "#000000" },
  ];

  return {
    id: item.id,
    title: item.title,
    price: item.price,
    oldPrice: oldPrice,
    description: item.description,
    rating: item.rating,
    reviewsCount: `${(Math.random() * 5).toFixed(1)}K`,
    images:
      item.images && item.images.length > 0 ? item.images : [item.thumbnail],
    colors: mockColors,
    sizes: ["S", "M", "L", "XL"],
    types: [item.category || "General"],
  };
};

export async function fetchProducts(limit: number = 12): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/products?limit=${limit}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return (data.products as DummyProduct[]).map(mapProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function fetchProductById(
  id: string | number
): Promise<Product | null> {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return mapProduct(data as DummyProduct);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

export async function fetchSimilarProducts(
  category: string,
  limit: number = 12
): Promise<Product[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/products/category/${category}?limit=${limit}`,
      { cache: "no-store" }
    );

    let products: DummyProduct[] = [];
    if (res.ok) {
      const data = await res.json();
      products = data.products as DummyProduct[];
    }

    if (products.length < limit) {
      const fallbackRes = await fetch(`${BASE_URL}/products?limit=${limit}`, {
        cache: "no-store",
      });
      const fallbackData = await fallbackRes.json();
      const existingIds = products.map((p) => p.id);
      const newProducts = (fallbackData.products as DummyProduct[]).filter(
        (p) => !existingIds.includes(p.id)
      );
      products = [...products, ...newProducts].slice(0, limit);
    }

    return products.map(mapProduct);
  } catch (error) {
    console.error("Error fetching similar products:", error);
    return [];
  }
}
