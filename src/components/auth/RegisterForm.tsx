"use client";

import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "@/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { countries } from "countries-list";
import { Search, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountryData {
  name: string;
  phone: string | number[];
}

const getAllCountries = () => {
  return Object.entries(countries)
    .map(([code, data]: [string, CountryData]) => {
      const phone = Array.isArray(data.phone) ? data.phone[0] : data.phone;
      return {
        code,
        name: data.name,
        phone: String(phone).replace(/\D/g, ""),
      };
    })
    .filter((c) => c.phone)
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const registerSchema = z
  .object({
    name: z.string().min(3, "Full Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .min(9, "Phone number is too short")
      .regex(/^\d+$/, "Phone must be numeric"),
    countryCode: z.string().min(1, "Country Code required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

interface SelectedCountry {
  code: string;
  name: string;
  phone: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const countryList = useMemo(() => getAllCountries(), []);

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] =
    useState<SelectedCountry | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      countryCode: "971",
    },
  });

  useEffect(() => {
    register("countryCode");
    const defaultCountry = countryList.find((c) => c.phone === "971");
    if (defaultCountry) {
      setSelectedCountry(defaultCountry);
    }
  }, [countryList, register]);

  const selectedCountryCode = watch("countryCode");

  const filteredCountries = countryList.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.phone);
    formData.append("mobile_country_code", data.countryCode);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.confirmPassword);
    formData.append("type", "client");
    formData.append("fcm_token", "test");

    try {
      const response = await api.post("/auth/register", formData);
      const token = response.data.data.token;
      Cookies.set("token", token);
      toast.success(
        response.data.message || "Account created! Please verify your email."
      );
      router.push("/verify");
    } catch (error: unknown) {
      console.error(error);
      const errorMessage =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any).response?.data?.message || "Registration failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        placeholder="Full Name"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        placeholder="Email Address"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />

      <div className="flex gap-2">
        <div className="w-[120px] sm:w-[140px] relative shrink-0">
          <div
            className={cn(
              "flex h-12 w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-sm cursor-pointer transition-all",
              errors.countryCode
                ? "border-red-500"
                : "border-gray-200 hover:border-gray-300"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="truncate mr-1 font-medium text-gray-700">
              {selectedCountry ? selectedCountry.name : "+Code"}
            </span>
            <ChevronDown size={14} className="text-gray-400 shrink-0" />
          </div>

          {errors.countryCode && (
            <p className="text-xs text-red-500 mt-1">
              {errors.countryCode.message}
            </p>
          )}

          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              ></div>

              <div className="absolute top-14 left-0 w-[280px] sm:w-[320px] max-h-[300px] bg-white border border-gray-200 rounded-xl shadow-xl z-50 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                <div className="p-3 border-b border-gray-100 sticky top-0 bg-white">
                  <div className="relative">
                    <Search
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary transition"
                      placeholder="Search country or code..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>

                <div className="overflow-y-auto flex-1 p-1">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((c) => (
                      <div
                        key={c.code}
                        className={cn(
                          "flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer text-sm transition-colors",
                          selectedCountryCode === c.phone
                            ? "bg-[#FFF0ED] text-[#C59D96]"
                            : "hover:bg-gray-50 text-gray-700"
                        )}
                        onClick={() => {
                          setSelectedCountry(c);
                          setValue("countryCode", c.phone, {
                            shouldValidate: true,
                          });
                          setIsOpen(false);
                          setSearchQuery("");
                        }}
                      >
                        <span className="font-medium truncate flex-1">
                          {c.name}
                        </span>
                        <span className="text-xs opacity-70 ml-2 whitespace-nowrap shrink-0">
                          +{c.phone}
                        </span>
                        {selectedCountryCode === c.phone && (
                          <Check size={14} className="ml-2" />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-gray-400">
                      No countries found
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex-1">
          <Input
            placeholder="Phone Number (e.g. 10xxxxxxxx)"
            type="tel"
            {...register("phone")}
            error={errors.phone?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </div>

      <Button type="submit" size="full" isLoading={isLoading}>
        Create Account
      </Button>
    </form>
  );
}
