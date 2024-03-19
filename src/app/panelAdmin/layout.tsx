import { Navbar } from "@/components/adminPanel/nav/Navbar";
import { currentRole } from "@/lib/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function CodePanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await currentRole();

  if (role !== Role.admin) {
    return redirect("/");
  }

  return (
    <div className="h-screen bg-slate-100">
      <Navbar />
      <main className="container py-4">{children}</main>
    </div>
  );
}
