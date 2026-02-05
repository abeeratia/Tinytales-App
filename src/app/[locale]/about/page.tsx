import { getTranslations } from "next-intl/server";
import { CheckCircle2 } from "lucide-react";

export default async function AboutPage() {
  const t = await getTranslations("About");
  const navT = await getTranslations("Navbar");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {navT("about")}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">{t("header_desc")}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden relative">
            {/* Placeholder for About Image */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              About Us Image
            </div>
          </div>

          <div>
            <span className="text-primary font-semibold mb-2 block">
              {t("our_story")}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t("story_title")}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t("story_p1")}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              {t("story_p2")}
            </p>

            <div className="space-y-4">
              {[
                t("val_quality"),
                t("val_ethical"),
                t("val_sustainable"),
                t("val_customer"),
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary shrink-0" size={20} />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50k+</div>
              <div className="text-white/80">{t("stat_customers")}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">120+</div>
              <div className="text-white/80">{t("stat_brands")}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-white/80">{t("stat_countries")}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-white/80">{t("stat_support")}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
