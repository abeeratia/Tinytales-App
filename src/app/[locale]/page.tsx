import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { fetchProducts } from "@/lib/api";
import { ProductCarousel } from "@/components/shared/ProductCarousel";
import { ArrowRight, Star, Truck, ShieldCheck, RefreshCw } from "lucide-react";

export default async function HomePage() {
  const t = await getTranslations("Home");
  const products = await fetchProducts(14);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gray-50 py-12 md:py-20 lg:py-28 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              {t("hero_badge")}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t("hero_title_1")} <br />
              <span className="text-primary">{t("hero_title_2")}</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              {t("hero_desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/category">
                <Button size="lg" className="rounded-full px-8 text-base">
                  {t("shop_now")}{" "}
                  <ArrowRight className="ml-2 w-5 h-5 rtl:rotate-180" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 text-base bg-white"
                >
                  {t("learn_more")}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 -right-20 md:right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      <section className="py-16 bg-white border-b">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-gray-50">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                <Truck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  {t("free_shipping")}
                </h3>
                <p className="text-gray-500 text-sm">
                  {t("free_shipping_desc")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-gray-50">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                <RefreshCw size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{t("easy_return")}</h3>
                <p className="text-gray-500 text-sm">{t("easy_return_desc")}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-gray-50">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  {t("secure_payment")}
                </h3>
                <p className="text-gray-500 text-sm">
                  {t("secure_payment_desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("featured_title")}
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              {t("featured_desc")}
            </p>
          </div>

          <ProductCarousel className="w-full max-w-[1400px] mx-auto">
            {products.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.id}`}
                className="group cursor-pointer block"
              >
                <div className="aspect-[4/5] bg-gray-100 rounded-2xl mb-4 overflow-hidden relative border border-gray-100">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto bg-white p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Star size={18} className="text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">
                    ${item.price.toFixed(2)}
                  </span>
                  <div className="flex items-center text-yellow-500 text-xs">
                    <Star size={14} fill="currentColor" />
                    <span className="ms-1 text-gray-400">{item.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </ProductCarousel>

          <div className="text-center mt-12">
            <Link href="/category">
              <Button variant="outline" className="px-8 rounded-full">
                {t("view_all")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t("newsletter_title")}
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto text-lg">
            {t("newsletter_desc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t("email_placeholder")}
              className="flex-1 h-12 px-6 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="h-12 px-8 bg-gray-900 rounded-full font-medium hover:bg-gray-800 transition">
              {t("subscribe")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
