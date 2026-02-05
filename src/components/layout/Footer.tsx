"use client";

import { Link } from "@/navigation";
import { Facebook, Instagram, Twitter, Send, Linkedin } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative text-white pt-20 pb-12 overflow-hidden font-sans">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/kids-photography 1.png')" }}
      >
        <div className="absolute inset-0 bg-[#423833]/95"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="mb-6">
              <Image
                src="/TT LogoTT Logo 1.png"
                alt="TinyTales"
                width={100}
                height={80}
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 opacity-80">
              Ipsam in eos qui consequatur ab cum maxime. Soluta dolor quae
              consequatur ab. Soluta dolor quae Ipsam in eos quconsequatur ab
              cum maxime. Soluta dolor quae.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-white mb-6">Let Us Help</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-white mb-6">Policies</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-white mb-6">Send Email</h4>
            <div className="flex items-center w-full bg-white rounded-xl p-1.5 mb-8 shadow-sm">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 w-full min-w-0 bg-transparent text-gray-900 px-4 py-2 text-sm outline-none placeholder:text-gray-400"
              />
              <button className="shrink-0 bg-[#bd928a] px-6 py-2.5 rounded-lg text-white font-medium hover:bg-[#a67c74] transition text-sm whitespace-nowrap">
                Send
              </button>
            </div>

            <div>
              <h5 className="font-bold mb-4 text-white">Follow Us</h5>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-2 bg-transparent text-white hover:text-[#bd928a] transition"
                >
                  <Facebook size={22} fill="currentColor" strokeWidth={0} />
                </a>
                <a
                  href="#"
                  className="p-2 bg-transparent text-white hover:text-[#bd928a] transition"
                >
                  <Twitter size={22} fill="currentColor" strokeWidth={0} />
                </a>
                <a
                  href="#"
                  className="p-2 bg-transparent text-white hover:text-[#bd928a] transition"
                >
                  <Instagram size={22} />
                </a>
                <a
                  href="#"
                  className="p-2 bg-transparent text-white hover:text-[#bd928a] transition"
                >
                  <Linkedin size={22} fill="currentColor" strokeWidth={0} />
                </a>
                <a
                  href="#"
                  className="p-2 bg-transparent text-white hover:text-[#bd928a] transition"
                >
                  <Send size={22} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
