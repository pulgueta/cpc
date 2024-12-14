import type { FC } from "react";

// import Image from "next/image";
// import dynamic from "next/dynamic";

// import { Camera } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Switch } from "@/components/ui/switch";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Skeleton } from "@/components/ui/skeleton";
import { Heading, Paragraph } from "@/components/ui/typography";
// import { isUserSignedWithSocial } from "@/lib/database/user";

// const TwoFADialog = dynamic(() => import("@/components/modal/2fa").then((mod) => mod.TwoFADialog));

interface ProfileSettingsProps {
  userInfo: {
    imageSrc: string | null | undefined;
    name: string | undefined;
    email: string | undefined;
    isEmailVerified: boolean | null | undefined;
    is2FAEnabled: boolean | null | undefined;
  };
  saveDisabled: boolean;
}

export const ProfileSettings: FC<ProfileSettingsProps> = async ({
  userInfo,
  // saveDisabled,
}) => {
  // const isSocial = await isUserSignedWithSocial();

  return (
    <form className="space-y-6">
      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        {/* <div className="relative">
          {userInfo.imageSrc && userInfo.name ? (
            <Image
              src={userInfo.imageSrc}
              alt={userInfo.name}
              width={128}
              height={128}
              className="rounded-full"
            />
          ) : (
            <Skeleton className="size-32 rounded-full" />
          )}

          <TooltipProvider>
            <Tooltip delayDuration={150}>
              <TooltipTrigger asChild>
                <label
                  htmlFor="profile-upload"
                  className="absolute right-0 bottom-0 cursor-pointer rounded-full bg-primary p-2 text-primary-foreground"
                >
                  <Camera size={16} />
                  <span className="sr-only">Subir nueva foto</span>
                </label>
              </TooltipTrigger>
              <TooltipContent>
                <p>Subir nueva foto</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            className="hidden"
          />
        </div> */}
        <div className="text-center sm:text-left">
          <Paragraph variant="body">{userInfo.name}</Paragraph>
          <Paragraph>{userInfo.email}</Paragraph>
        </div>
      </div>

      {/* <div className="space-y-2">
        <Label>Documento de identidad</Label>
        <RadioGroup
          defaultValue="CC"
          name="documentType"
          className="my-1 flex gap-4"
          required
        >
          {["CC", "CE", "TI", "NIT"].map((document) => (
            <div
              className="flex flex-row items-center space-x-2"
              key={document}
            >
              <RadioGroupItem value={document} id={document} />
              <Label htmlFor={document}>{document}</Label>
            </div>
          ))}
        </RadioGroup>
        <Input placeholder="647281291" type="number" name="document" required />
      </div> */}

      <div className="space-y-4">
        {/* <Heading as="h3">Configuración de cuenta</Heading> */}
        <Heading as="h3">Pronto más detalles ;)</Heading>
        {/* <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications">
            Recibir notificaciones por correo
          </Label>
          <Switch id="email-notifications" />
        </div> */}
        {/* {!isSocial && (
          <div className="flex items-center justify-between">
            <Paragraph>Autenticación de dos factores</Paragraph>
            <TwoFADialog
              is2FAEnabled={userInfo.is2FAEnabled ?? false}
              isEmailVerified={userInfo.isEmailVerified ?? false}
            />
          </div>
        )} */}
      </div>

      {/* <Button className="w-full" disabled={saveDisabled}>
        Guardar cambios
      </Button> */}
    </form>
  );
};
