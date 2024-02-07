"use client";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { TbMedicalCross } from "react-icons/tb";
import { IoShieldOutline } from "react-icons/io5";
import { FaFire } from "react-icons/fa";
import { FaHelicopter } from "react-icons/fa";
import { FaRunning } from "react-icons/fa";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { RiMenu3Fill } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { logout } from "@/actions/auth/logout";
import { ProtectiveRoles } from "@/components/ProtectiveRoles";
import { RiAdminFill } from "react-icons/ri";

const className = "w-6 h-6";

const menuItems = [
  {
    path: "/",
    title: "Dashboard",
    icon: <MdOutlineDashboard className={className} />,
  },
  {
    path: "/blueCode",
    title: "Código Azul",
    icon: <TbMedicalCross className={className} />,
  },
  {
    path: "/greenCode",
    title: "Código Verde",
    icon: <IoShieldOutline className={className} />,
  },
  {
    path: "/redCode",
    title: "Código Rojo",
    icon: <FaFire className={className} />,
  },
  {
    path: "/airCode",
    title: "Código Aéreo",
    icon: <FaHelicopter className={className} />,
  },
  {
    path: "/leakCode",
    title: "Código Fuga",
    icon: <FaRunning className={className} />,
  },
];

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden absolute right-4 bottom-4 bg-indigo-600 p-3 text-white rounded-full"
      >
        {isSidebarOpen ? (
          <MdClose className="w-6 h-6" />
        ) : (
          <RiMenu3Fill className="w-6 h-6" />
        )}
      </button>
      <aside
        className={`h-full p-3 text-center flex flex-col shadow-lg w-3/4  md:w-2/5 lg:w-full absolute lg:static bg-white ${
          isSidebarOpen ? "-left-0" : "-left-full"
        } transition-all duration-300 z-50`}
      >
        <span className="font-bold py-4">Code Manager</span>
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <SidebarMenuItem
              key={item.path}
              {...item}
              toggleSidebar={toggleSidebar}
            />
          ))}
          <ProtectiveRoles roles={["admin"]}>
            <SidebarMenuItem
              path="/admin"
              title="Admin"
              icon={<RiAdminFill className={className} />}
              toggleSidebar={toggleSidebar}
            />
          </ProtectiveRoles>
        </nav>
        <button
          onClick={() => logout()}
          className="flex items-center gap-2 hover:bg-red-500 p-2 text-gray-400 hover:text-white w-full rounded-lg transition-colors font-semibold"
        >
          <CiLogout className="w-6 h-6" />
          Logout
        </button>
      </aside>
    </>
  );
};
