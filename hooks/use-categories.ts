import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { Categories, Category } from "@/constants/db-types";

export const useCategories = () => {
  const queryClient = useQueryClient();

  const categories = useQuery<Categories>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");

      if (!res.ok) {
        throw new Error("An error occurred while fetching categories");
      }

      const data = await res.json();

      data.forEach((category: Category) =>
        queryClient.setQueryData<Category>(["category", category.id], category),
      );

      return data;
    },
  });

  return categories;
};
