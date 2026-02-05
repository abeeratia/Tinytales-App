"use client";

import { Link } from "@/navigation";
import LoginForm from "@/components/auth/LoginForm";
import { Toaster } from "react-hot-toast";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 md:px-12 lg:px-20 xl:px-28 py-10">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Login to your account</p>
        </div>

        <LoginForm />

        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
