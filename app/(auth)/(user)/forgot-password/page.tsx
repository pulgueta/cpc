import type { NextPage } from "next";

import { ForgotPasswordForm } from "@/components/form/auth/forgot-password-form";
import { UpdatePasswordForm } from "@/components/form/auth/update-password-form";

interface ForgotPasswordProps {
  searchParams: {
    code?: string;
  };
}

const ForgotPassword: NextPage<ForgotPasswordProps> = ({ searchParams }) => {
  return searchParams.code ? <UpdatePasswordForm /> : <ForgotPasswordForm />;
};

export default ForgotPassword;
