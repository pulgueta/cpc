import { CreateCategory } from "@/components/form/owner/categories/create-category";
import { CategoriesTable } from "@/components/owner/categoies/categories-table";
import { getCurrentSession } from "@/lib/auth/session";
import { getCategories } from "@/lib/database/category";
import { OwnerHeader } from "@/components/owner-header";

const Categories = async () => {
  const owner = await getCurrentSession();

  const categories = await getCategories(owner?.user.id ?? "");

  return (
    <>
      <OwnerHeader
        title="Categorías"
        description="Aquí podrás administrar las categorías de tu tienda."
      />

      <section className="flex w-full flex-col justify-between gap-4 lg:flex-row">
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
