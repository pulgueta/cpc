import type { FC } from "react";
import { useMemo } from "react";

import { default as Barcode } from "react-barcode";

import { cn, formatPrice } from "@/lib/utils";
import { useSession } from "@/lib/auth.client";
import { useInvoice } from "@/hooks/use-sale";

interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
}

interface ReceiptProps {
  items: ReceiptItem[];
  invoiceNumber?: string | undefined;
  date: string;
  customerName?: string | undefined;
}

export const PaperReceipt: FC<ReceiptProps> = ({
  items,
  invoiceNumber = "Al finalizar",
  date,
  customerName = "Al finalizar",
}) => {
  const { data } = useSession();

  const { total } = useInvoice();

  const priceWithTax = total * 0.19;

  return (
    <div className="mx-auto w-full max-w-xs text-black shadow-lg">
      <div className="relative border border-white bg-white p-4 font-mono text-sm">
        <div className="text-center">
          <h1 className="font-bold text-xl">RECIBO</h1>
          <p className="text-xs">{data?.session.activeOrganizationId}</p>
          <p>--------------------</p>
          <p className="text-xs">Factura: {invoiceNumber}</p>
          <p className="text-xs">Fecha: {date}</p>
          <p className="text-xs">Cliente: {customerName}</p>
        </div>

        <div className="mb-4 flex justify-center">
          <Barcode
            value={invoiceNumber}
            width={1.5}
            height={50}
            fontSize={12}
          />
        </div>

        <table className="mb-4 w-full">
          <thead>
            <tr className="border-gray-300 border-b">
              <th className="text-left">Producto</th>
              <th className="text-right">Ctd</th>
              <th className="text-right">Precio</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                className={cn(
                  "border-gray-200 border-b",
                  index % 2 === 0 ? "bg-gray-50" : ""
                )}
              >
                <td className="max-w-4 truncate text-right text-xs">
                  {item.name}
                </td>
                <td className="text-right text-xs">{item.quantity}</td>
                <td className="text-right text-xs">
                  {formatPrice(item.price)}
                </td>
                <td className="text-right text-xs">
                  {formatPrice(item.quantity * item.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mb-4 text-right text-xs">
          <p className="font-bold">
            Impuesto (19%): {formatPrice(priceWithTax)}
          </p>
          <p className="font-bold">Total: {formatPrice(total)}</p>
        </div>

        <div className="mt-6 mb-8 text-center">
          <p>¡Gracias por tu compra!</p>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1000"
          height="90"
          viewBox="0 0 1000 90"
          className="absolute bottom-[-60px] left-[-1px] min-w-full max-w-[320px]"
        >
          <path
            id="Triangle_1"
            data-name="Triangle 1"
            className="evenodd] fill-white [fill-rule:"
            d="M31.237,54.109L-0.01-.012H62.483Z"
          />
          <path
            id="Triangle_1_copy"
            data-name="Triangle 1 copy"
            className="evenodd] fill-white [fill-rule:"
            d="M93.763,54.109L62.516-.012h62.493Z"
          />
          <path
            id="Triangle_1_copy_2"
            data-name="Triangle 1 copy 2"
            className="evenodd] fill-white [fill-rule:"
            d="M156.289,54.109L125.042-.012h62.493Z"
          />
          <path
            id="Triangle_1_copy_2-2"
            data-name="Triangle 1 copy 2"
            className="evenodd] fill-white [fill-rule:"
            d="M218.815,54.109L187.568-.012h62.493Z"
          />
          <path
            id="Triangle_1_copy_3"
            data-name="Triangle 1 copy 3"
            className="evenodd] fill-white [fill-rule:"
            d="M281.341,54.109L250.094-.012h62.493Z"
          />
          <path
            id="Triangle_1_copy_3-2"
            data-name="Triangle 1 copy 3"
            className="evenodd] fill-white [fill-rule:"
            d="M343.867,54.109L312.62-.012h62.493Z"
          />
          <path
            id="Triangle_1_copy_3-3"
            data-name="Triangle 1 copy 3"
            className="evenodd] fill-white [fill-rule:"
            d="M406.393,54.109L375.146-.012h62.493Z"
          />
          <path
            id="Triangle_1_copy_3-4"
            data-name="Triangle 1 copy 3"
            className="evenodd] fill-white [fill-rule:"
            d="M468.919,54.109L437.672-.012h62.493Z"
          />
          <path
            id="Triangle_1_copy_4"
            data-name="Triangle 1 copy 4"
            className="evenodd] fill-white [fill-rule:"
            d="M531.445,54.109L500.2-.012h62.493Z"
          />
          <path
            id="Triangle_1_copy_4-2"
            data-name="Triangle 1 copy 4"
            className="evenodd] fill-white [fill-rule:"
            d="M593.971,54.109L562.725-.012h62.493Z"
          />
          <path
            id="Triangle_1_copy_4-3"
            data-name="Triangle 1 copy 4"
            className="evenodd] fill-white [fill-rule:"
            d="M656.5,54.109L625.251-.012h62.493Z"
          />
          <path
            id="Triangle_1_copy_4-4"
            data-name="Triangle 1 copy 4"
            className="evenodd] fill-white [fill-rule:"
            d="M719.023,54.109L687.777-.012H750.27Z"
          />
          <path
            id="Triangle_1_copy_5"
            data-name="Triangle 1 copy 5"
            className="evenodd] fill-white [fill-rule:"
            d="M781.746,54.109L750.5-.012h62.493Z"
          />
          <path
            id="Triangle_1_copy_5-2"
            data-name="Triangle 1 copy 5"
            className="evenodd] fill-white [fill-rule:"
            d="M844.272,54.109L813.026-.012h62.493Z"
          />
          <path
            id="Triangle_1_copy_5-3"
            data-name="Triangle 1 copy 5"
            className="evenodd] fill-white [fill-rule:"
            d="M906.8,54.109L875.552-.012h62.493Z"
          />
          <path
            id="Triangle_1_copy_5-4"
            data-name="Triangle 1 copy 5"
            className="evenodd] fill-white [fill-rule:"
            d="M969.324,54.109L938.078-.012h62.492Z"
          />
          <path
            id="Triangle_1_copy_5-5"
            data-name="Triangle 1 copy 5"
            className="evenodd] fill-white [fill-rule:"
            d="M1031.85,54.109L1000.6-.012h62.5Z"
          />
          <path
            id="Triangle_1_copy_5-6"
            data-name="Triangle 1 copy 5"
            className="evenodd] fill-white [fill-rule:"
            d="M1151.96,56.956L1119.07-.013h65.78Z"
          />
          <path
            id="Triangle_1_copy_5-7"
            data-name="Triangle 1 copy 5"
            className="evenodd] fill-white [fill-rule:"
            d="M1217.78,56.956L1184.89-.013h65.78Z"
          />
          <path
            id="Triangle_1_copy_5-8"
            data-name="Triangle 1 copy 5"
            className="evenodd] fill-white [fill-rule:"
            d="M1283.59,56.956L1250.7-.013h65.78Z"
          />
          <path
            id="Triangle_1_copy_5-9"
            data-name="Triangle 1 copy 5"
            className="evenodd] fill-white [fill-rule:"
            d="M1349.41,56.956L1316.52-.013h65.78Z"
          />
          <path
            id="Triangle_1_copy_5-10"
            data-name="Triangle 1 copy 5"
            className="evenodd] fill-white [fill-rule:"
            d="M1415.22,56.956L1382.33-.013h65.79Z"
          />
          <path
            id="Triangle_1_copy_5-11"
            data-name="Triangle 1 copy 5"
            className="evenodd] fill-white [fill-rule:"
            d="M1481.04,56.956L1448.15-.013h65.78Z"
          />
          <path
            id="Triangle_1_copy_5-12"
            data-name="Triangle 1 copy 5"
            className="evenodd] fill-white [fill-rule:"
            d="M1546.86,56.956L1513.97-.013h65.78Z"
          />
          <path
            id="Triangle_1_copy_4-5"
            data-name="Triangle 1 copy 4"
            className="evenodd] fill-white [fill-rule:"
            d="M1157.5,78.75L1112.03,0h90.94Z"
          />
          <path
            id="Triangle_1_copy_4-6"
            data-name="Triangle 1 copy 4"
            className="evenodd] fill-white [fill-rule:"
            d="M1248.5,78.75L1203.03,0h90.94Z"
          />
          <path
            id="Triangle_1_copy_4-7"
            data-name="Triangle 1 copy 4"
            className="evenodd] fill-white [fill-rule:"
            d="M1339.5,23.75L1294.03-55h90.94Z"
          />
          <path
            id="Triangle_1_copy_4-8"
            data-name="Triangle 1 copy 4"
            className="evenodd] fill-white [fill-rule:"
            d="M1430.5,23.75L1385.03-55h90.94Z"
          />
        </svg>
      </div>
    </div>
  );
};
