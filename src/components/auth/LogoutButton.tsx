"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "@/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import api from "@/lib/axios";

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await api.post("/auth/logout");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);
    } finally {
      Cookies.remove("token");
      router.push("/login"); // or /
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={className} title="Logout">
        <LogOut
          size={22}
          className="text-red-500 hover:text-red-600 transition"
        />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Logout</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to log out?</p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition flex items-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
