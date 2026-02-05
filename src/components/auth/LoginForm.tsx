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

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      // Postman Endpoint: /auth/login
      const response = await api.post("/auth/login", formData);
      const token = response.data.data.token;

      Cookies.set("token", token);
      localStorage.setItem("token", token);

      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        placeholder="Email Address"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        placeholder="Password"
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />

      <div className="flex justify-end">
        <a href="#" className="text-sm text-primary hover:underline">
          Forgot Password?
        </a>
      </div>

      <Button type="submit" size="full" isLoading={isLoading}>
        Login
      </Button>
    </form>
  );
}
