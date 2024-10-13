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
} from "@react-email/components";

import tailwindConfig from "@/tailwind.config";

interface WelcomeEmailProps {
  name: string;
  code: string;
}

const WelcomeEmail: FC<WelcomeEmailProps> = ({ name, code }) => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html lang="es">
        <Head />
        <Preview>¡Bienvenido al Centro Popular Comercial!</Preview>
        <Container className="p-4">
          <Container>
            <Container className="bg-neutral-900 text-white dark:bg-white dark:text-black rounded px-2">
              <Heading
                as="h1"
                className="font-bold text-center text-balance tracking-tighter"
              >
                ¡Bienvenido al Centro Popular Comercial!
              </Heading>
            </Container>
            <Img
              src="https://www.vanguardia.com/resizer/v2/PWYIAKMYKZDDNCPATBJSGVP3DU.jpg?auth=e8623b3cf5cb8261a54dc4b1ca569b469ab0f85ce30eff9847fbc16ad0d670b9&smart=true&quality=70&width=1200&height=675"
              alt="Welcome"
              className="w-full max-h-96 rounded my-4 object-cover"
            />
            <Text className="text-pretty text-black dark:text-white">
              Estimado {name}:
            </Text>
            <Text className="text-pretty text-black dark:text-white">
              Estamos muy felices de que hagas parte de nuestra nueva
              plataforma. Mediante este email, confirma tu correo electrónico y
              digita el código que aparece a continuación:
            </Text>
            <Container className="bg-neutral-200 mb-4 rounded">
              <Text className="text-center text-3xl font-bold text-black dark:text-white">
                {code ?? "123456"}
              </Text>
            </Container>
            <Container className="flex items-center justify-center">
              <Button
                href={`${process.env.SITE_URL}/verify?code=${code}`}
                className="w-max bg-neutral-900 rounded p-4 text-center mx-auto text-white font-medium"
              >
                Verificar mi correo
              </Button>
            </Container>
          </Container>

          <Container>
            <Text className="text-pretty text-gray-600 text-sm">
              Si tienes problemas con el botón, copia y pega el siguiente enlace
              en tu navegador:
            </Text>
            <Text className="text-center text-pretty text-black dark:text-white text-sm">
              {`${process.env.SITE_URL}/verify?code=${code}`}
            </Text>
            <Text className="text-pretty text-gray-600 text-sm">
              Si no has solicitado este correo, por favor ignóralo.
            </Text>
          </Container>
          <Container>
            <Text className="text-center text-pretty text-black dark:text-white text-sm">
              Centro Popular Comercial © {new Date().getFullYear()}
            </Text>
          </Container>
        </Container>
      </Html>
    </Tailwind>
  );
};

export default WelcomeEmail;
