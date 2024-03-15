// lrc: creacion de layout para el panel de codigo
import { redirect } from "next/navigation";
import { AdminMenu } from "@/codePanel/components/menu/AdminMenu";
import { auth } from "@/auth";
import { Role } from "@prisma/client";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user.role !== Role.admin) {
    redirect("/");
  }

  return (
    <div className="space-y-2">
      <AdminMenu />
      {children}
    </div>
  );
}
