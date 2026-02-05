"use client";

import VerifyForm from "@/components/auth/VerifyForm";
import { Toaster } from "react-hot-toast";

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 md:px-12 lg:px-20 xl:px-28 py-10">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Verify Your Email
          </h1>
          <p className="text-gray-500 mt-2">We sent a code to your email.</p>
        </div>

        <VerifyForm />
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
