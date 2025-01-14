"use client";

import type { FC } from "react";
import { useState } from "react";

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Paragraph } from "@/components/ui/typography";
import { TableFooter } from "@/components/table/table-footer";
import { formatPrice } from "@/lib/utils";
import type { Sales } from "@/constants/db-types";
import { PreviewReceipt } from "./preview-receipt";

export type Column = Sales[number];

export const columns: ColumnDef<Column>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todas las filas"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: () => <div className="text-center">Factura #</div>,
    cell: ({ row }) => <Paragraph>{row.original.invoiceNumber}</Paragraph>,
  },
  {
    accessorKey: "buyerName",
    header: () => <div className="text-center">Nombre</div>,
    cell: ({ row }) => <Paragraph>{row.getValue("buyerName")}</Paragraph>,
  },
  {
    accessorKey: "buyerEmail",
    header: () => <div className="text-center">Correo electrónico</div>,
    cell: ({ row }) => (
      <Paragraph>
        {row.original.buyerEmail?.length ? row.original.buyerEmail : "No se proporcionó un correo"}
      </Paragraph>
    ),
  },
  {
    accessorKey: "buyerPhone",
    header: () => <div className="text-center">Teléfono</div>,
    cell: ({ row }) => <Paragraph>{row.getValue("buyerPhone")}</Paragraph>,
  },
  {
    accessorKey: "documentType",
    header: () => <div className="text-center">Tipo de documento</div>,
    cell: ({ row }) => <Paragraph>{row.getValue("documentType")}</Paragraph>,
  },
  {
    accessorKey: "document",
    header: () => <div className="text-center">Número de documento</div>,
    cell: ({ row }) => <Paragraph>{row.getValue("document")}</Paragraph>,
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        rightIcon={<ArrowUpDown size={16} />}
      >
        Total de compra
      </Button>
    ),
    cell: ({ row }) => <Paragraph>{formatPrice(row.getValue("total"))}</Paragraph>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        rightIcon={<ArrowUpDown size={16} />}
      >
        Fecha de compra
      </Button>
    ),
    cell: ({ row }) => (
      <Paragraph>{new Date(row.original.createdAt!).toLocaleDateString()}</Paragraph>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Ver factura</div>,
    cell: ({ row }) => <PreviewReceipt order={row.original} />,
  },
];

interface SalesTableProps {
  data: Sales;
}

export const SalesTable: FC<SalesTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="mx-auto w-full lg:max-w-2xl xl:max-w-4xl 2xl:max-w-full">
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder="Filtrar ventas por nombre..."
          value={(table.getColumn("buyerName")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("buyerName")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto" rightIcon={<ChevronDown size={16} />}>
              Columnas
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(({ id, headers }) => (
              <TableRow key={id}>
                {headers.map(({ id, isPlaceholder, column, getContext }) => (
                  <TableHead key={id} className="text-center">
                    {isPlaceholder ? null : flexRender(column.columnDef.header, getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sin resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TableFooter
        begin={table.getFilteredSelectedRowModel().rows.length}
        end={table.getFilteredRowModel().rows.length}
        canNextPage={table.getCanNextPage}
        canPreviousPage={table.getCanPreviousPage}
        nextPage={table.nextPage}
        previousPage={table.previousPage}
      />
    </div>
  );
};
