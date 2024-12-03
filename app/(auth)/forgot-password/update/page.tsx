import { UpdatePasswordForm } from "@/components/form/auth/update-password-form";
import { Heading, Paragraph } from "@/components/ui/typography";

const UpdatePassword = () => (
  <>
    <header className="mb-4">
      <Heading center>Actualizar contraseña</Heading>

      <Paragraph center muted weight="normal" className="mt-2">
        Ingresa tu nueva contraseña.
      </Paragraph>
    </header>

    <UpdatePasswordForm />
  </>
);
export default UpdatePassword;
