import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { Link } from "@/navigation";

async function getUserData() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const res = await fetch(
      "https://tinytales.trendline.marketing/api/auth/user-data",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        next: { tags: ["user"] },
      }
    );

    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (e) {
    return null;
  }
}

export default async function DashboardPage() {
  const t = await getTranslations("Dashboard");
  const user = await getUserData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* mimicking the Product Details header style */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <p className="text-gray-500 mt-2 text-lg">
            {user ? `Welcome, ${user.name}` : t("welcome")}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 py-10">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">User Profile</h2>
          {user ? (
            <div className="space-y-2">
              <p>
                <span className="font-medium text-gray-600">Name:</span>{" "}
                {user.name}
              </p>
              <p>
                <span className="font-medium text-gray-600">Email:</span>{" "}
                {user.email}
              </p>
              <p>
                <span className="font-medium text-gray-600">Mobile:</span>{" "}
                {user.mobile}
              </p>
              <p>
                <span className="font-medium text-gray-600">ID:</span> {user.id}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-red-500 mb-4">
                You are not logged in or session expired.
              </p>
              <Link href="/login" className="text-primary hover:underline">
                Go to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
