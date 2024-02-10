import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "@/components/Provider";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - Code Manager",
    default: "Code Manager",
  },
  description: "Administrador de código",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
