"use client";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  { name: "Usuarios", path: "/adminPanel" },
  { name: "Operadores", path: "/adminPanel/operators" },
  { name: "Dashboard", path: "/" },
];

export const Navbar = () => {
  const patName = usePathname();

  const isPath = (path: string) => patName === path;

  return (
    <header className="bg-primary container shadow">
      <nav className="text-white">
        {routes.map((route, i) => (
          <Button
            key={i}
            asChild
            variant="link"
            className={clsx("text-white", isPath(route.path) && "underline")}
          >
            <Link href={route.path}>{route.name}</Link>
          </Button>
        ))}
      </nav>
    </header>
  );
};
