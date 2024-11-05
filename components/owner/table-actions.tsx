import type { FC, PropsWithChildren, SetStateAction } from "react";

import { MoreHorizontalIcon, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

interface TableActionsProps extends PropsWithChildren {
  setOpenEdit: (value: SetStateAction<boolean>) => void;
  setOpenDelete: (value: SetStateAction<boolean>) => void;
}

export const TableActions: FC<TableActionsProps> = ({ children, setOpenEdit, setOpenDelete }) => {
  const handleEdit = () => {
    setOpenEdit((prev) => !prev);
  };

  const handleDelete = () => {
    setOpenDelete((prev) => !prev);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline" className="size-8">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontalIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleEdit}>Editar</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDelete}
            className="font-semibold text-destructive dark:text-red-600"
          >
            <Trash2 className="mr-2" size={16} />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {children}
    </>
  );
};
