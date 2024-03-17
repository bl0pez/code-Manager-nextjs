import { Sidebar } from "@/components/codePanel/sidebar/Sidebar";

export default async function CodePanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="bg-slate-100 col-span-5 p-3 w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
