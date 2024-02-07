"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  icon: JSX.Element;
  title: string;
  toggleSidebar: () => void;
}

export const SidebarMenuItem = ({
  icon,
  path,
  title,
  toggleSidebar,
}: Props) => {
  const currentPath = usePathname();
  const isActive = currentPath === path;

  return (
    <Link
      onClick={() => toggleSidebar()}
      href={path}
      className={`flex items-center gap-2 hover:bg-indigo-600 p-2 text-gray-400 hover:text-white rounded-md transition-colors font-semibold ${
        isActive && "bg-indigo-600 text-white"
      }`}
    >
      {icon}
      {title}
    </Link>
  );
};
