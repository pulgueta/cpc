import { redirect } from "next/navigation";

import { CreateSales } from "@/components/form/owner/sales/create-sales";
import { Products } from "@/components/owner/sales/products";
import { Separator } from "@/components/ui/separator";
import { Heading, Paragraph } from "@/components/ui/typography";
import { getCurrentSession } from "@/lib/auth/session";
import { getProducts } from "@/lib/database/product";

const CreateSale = async () => {
  const owner = await getCurrentSession();

  if (!owner?.user.id) {
    return redirect("/login");
  }

  const products = await getProducts(owner.user.id);

  return (
    <>
      <header className="my-3.5">
        <Heading>Crear una nueva venta</Heading>
        <Paragraph muted>Llena el formulario con los datos de la venta.</Paragraph>
      </header>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded border p-4">
          <CreateSales products={products} />
        </div>
        <article className="rounded border bg-primary-foreground p-4">
          <Heading as="h3">Factura de venta</Heading>
          <Paragraph muted className="mb-4">
            Aquí podrás ver todas las ventas realizadas en tu tienda.
          </Paragraph>
          <Products />
          <Separator className="my-4" />
        </article>
      </section>
    </>
  );
};
export default CreateSale;
