import { Heading, Paragraph } from "@/components/ui/typography";

const Products = () => {
  return (
    <>
      <header className="my-3.5">
        <Heading>Productos</Heading>
        <Paragraph muted>
          Aquí podrás administrar los productos de tu tienda.
        </Paragraph>
      </header>
      <section className="w-full">
        <Heading as="h2">Productos (WIP)</Heading>
        <Paragraph muted>Esta sección está en construcción.</Paragraph>
      </section>
    </>
  );
};
export default Products;
