import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heading, Paragraph } from "@/components/ui/typography";
import { formatPrice } from "@/lib/utils";

export const ProductPreview = () => {
  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader>
        <CardTitle>Vista previa del producto</CardTitle>
        <CardDescription>
          Puedes ver cómo se verá tu producto en la tienda y en inventario.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4">
          <div>
            <img
              src={"https://via.placeholder.com/150"}
              alt="Producto"
              className="size-32 rounded-lg object-cover"
            />
          </div>
          <div className="space-y-1">
            <Heading as="h3">Título</Heading>
            <Paragraph>
              <span className="font-bold">Precio:</span> {formatPrice(150000)}
            </Paragraph>
            <Badge>Categoría</Badge>
            <Paragraph>
              <span className="font-bold">Disponibilidad:</span> 50
            </Paragraph>
          </div>
        </div>

        <Paragraph className="mt-4">
          Descripción del producto. Puedes agregar una descripción detallada del producto aquí.
        </Paragraph>
      </CardContent>
      <CardFooter className="flex-col gap-2.5 border-t pt-4">
        <Button className="w-full">Agregar al carrito</Button>
        <Button variant="secondary" className="w-full">
          Ver más
        </Button>
      </CardFooter>
    </Card>
  );
};
