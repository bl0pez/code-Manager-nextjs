"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export const ButtonOpenModal = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const createUrl = () => {
    const params = new URLSearchParams(searchParams);
    params.set("showModal", "true");
    return `${pathName}?${params.toString()}`;
  };

  return (
    <Link
      href={createUrl()}
      className="bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed justify-center items-cente inline-block mb-3"
    >
      Agregar
    </Link>
  );
};
