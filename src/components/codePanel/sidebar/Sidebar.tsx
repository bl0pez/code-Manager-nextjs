"use client";
import { MdOutlineDashboard } from "react-icons/md";
import { TbMedicalCross } from "react-icons/tb";
import { IoShieldOutline } from "react-icons/io5";
import { FaFire } from "react-icons/fa";
import { FaHelicopter } from "react-icons/fa";
import { FaRunning } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { GiMovementSensor } from "react-icons/gi";
import clsx from "clsx";

import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarButton } from "./SidebarButton";
import { LogoutButton } from "./LogoutButton";
import { useUiStore } from "@/store/ui/ui-store";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import { Role } from "@prisma/client";

const className = "w-6 h-6";

const menuItems = [
  {
    path: "/",
    title: "Dashboard",
    icon: <MdOutlineDashboard className={`text-indigo-600 ${className}`} />,
  },
  {
    path: "/code-blue",
    title: "Código Azul",
    icon: <TbMedicalCross className={`text-blue-600 ${className}`} />,
  },
  {
    path: "/codeGreen",
    title: "Código Verde",
    icon: <IoShieldOutline className={`text-green-600 ${className}`} />,
  },
  {
    path: "/codeRed",
    title: "Código Rojo",
    icon: <FaFire className={`text-red-600 ${className}`} />,
  },
  {
    path: "/fireAlarms",
    title: "Alarmas de Incendio",
    icon: <GiMovementSensor className={`text-indigo-600 ${className}`} />,
  },
  {
    path: "/codeAir",
    title: "Código Aéreo",
    icon: <FaHelicopter className={`text-cyan-600 ${className}`} />,
  },
  {
    path: "/codeLeak",
    title: "Código Fuga",
    icon: <FaRunning className={`text-yellow-600 ${className}`} />,
  },
];

export const Sidebar = () => {
  const currentRole = useCurrentRole();
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  return (
    <>
      <SidebarButton />
      <aside
        className={clsx("p-2 shadow-lg w-14 bg-background transition-all", {
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

            {currentRole === Role.admin && (
              <SidebarMenuItem
                path="/panelAdmin"
                title="Panel Admin"
                icon={
                  <RiAdminLine className={`text-indigo-600 ${className}`} />
                }
              />
            )}
          </nav>
          <LogoutButton />
        </div>
      </aside>
    </>
  );
};
