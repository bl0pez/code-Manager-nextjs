import { auth } from "@/auth.config";
import { Sidebar } from "@/codePanel/components/sidebar/Sidebar";
import { redirect } from "next/navigation";

export default async function CodePanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-6">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="bg-slate-100 col-span-5 p-3">{children}</main>
    </div>
  );
}
