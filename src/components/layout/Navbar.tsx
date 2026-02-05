import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { Link } from "@/navigation";
import {
  LayoutGrid,
  Info,
  Phone,
  HelpCircle,
  ShoppingBag,
  Bell,
  Heart,
  House,
} from "lucide-react";
import LanguageSwitcher from "../shared/LanguageSwitcher";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import Image from "next/image";

const Navbar = async () => {
  const t = await getTranslations("Navbar");
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("token");

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 h-[80px] flex items-center justify-between">
        <div className="flex items-center gap-8 lg:gap-10">
          <Link href="/" className="flex items-center">
            <div className="relative w-28 h-12">
              <Image
                src="/TT LogoTT Logo 1.png"
                alt="TinyTales"
                fill
                className="object-contain object-left rtl:object-right"
                priority
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-500 hover:text-[#b58e85] transition-colors text-sm font-medium"
            >
              <House size={18} strokeWidth={1.5} />
              <span>{t("home")}</span>
            </Link>
            <Link
              href="/category"
              className="flex items-center gap-2 text-gray-500 hover:text-[#b58e85] transition-colors text-sm font-medium"
            >
              <LayoutGrid size={18} strokeWidth={1.5} />
              <span>{t("category")}</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 text-gray-500 hover:text-[#b58e85] transition-colors text-sm font-medium"
            >
              <Info size={18} strokeWidth={1.5} />
              <span>{t("about")}</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 text-gray-500 hover:text-[#b58e85] transition-colors text-sm font-medium"
            >
              <Phone size={18} strokeWidth={1.5} />
              <span>{t("contact")}</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-gray-500 hover:text-[#b58e85] transition-colors text-sm font-medium"
            >
              <HelpCircle size={18} strokeWidth={1.5} />
              <span>FAQs</span>
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-gray-900">
          <button className="hover:text-[#b58e85] transition">
            <ShoppingBag size={22} strokeWidth={1.5} />
          </button>

          <button className="hidden sm:block hover:text-[#b58e85] transition">
            <Bell size={22} strokeWidth={1.5} />
          </button>

          <button className="hidden sm:block hover:text-[#b58e85] transition">
            <Heart size={22} strokeWidth={1.5} />
          </button>

          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <UserMenu isLoggedIn={isLoggedIn} />
        </div>

        <div className="lg:hidden">
          <MobileMenu isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
