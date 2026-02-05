"use client";

import { useState, useEffect, useRef } from "react";
import { Link, useRouter, usePathname } from "@/navigation";
import { useTranslations, useLocale } from "next-intl";
import {
  Menu,
  X,
  House,
  LayoutGrid,
  Info,
  Phone,
  User,
  LogOut,
  LogIn,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface MobileMenuProps {
  isLoggedIn: boolean;
}

export default function MobileMenu({ isLoggedIn }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsLangOpen(false);
    setIsAuthOpen(false);
  };
  const closeMenu = () => {
    setIsOpen(false);
    setIsLangOpen(false);
    setIsAuthOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLogout = async () => {
    Cookies.remove("token");
    toast.success(t("logout_success") || "Logged out successfully");
    closeMenu();
    router.refresh();
    router.push("/login");
  };

  const switchLocale = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
    closeMenu();
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-700 hover:text-[#b58e85] transition"
        aria-label="Toggle Menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300"
          onClick={closeMenu}
        />
      )}

      {/* Sidebar */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 rtl:left-0 rtl:right-auto h-full w-[280px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full py-6 px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 px-2">
            <span className="text-xl font-bold text-[#b58e85]">TinyTales</span>
            <button
              onClick={closeMenu}
              className="p-2 text-gray-700 hover:text-gray-900"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1 mb-6 overflow-y-auto">
            <Link
              href="/dashboard"
              onClick={closeMenu}
              className="flex items-center gap-3 px-3 py-3 mb-4 rounded-lg bg-[#b58e85]/10 text-[#b58e85] border border-[#b58e85]/20 hover:bg-[#b58e85]/20 transition-all shadow-sm"
            >
              <LayoutDashboard size={20} strokeWidth={1.5} />
              <span className="font-semibold">{t("dashboard_btn")}</span>
            </Link>

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
              {t("pages") || (locale === "ar" ? "الصفحات" : "Pages")}
            </p>
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#b58e85] transition-colors"
            >
              <House size={20} strokeWidth={1.5} />
              <span className="font-medium">{t("home")}</span>
            </Link>
            <Link
              href="/category"
              onClick={closeMenu}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#b58e85] transition-colors"
            >
              <LayoutGrid size={20} strokeWidth={1.5} />
              <span className="font-medium">{t("category")}</span>
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#b58e85] transition-colors"
            >
              <Info size={20} strokeWidth={1.5} />
              <span className="font-medium">{t("about")}</span>
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#b58e85] transition-colors"
            >
              <Phone size={20} strokeWidth={1.5} />
              <span className="font-medium">{t("contact")}</span>
            </Link>
          </div>

          {/* Quick Actions Section */}

          {/* Account & Language Section */}
          <div className="flex flex-col gap-1 mt-auto border-t border-gray-100 pt-4">
            {/* Language Dropdown */}
            <div className="flex flex-col">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#b58e85] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium font-semibold uppercase">
                    {locale}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    isLangOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isLangOpen && (
                <div className="flex flex-col gap-1 px-4 py-2 bg-gray-50/50 rounded-lg mt-1 mx-2 animate-in slide-in-from-top-2">
                  <button
                    onClick={() => switchLocale("en")}
                    className={`flex items-center gap-2 py-2 text-sm ${
                      locale === "en"
                        ? "text-[#b58e85] font-bold"
                        : "text-gray-600"
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-current opacity-0 data-[active=true]:opacity-100"
                      data-active={locale === "en"}
                    />
                    English
                  </button>
                  <button
                    onClick={() => switchLocale("ar")}
                    className={`flex items-center gap-2 py-2 text-sm ${
                      locale === "ar"
                        ? "text-[#b58e85] font-bold"
                        : "text-gray-600"
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-current opacity-0 data-[active=true]:opacity-100"
                      data-active={locale === "ar"}
                    />
                    العربية
                  </button>
                </div>
              )}
            </div>

            {/* Auth Dropdown */}
            <div className="flex flex-col">
              <button
                onClick={() => setIsAuthOpen(!isAuthOpen)}
                className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#b58e85] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1 border border-gray-200 rounded-full">
                    <User size={20} />
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    isAuthOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isAuthOpen && (
                <div className="flex flex-col gap-1 px-4 py-2 bg-gray-50/50 rounded-lg mt-1 mx-2 animate-in slide-in-from-top-2">
                  {isLoggedIn ? (
                    <>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 py-2 text-sm text-red-600 hover:text-red-700"
                      >
                        <LogOut size={16} />
                        {t("logout")}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={closeMenu}
                        className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-[#b58e85]"
                      >
                        <LogIn size={16} />
                        {t("login")}
                      </Link>
                      <Link
                        href="/register"
                        onClick={closeMenu}
                        className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-[#b58e85]"
                      >
                        <User size={16} />
                        {locale === "ar" ? "إنشاء حساب" : "Register"}
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
