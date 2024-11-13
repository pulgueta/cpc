import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
// import type { FieldValues, UseFormReturn } from "react-hook-form";

import { uploadProductImage } from "@/lib/aws/s3";
import { useSession } from "@/lib/auth.client";

const PHOTO_UPLOAD_MAX_SIZE = 2000000;

interface UseFormDropzoneProps<_T> {
  // biome-ignore lint: later
  form: any;
  owner: ReturnType<typeof useSession>;
}

export const useFormDropzone = <T>({ form, owner }: UseFormDropzoneProps<T>) => {
  const dropzone = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: PHOTO_UPLOAD_MAX_SIZE,
    validator: (upload) => {
      if (!upload.type.includes("image/")) {
        return {
          code: "file-invalid-type",
          message: "El archivo no es una imagen",
        };
      }

      if (upload.size > PHOTO_UPLOAD_MAX_SIZE) {
        return {
          code: "file-too-large",
          message: "La imagen debe ser inferior a 2MB",
        };
      }

      return null;
    },
    onDropRejected: (fileRejections) => {
      toast.error(fileRejections[0].errors[1].message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onDropAccepted: (upload) => {
      toast.promise(
        async () => {
          const productImage = await uploadProductImage(upload[0], owner.data?.user.id).then(
            (res) => res?.url,
          );

          if (!productImage) {
            toast.error("Error al subir la imagen");
          }

          form.setValue("productImageUrl", productImage);
        },
        {
          loading: "Subiendo tu foto...",
          success: "Imagen subida con éxito",
          error: "Error al subir la imagen",
        },
      );
    },
  });

  return dropzone;
};
