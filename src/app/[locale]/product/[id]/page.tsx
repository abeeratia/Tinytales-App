import { fetchProductById, fetchSimilarProducts } from "@/lib/api";
import ProductDetailsClient from "@/components/product/ProductDetailsClient";
import { notFound } from "next/navigation";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  const similarProducts = await fetchSimilarProducts(product.types[0]);

  return (
    <ProductDetailsClient product={product} similarProducts={similarProducts} />
  );
}
