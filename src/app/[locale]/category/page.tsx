import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import Image from "next/image";

export default async function CategoryPage() {
  const t = await getTranslations("Category");

  const categories = [
    {
      id: 1,
      name: t("cat_men"),
      items: "240 " + t("items_count"),
      color: "bg-blue-50",
    },
    {
      id: 2,
      name: t("cat_women"),
      items: "350 " + t("items_count"),
      color: "bg-pink-50",
    },
    {
      id: 3,
      name: t("cat_kids"),
      items: "120 " + t("items_count"),
      color: "bg-yellow-50",
    },
    {
      id: 4,
      name: t("cat_accessories"),
      items: "80 " + t("items_count"),
      color: "bg-purple-50",
    },
    {
      id: 5,
      name: t("cat_footwear"),
      items: "150 " + t("items_count"),
      color: "bg-orange-50",
    },
    {
      id: 6,
      name: t("cat_sports"),
      items: "90 " + t("items_count"),
      color: "bg-green-50",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-12 mb-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h1>
          <p className="text-gray-500">{t("subtitle")}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link
              href="#" // Could link to sub-category page
              key={cat.id}
              className={`group relative overflow-hidden rounded-2xl p-8 transition-all hover:shadow-lg hover:-translate-y-1 ${cat.color}`}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {cat.name}
                </h3>
                <p className="text-gray-600 font-medium">{cat.items}</p>
                <div className="mt-6 inline-flex items-center text-sm font-semibold text-gray-900 group-hover:underline">
                  {t("shop_now")}
                </div>
              </div>

              {/* Decorative circle */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/40 rounded-full group-hover:scale-110 transition-transform duration-500" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
