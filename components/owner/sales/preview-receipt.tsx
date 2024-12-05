import type { FC, FormEvent } from "react";
import { useMemo } from "react";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { DownloadIcon, Eye, MailIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { PaperReceipt } from "./paper-receipt";
import type { Sale } from "@/db/schemas";
import type { SalesWithItems } from "@/constants/db-types";

interface PreviewReceiptProps {
  order: Sale & { saleItems?: SalesWithItems[number]["saleItems"] };
}

export const PreviewReceipt: FC<PreviewReceiptProps> = ({ order }) => {
  const items = useMemo(
    () =>
      order.saleItems?.map((item) => ({
        id: item.id,
        productName: item.productName,
        quantity: item.quantity,
        price: item.productPrice,
      })),
    [order.saleItems],
  );

  const downloadReceipt = async () => {
    const receiptElement = document.getElementById(`invoice-${order.invoiceNumber}`) as HTMLElement;

    const canvas = await html2canvas(receiptElement);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`CPCVTA-${order.invoiceNumber}.pdf`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button tooltip tooltipContent={<p>Previsualizar factura</p>} variant="outline" size="icon">
          <Eye size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Factura de venta</DialogTitle>
          <DialogDescription>
            Vista previa de la factura con los detalles de la venta.
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <PaperReceipt
            date={order.createdAt}
            items={items!}
            customerName={order.buyerName}
            invoiceNumber={order.invoiceNumber!}
            total={order.total}
          />
        </div>

        <Button leftIcon={<DownloadIcon size={16} />} onClick={() => downloadReceipt()}>
          Descargar PDF
        </Button>
        {order.buyerEmail && (
          <form className="w-full">
            <Button
              className="w-full"
              leftIcon={<MailIcon size={16} />}
              variant="secondary"
              tooltip
              tooltipContent={<p>Se enviará a {order.buyerEmail}</p>}
            >
              Enviar por correo al cliente
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
