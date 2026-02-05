"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "@/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const verifySchema = z.object({
  code: z.string().length(6, "Code must be exactly 6 digits"),
});

type VerifyFormValues = z.infer<typeof verifySchema>;

export default function VerifyForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: VerifyFormValues) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("code", data.code);
    formData.append("type", "client");

    try {
      const response = await api.post("/auth/verify-email", formData);

      if (response.data && response.data.status === false) {
        throw new Error(response.data.message || "Verification failed");
      }

      toast.success("Email verified successfully! Please login.");

      Cookies.remove("token");

      router.push("/login");
    } catch (error: unknown) {
      console.error(error);
      const msg =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any).response?.data?.message ||
        (error as Error).message ||
        "Verification failed";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const onResend = async () => {
    const toastId = toast.loading("Resending code...");
    try {
      await api.post("/auth/verify-email/resend-code");
      toast.success("Code resent successfully!", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Failed to resend code", { id: toastId });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Input
          placeholder="Enter 6-digit Code"
          {...register("code")}
          error={errors.code?.message}
          maxLength={6}
          className="text-center tracking-[0.5em] text-lg h-14"
        />
        <p className="text-xs text-center text-gray-500">
          Check your email inbox (and spam folder) for the code.
        </p>
      </div>

      <div className="space-y-3">
        <Button type="submit" size="full" isLoading={isLoading}>
          Verify Account
        </Button>
        <button
          type="button"
          onClick={onResend}
          className="text-sm text-primary hover:underline w-full text-center"
        >
          Resend Verification Code
        </button>
      </div>
    </form>
  );
}
