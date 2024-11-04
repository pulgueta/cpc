import { redirect } from "next/navigation";

import { CreateCategory } from "@/components/form/owner/categories/create-category";
import { CategoriesTable } from "@/components/owner/categoies/categories-table";
import { Heading, Paragraph } from "@/components/ui/typography";
import { getCurrentSession } from "@/lib/auth/session";
import { getCategories } from "@/lib/database/category";

const Categories = async () => {
  const owner = await getCurrentSession();

  if (!owner?.user.id) {
    return redirect("/login");
  }

  const categories = await getCategories(owner?.user.id);

  return (
    <>
      <header className="my-3.5">
        <Heading>Categorías</Heading>
        <Paragraph muted>Aquí podrás administrar las categorías de tu tienda.</Paragraph>
      </header>

      <section className="flex w-full flex-col justify-between gap-4 md:flex-row">
        <article className="w-full max-w-3xl">
          <CreateCategory />
        </article>
        <article className="w-full">
          <CategoriesTable data={categories} />
        </article>
      </section>
    </>
  );
};
export default Categories;
