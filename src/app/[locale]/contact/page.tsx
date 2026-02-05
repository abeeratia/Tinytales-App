import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default async function ContactPage() {
  const t = await getTranslations("Contact");
  const navT = await getTranslations("Navbar");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {navT("contact")}
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">{t("header_desc")}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {t("get_in_touch")}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {t("email_us")}
                    </h4>
                    <p className="text-gray-500 text-sm mb-1">
                      {t("email_text")}
                    </p>
                    <a
                      href="mailto:hello@tinytales.com"
                      className="text-primary font-medium hover:underline"
                    >
                      hello@tinytales.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {t("office")}
                    </h4>
                    <p className="text-gray-500 text-sm mb-1">
                      {t("office_text")}
                    </p>
                    <p className="text-gray-700 font-medium">
                      123 Fashion Street, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {t("phone")}
                    </h4>
                    <p className="text-gray-500 text-sm mb-1">
                      {t("phone_text")}
                    </p>
                    <p className="text-gray-700 font-medium" dir="ltr">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t("form_title")}
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      {t("label_fname")}
                    </label>
                    <Input placeholder={t("ph_name")} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      {t("label_lname")}
                    </label>
                    <Input placeholder={t("ph_name")} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t("label_email")}
                  </label>
                  <Input type="email" placeholder={t("ph_email")} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t("label_subject")}
                  </label>
                  <select className="w-full h-12 px-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>{t("opt_general")}</option>
                    <option>{t("opt_order")}</option>
                    <option>{t("opt_returns")}</option>
                    <option>{t("opt_other")}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t("label_message")}
                  </label>
                  <textarea
                    className="w-full min-h-[150px] p-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-y"
                    placeholder={t("ph_msg")}
                  />
                </div>

                <Button size="lg" className="w-full md:w-auto">
                  {t("btn_send")}{" "}
                  <Send className="ml-2 w-4 h-4 rtl:mr-2 rtl:ml-0" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
