import { Sidebar } from "@/codePanel/components/sidebar/Sidebar";

export default async function CodePanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-6">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="bg-slate-100 col-span-5 p-3 w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
