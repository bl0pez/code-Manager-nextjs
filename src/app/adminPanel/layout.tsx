import { Navbar } from "@/components/adminPanel/nav/Navbar";

export default async function CodePanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-slate-100">
      <Navbar />
      <main className="container py-4">{children}</main>
    </div>
  );
}
