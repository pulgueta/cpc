import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { handleRequest } from "@/lib/requests";
import { createProductSchema } from "@/schemas/product";
import { createProduct, getProductByName, updateProduct } from "@/lib/database/product";
import { getCurrentSession } from "@/lib/auth/session";
import { getStoreByOrgId, getStoreBySlug } from "@/lib/database/store";

export const POST = async (req: NextRequest) => {
  const owner = await getCurrentSession();

  if (!owner?.user.id) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const request = await handleRequest(req, createProductSchema);

  if (request.exceeded) {
    return NextResponse.json(
      { message: "Demasiadas solicitudes, intenta más tarde" },
      { status: 429 },
    );
  }

  if (!request.success) {
    return NextResponse.json({ message: request.error }, { status: 400 });
  }

  const product = request.data;

  const store = await getStoreByOrgId(product.storeId);

  const savedProduct = await createProduct({
    ...product,
    storeId: store?.id ?? "",
    storeOwnerId: owner.user.id,
  });

  revalidateTag("products");

  if (!savedProduct) {
    return NextResponse.json({ message: "No se pudo crear el producto" }, { status: 500 });
  }

  return NextResponse.json(
    {
      message: "Producto creado con éxito",
    },
    { status: 201 },
  );
};

export const PUT = async (req: NextRequest) => {
  const owner = await getCurrentSession();

  if (!owner?.user.id) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const request = await handleRequest(req, createProductSchema);

  if (request.exceeded) {
    return NextResponse.json(
      { message: "Demasiadas solicitudes, intenta más tarde" },
      { status: 429 },
    );
  }

  if (!request.success) {
    return NextResponse.json({ message: request.error }, { status: 400 });
  }

  const productData = request.data;

  const product = await getProductByName(request.data.productName);

  const isProductNotUpdated =
    product?.productCategory === productData.productCategory &&
    product.productDescription === productData.productDescription &&
    product.productImageUrl === productData.productImageUrl &&
    product.productName === productData.productName &&
    product.productPrice === productData.productPrice &&
    product.stock === productData.stock;

  if (isProductNotUpdated) {
    return NextResponse.json(
      { message: "Debes realizar cambios en el producto para actualizarlo" },
      { status: 400 },
    );
  }

  if (!product) {
    return NextResponse.json({ message: "No se encontró el producto" }, { status: 404 });
  }

  const savedProduct = await updateProduct(product.id, request.data);

  revalidateTag("products");

  if (!savedProduct) {
    return NextResponse.json({ message: "No se pudo actualizar el producto" }, { status: 400 });
  }

  return NextResponse.json(
    {
      message: "Producto actualizado con éxito",
    },
    { status: 200 },
  );
};
