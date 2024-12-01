import type { FC } from "react";

import { Minus, Plus } from "lucide-react";

import { Paragraph } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useSales } from "@/hooks/use-sale";
import { formatPrice } from "@/lib/utils";
import type { Product as ProductProps } from "@/providers/sales-provider";

interface ProductCardProps extends ProductProps {
  quantity: number;
}

export const Product: FC<ProductCardProps> = (product) => {
  const { incrementProduct, decrementProduct, removeProduct } = useSales(
    (state) => state
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div>
          <Paragraph variant="body" weight="bold">
            {product.productName}
          </Paragraph>

          <div className="mt-4 flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => decrementProduct(product.id)}
              disabled={product.quantity === 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-sm tabular-nums">{product.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => incrementProduct(product.id)}
              disabled={product.stock <= product.quantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-4">
        <Paragraph>
          {formatPrice(product.productPrice * product.quantity)}
        </Paragraph>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => removeProduct(product.id)}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};
