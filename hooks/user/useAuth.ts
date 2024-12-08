import { passkey, signIn } from "@/lib/auth.client";

export const useAuth = () => {
  const onPasskeyLogin = async () => {
    const data = await signIn.passkey();

    return [data?.data, data?.error];
  };

  const onPasskeyRegister = async () => {
    const data = await passkey.addPasskey();

    return [data?.data, data?.error];
  };

  return {
    onPasskeyLogin,
    onPasskeyRegister,
  };
};
