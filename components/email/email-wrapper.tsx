import type { FC, PropsWithChildren } from "react";

import {
  Container,
  Button,
  Tailwind,
  Html,
  Heading,
  Text,
  Img,
  Head,
  Preview,
  Link,
} from "@react-email/components";

import tailwindConfig from "@/tailwind.config";

interface EmailWrapperProps extends PropsWithChildren {
  title: string;
  preview?: string;
}

export const EmailWrapper: FC<EmailWrapperProps> = ({ children, title, preview }) => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html lang="es">
        <Head />
        <Preview>{preview ?? title}</Preview>
        <Container>
          <Container>
            <Container className="rounded bg-neutral-900 px-2 text-white dark:bg-white dark:text-black">
              <Heading as="h1" className="text-balance text-center font-bold tracking-tighter">
                {title}
              </Heading>
            </Container>
            <Img
              src="https://www.vanguardia.com/resizer/v2/PWYIAKMYKZDDNCPATBJSGVP3DU.jpg?auth=e8623b3cf5cb8261a54dc4b1ca569b469ab0f85ce30eff9847fbc16ad0d670b9&smart=true&quality=70&width=1200&height=675"
              alt="Welcome"
              className="my-4 max-h-96 w-full rounded object-cover"
            />
            {children}
          </Container>
          <Container className="rounded-b bg-neutral-200">
            <Text className="text-pretty text-center font-medium text-gray-600 text-sm">
              Barrancabermeja, Centro Popular Comercial © {new Date().getFullYear()}
            </Text>
          </Container>
        </Container>
      </Html>
    </Tailwind>
  );
};
