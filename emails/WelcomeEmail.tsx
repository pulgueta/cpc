import type { FC } from "react";

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

interface WelcomeEmailProps {
  name: string;
  url: string;
}

const WelcomeEmail: FC<Readonly<WelcomeEmailProps>> = ({
  name = "John Doe",
  url = "https://example.com",
}) => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html lang="es">
        <Head />
        <Preview>¡Bienvenido al Centro Popular Comercial!</Preview>
        <Container>
          <Container>
            <Container className="rounded bg-neutral-900 px-2 text-white dark:bg-white dark:text-black">
              <Heading as="h1" className="text-balance text-center font-bold tracking-tighter">
                ¡Bienvenido al Centro Popular Comercial!
              </Heading>
            </Container>
            <Img
              src="https://www.vanguardia.com/resizer/v2/PWYIAKMYKZDDNCPATBJSGVP3DU.jpg?auth=e8623b3cf5cb8261a54dc4b1ca569b469ab0f85ce30eff9847fbc16ad0d670b9&smart=true&quality=70&width=1200&height=675"
              alt="Welcome"
              className="my-4 max-h-96 w-full rounded object-cover"
            />
            <Text className="text-pretty text-black dark:text-white">Estimado {name}:</Text>
            <Text className="text-pretty text-black dark:text-white">
              Estamos muy felices de que hagas parte de nuestra nueva plataforma. Mediante este
              email, haz clic en el siguiente botón para verificar tu correo electrónico.
            </Text>
            <Container className="flex items-center justify-center py-4">
              <Link
                href={url}
                className="mx-auto w-max rounded bg-neutral-900 p-4 text-center font-medium text-white"
              >
                Verificar mi correo
              </Link>
            </Container>
          </Container>

          <Container>
            <Text className="text-pretty text-gray-600 text-sm">
              Si tienes problemas con el botón, copia y pega el siguiente enlace en tu navegador:
            </Text>
            <Text className="text-pretty text-center text-black text-sm dark:text-white">
              {url}
            </Text>
            <Text className="text-pretty text-gray-600 text-sm">
              Si no has solicitado este correo, por favor ignóralo.
            </Text>
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

export default WelcomeEmail;
