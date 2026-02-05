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
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const t = await getTranslations("Dashboard");
  const user = await getUserData();

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="text-gray-500">Please log in to view your dashboard.</p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#b58e85] text-white font-medium hover:bg-[#a07d75] transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-24 h-24 bg-[#b58e85]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#b58e85] shadow-inner">
            <span className="text-4xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            {t("welcome")}, <span className="text-[#b58e85]">{user.name}</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            We are glad to have you back. Here is an overview of your account
            information.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          {/* Email Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Email Address</h3>
            </div>
            <p className="text-gray-600 break-all">{user.email}</p>
          </div>

          {/* Phone Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Phone Number</h3>
            </div>
            <p className="text-gray-600">{user.mobile || "Not provided"}</p>
          </div>

          {/* ID Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
                {/* Using roughly Mail icon again as placeholder for 'ID' generic, or use Hash icon logic if available */}
              </div>
              <h3 className="font-semibold text-gray-900">User ID</h3>
            </div>
            <p className="text-gray-600 text-sm font-mono">{user.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
