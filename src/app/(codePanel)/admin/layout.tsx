// lrc: creacion de layout para el panel de codigo
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { AdminMenu } from "@/codePanel/components/menu/AdminMenu";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="space-y-2">
      <AdminMenu />
      {children}
    </div>
  );
}
