import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { handleRequest } from "@/lib/requests";
import { createProductSchema } from "@/schemas/product";
import { createProduct } from "@/lib/database/product";

export const POST = async (req: NextRequest) => {
  const request = await handleRequest(req, createProductSchema);

  if (request.exceeded) {
    return NextResponse.json(
      { message: "Demasiadas solicitudes, intenta más tarde" },
      { status: 429 }
    );
  }

  if (!request.success) {
    return NextResponse.json({ message: request.error }, { status: 400 });
  }

  const product = request.data;

  const savedProduct = await createProduct(product);

  revalidateTag("products");

  if (!savedProduct) {
    return NextResponse.json(
      { message: "No se pudo crear el producto" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      message: "Producto creado con éxito",
    },
    { status: 201 }
  );
};
