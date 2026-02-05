"use client";

import { useState, useRef, useEffect } from "react";
import { Link, useRouter } from "@/navigation";
import {
  User,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  LogIn,
} from "lucide-react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface UserMenuProps {
  isLoggedIn: boolean;
}

export default function UserMenu({ isLoggedIn }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const confirmLogout = async () => {
    setIsLoading(true);
   
    Cookies.remove("token");
    toast.success("Logged out successfully");
    router.refresh();
    router.push("/login");

    setIsLoading(false);
    setIsLogoutConfirmOpen(false);
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative z-50" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-1 hover:text-[#b58e85] transition"
        >
          <User size={22} strokeWidth={1.5} />
          <ChevronDown
            size={14}
            strokeWidth={2}
            className={`transition duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 right-0 rtl:left-0 rtl:right-auto text-start">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#b58e85] transition"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsLogoutConfirmOpen(true);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#b58e85] transition"
                >
                  <LogIn size={16} />
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#b58e85] transition"
                >
                  <User size={16} />
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      {isLogoutConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4 text-red-500">
                <LogOut size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Sign Out</h3>
              <p className="text-gray-500 mt-2 text-sm">
                Are you sure you want to sign out of your account?
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsLogoutConfirmOpen(false)}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition shadow-sm"
                disabled={isLoading}
              >
                {isLoading ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
