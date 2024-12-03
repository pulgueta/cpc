import type { FC } from "react";

import { Container, Section, Text } from "@react-email/components";

import { EmailWrapper } from "@/components/email/email-wrapper";
import { formatPrice } from "@/lib/utils";

interface LocalPurchaseInvoiceProps {
  name: string;
  purchaseDate: Date;
  items: {
    id: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
}

const LocalPurchaseInvoice: FC<Readonly<LocalPurchaseInvoiceProps>> = ({
  purchaseDate = new Date(),
  name = "John Doe",
  items = [
    { id: crypto.randomUUID(), productName: "Item", quantity: 1, price: 599 },
    { id: crypto.randomUUID(), productName: "Item", quantity: 2, price: 40 },
    { id: crypto.randomUUID(), productName: "Item", quantity: 1, price: 20 },
  ],
}) => {
  const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const tax = total * 0.19;

  return (
    <EmailWrapper title="Centro Popular Comercial" preview="Factura de venta">
      <Text className="text-pretty text-black dark:text-white">Estimado {name}:</Text>
      <Text className="text-pretty text-black dark:text-white">
        Te adjuntamos el resumen de tu compra realizada el {purchaseDate.toLocaleDateString()}.
      </Text>
      <Section className="my-[16px] text-pretty rounded-[8px] border border-gray-200 border-solid p-[16px] pt-0 text-black dark:text-white">
        <table className="mb-[16px]" width="100%">
          <tr>
            <th
              align="left"
              className="border-0 border-gray-200 border-b border-solid py-[8px]"
              colSpan={6}
            >
              <Text className="font-bold">Producto</Text>
            </th>
            <th align="center" className="border-0 border-gray-200 border-b border-solid py-[8px]">
              <Text className="font-semibold">Cantidad</Text>
            </th>
            <th align="center" className="border-0 border-gray-200 border-b border-solid py-[8px]">
              <Text className="font-semibold">Precio</Text>
            </th>
          </tr>
          <tr>
            {items.map((item, index) => (
              <tr key={`${item.id}:${index}`} className="text-lg">
                <td
                  align="left"
                  className="border-0 border-gray-200 border-b border-solid py-[8px] font-bold"
                  colSpan={6}
                >
                  <Text>{item.productName}</Text>
                </td>
                <td
                  align="center"
                  className="border-0 border-gray-200 border-b border-solid py-[8px]"
                >
                  <Text>{item.quantity}</Text>
                </td>
                <td
                  align="center"
                  className="border-0 border-gray-200 border-b border-solid py-[8px]"
                >
                  <Text>{formatPrice(item.quantity * item.price)}</Text>
                </td>
              </tr>
            ))}
          </tr>
        </table>
        <Container>
          <Text className="text-right">
            <span className="font-bold">Impuesto (19%):</span> {formatPrice(tax)}
          </Text>
          <Text className="text-right">
            <span className="font-bold">Total:</span> {formatPrice(total + tax)}
          </Text>
        </Container>
      </Section>
    </EmailWrapper>
  );
};

export default LocalPurchaseInvoice;
