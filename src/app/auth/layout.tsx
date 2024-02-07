import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) return redirect("/codePanel/dashboard");

  return (
    <main className="min-h-screen flex justify-center items-center bg-slate-100">
      {children}
    </main>
  );
}
