"use client";

import type { FC } from "react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/typography";

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: FC<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <article className="flex w-full flex-col items-center justify-center gap-4 p-4">
      <Heading as="h2" center>
        ¡Ocurrió un error!
      </Heading>
      <Paragraph center>{error.message}</Paragraph>

      <Button onClick={() => reset()}>Intentar otra vez</Button>
    </article>
  );
};

export default Error;
