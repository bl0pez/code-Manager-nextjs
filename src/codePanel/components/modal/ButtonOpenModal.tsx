"use client";
import { Button } from "@/components/ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";
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
    <Button asChild>
      <Link href={createUrl()}>
        <Pencil2Icon className="mr-2 size-5" /> Agregar
      </Link>
    </Button>
  );
};
