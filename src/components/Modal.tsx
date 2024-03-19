import { RiMenuAddLine } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const Modal = ({ title, subtitle, children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="icon" title="Crear Codigo">
          <RiMenuAddLine size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
