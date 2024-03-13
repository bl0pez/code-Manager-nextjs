import { Sidebar } from "@/codePanel/components/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer />
    </div>
  );
}
