"use client";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "./ui/button";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const route = useRouter();
  const searchParams = useSearchParams();

  const pageString = searchParams.get("page") ?? 1;
  const currentPage = isNaN(+pageString) ? 1 : +pageString;

  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathname);
  }

  return (
    <div className="bg-background flex items-center p-2 justify-between flex-wrap gap-2 flex-col md:flex-row">
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Pagina {currentPage} de {totalPages}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="inline-flex items-center gap-2 ">
          <p className="text-sm text-muted-foreground">Mostrar</p>
          <Select
            onValueChange={(value) => {
              const params = new URLSearchParams(searchParams);
              params.set("take", value);
              route.push(`${pathname}?${params.toString()}`);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="5" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="default" size="sm">
          <FaChevronLeft />
        </Button>
        <Button variant="default" size="sm">
          <FaChevronRight />
        </Button>
      </div>
    </div>
  );
};
