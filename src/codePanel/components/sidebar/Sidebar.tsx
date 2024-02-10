"use client";
import { useSession } from "next-auth/react";
import { MdOutlineDashboard } from "react-icons/md";
import { TbMedicalCross } from "react-icons/tb";
import { IoShieldOutline } from "react-icons/io5";
import { FaFire } from "react-icons/fa";
import { FaHelicopter } from "react-icons/fa";
import { FaRunning } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import clsx from "clsx";

import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarButton } from "./SidebarButton";
import { LogoutButton } from "./LogoutButton";
import { useUiStore } from "@/store/ui/ui-store";

const className = "w-6 h-6";

const menuItems = [
  {
    path: "/",
    title: "Dashboard",
    icon: <MdOutlineDashboard className={`text-indigo-600 ${className}`} />,
  },
  {
    path: "/blueCode",
    title: "Código Azul",
    icon: <TbMedicalCross className={`text-blue-600 ${className}`} />,
  },
  {
    path: "/codeGreen",
    title: "Código Verde",
    icon: <IoShieldOutline className={`text-green-600 ${className}`} />,
  },
  {
    path: "/redCode",
    title: "Código Rojo",
    icon: <FaFire className={`text-red-600 ${className}`} />,
  },
  {
    path: "/airCode",
    title: "Código Aéreo",
    icon: <FaHelicopter className={`text-cyan-600 ${className}`} />,
  },
  {
    path: "/leakCode",
    title: "Código Fuga",
    icon: <FaRunning className={`text-yellow-600 ${className}`} />,
  },
];

export const Sidebar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);

  const { data: session } = useSession();
  const isAdmin = session?.user.role === "admin";

  return (
    <>
      <SidebarButton />
      <aside
        className={clsx("p-2 shadow-lg w-14 bg-white transition-all", {
          "w-60": isSideMenuOpen,
        })}
      >
        <div className="w-full overflow-hidden flex flex-col h-full">
          <div className="w-full flex justify-center">
            <span
              className={clsx(
                "font-bold py-4 block text-center whitespace-nowrap transition-all",
                {
                  "opacity-0": !isSideMenuOpen,
                }
              )}
            >
              Code Manager
            </span>
          </div>
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path} {...item} />
            ))}
            {isAdmin && (
              <>
                <SidebarMenuItem
                  path="/admin"
                  title="Admin"
                  icon={
                    <RiAdminFill className={`text-violet-600 ${className}`} />
                  }
                />
              </>
            )}
          </nav>
          <LogoutButton />
        </div>
      </aside>
    </>
  );
};
