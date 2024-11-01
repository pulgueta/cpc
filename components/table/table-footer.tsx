import type { FC } from "react";

import { parseAsInteger, useQueryState } from "nuqs";

import { Button } from "../ui/button";

interface TableFooterProps {
  begin: number;
  end: number;
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: () => boolean;
  canNextPage: () => boolean;
}

export const TableFooter: FC<TableFooterProps> = ({
  begin,
  end,
  nextPage,
  previousPage,
  canPreviousPage,
  canNextPage,
}) => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const handleNextPage = () => {
    nextPage();
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    previousPage();
    setPage(page - 1);
  };

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-muted-foreground text-sm">
        {begin} de {end} elementos seleccionados.
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousPage}
          disabled={!canPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={!canNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};
