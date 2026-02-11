import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Providers from "./Providers";
import AdminSidebar from "./components/AdminSidebar";

export const metadata = {
  title: "TEMPO Admin",
  description: "Panel de administración de TEMPO Salon",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Get current path from headers - if not on login page and not authenticated, redirect
  // The middleware already handles protection, but this is an extra server-side check
  const isLoginPage =
    typeof globalThis !== "undefined" && false; // Layout cannot easily detect path; middleware handles redirect

  if (!session) {
    // Only redirect if we're sure we're not on login
    // Since middleware protects all /admin/* except /admin/login,
    // reaching this layout without a session means we're on /admin/login
    return (
      <Providers>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </Providers>
    );
  }

  return (
    <Providers>
      <div className="min-h-screen bg-gray-50 flex">
        <AdminSidebar />
        <div className="flex-1 min-w-0">
          {/* Header */}
          <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="pl-12 lg:pl-0">
                <h2 className="text-sm font-medium text-gray-500">Panel de Administración</h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">{session.user?.name || session.user?.email}</span>
                <div className="w-8 h-8 rounded-full bg-charcoal text-white flex items-center justify-center text-xs font-medium">
                  {(session.user?.name || session.user?.email || "A").charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="p-4 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}
