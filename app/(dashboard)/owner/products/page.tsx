import { CreateProduct } from "@/components/form/owner/products/create-product";
import { SalesTable } from "@/components/owner/sales/sales-table";
import { Heading, Paragraph } from "@/components/ui/typography";

const Products = () => {
  return (
    <>
      <header className="my-3.5">
        <Heading>Productos</Heading>
        <Paragraph muted>Aquí podrás administrar los productos de tu tienda.</Paragraph>
      </header>
      <section className="flex w-full flex-col justify-between gap-4 md:flex-row">
        <article className="w-full max-w-3xl">
          <CreateProduct />
        </article>
        <article className="w-full max-w-3xl">
          <SalesTable />
        </article>
      </section>
    </>
  );
};
export default Products;
