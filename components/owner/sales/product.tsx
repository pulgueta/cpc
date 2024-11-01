import type { FC } from "react";

import { Minus, Plus } from "lucide-react";

import type { Product as ProductProps } from "@/providers/sales-provider";
import { Heading, Paragraph } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useSales } from "@/hooks/use-sale";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps extends ProductProps {
  quantity: number;
}

export const Product: FC<ProductCardProps> = (product) => {
  const { incrementProduct, decrementProduct, removeProduct } = useSales(
    (state) => state
  );

  return (
    <div key={product.id} className="flex items-center justify-between">
      <div className="flex flex-col items-start gap-2">
        <Heading as="h4">{product.name}</Heading>
        <Paragraph muted>
          {formatPrice(product.price * product.quantity)}
        </Paragraph>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-x-4">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => incrementProduct(product.id)}
          >
            <Plus size={16} />
          </Button>

          <Paragraph className="w-fit tabular-nums">
            {product.quantity}
          </Paragraph>

          <Button
            variant="secondary"
            size="icon"
            onClick={() => decrementProduct(product.id)}
            disabled={product.quantity <= 1}
          >
            <Minus size={16} />
          </Button>
        </div>
        <div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeProduct(product.id)}
          >
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
};
