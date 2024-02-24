"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { FaUsers } from "react-icons/fa";

const links = [
  { path: "/admin/users", label: "Usuarios" },
  { path: "/admin/operators", label: "Operadores" },
];

export const AdminMenu = () => {
  const currentPath = usePathname();

  return (
    <div className="flex gap-2 text-gray-500 font-bold text-xl">
      {links.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={clsx(
            "border px-3 py-2 rounded hover:bg-indigo-600 hover:text-white transition-colors",
            {
              "text-white bg-indigo-600": currentPath === link.path,
              "bg-white": currentPath !== link.path,
            }
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};
