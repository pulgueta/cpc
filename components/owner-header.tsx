import type { FC } from "react";

import { Heading, Paragraph } from "./ui/typography";

interface OwnerHeaderProps {
  title: string;
  description: string;
}

export const OwnerHeader: FC<OwnerHeaderProps> = ({ description, title }) => {
  return (
    <header className="my-3.5">
      <Heading>{title}</Heading>
      <Paragraph muted>{description}</Paragraph>
    </header>
  );
};
