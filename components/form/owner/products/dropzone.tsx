import type { FC } from "react";

import type { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { UploadCloudIcon } from "lucide-react";

import { Paragraph } from "@/components/ui/typography";

interface DropzoneProps {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  isPending: boolean;
  isSuccess: boolean;
}

export const Dropzone: FC<DropzoneProps> = ({
  getInputProps,
  getRootProps,
  isPending = false,
  isSuccess = false,
}) => {
  return (
    <div
      {...getRootProps({
        className:
          "mx-auto mt-4 w-full max-w-lg cursor-pointer rounded border border-dashed border-gray-300 bg-neutral-100 px-4 py-16 transition-colors duration-200 ease-in-out hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 md:py-24",
      })}
    >
      <input {...getInputProps()} disabled={isPending || isSuccess} />
      <>
        {!isPending ? (
          <div className="space-y-2">
            <UploadCloudIcon className="mx-auto size-6" />
            <Paragraph center>Arrastra aquí la imagen del producto o haz clic aquí</Paragraph>
          </div>
        ) : (
          <Paragraph center>Se está creando el producto, por favor espera...</Paragraph>
        )}
      </>
    </div>
  );
};
