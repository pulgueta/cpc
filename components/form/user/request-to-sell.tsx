"use client";

import { useActionState, useId } from "react";

import Form from "next/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormErros } from "../form-alert-errors";
import { convertToSellerAction } from "@/actions/user/convert-to-seller";
import { useSession } from "@/lib/auth.client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const RequestToSell = () => {
  const [email, storeName, mainPhone, salesGoal] = [useId(), useId(), useId(), useId()];

  const [state, formAction, pending] = useActionState(convertToSellerAction, undefined);

  const { data: session, isPending } = useSession();

  const defaultValue = isPending ? "" : session?.user.id;
  const defaultEmail = isPending ? "" : (session?.user.email ?? state?.defaultValues?.email);

  return (
    <Form action={formAction} className="flex flex-col gap-4">
      <div className="space-y-1">
        <Label htmlFor={email}>Correo electrónico</Label>
        <Input
          type="email"
          name="email"
          id={email}
          autoFocus
          autoComplete="email"
          defaultValue={defaultEmail}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor={storeName}>Nombre de la tienda</Label>
        <Input
          name="storeName"
          id={storeName}
          defaultValue={state?.defaultValues?.storeName}
          autoComplete="organization"
          placeholder="Mi tienda"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor={mainPhone}>Teléfono de contacto de la tienda</Label>
        <Input
          name="mainContactPhone"
          id={mainPhone}
          defaultValue={state?.defaultValues?.mainContactPhone}
          type="tel"
          inputMode="tel"
          autoComplete="work tel"
          placeholder="3001234567"
        />
      </div>

      <div className="flex w-full flex-col gap-2.5">
        <Label htmlFor={mainPhone}>Documento de identidad del dueño</Label>

        <RadioGroup defaultValue="CC" name="documentType" className="flex gap-4">
          {["CC", "CE", "TI", "NIT"].map((document) => (
            <div className="flex flex-row items-center space-x-2" key={document}>
              <RadioGroupItem value={document} id={document} />
              <Label htmlFor={document}>{document}</Label>
            </div>
          ))}
        </RadioGroup>

        <Input
          name="document"
          id={mainPhone}
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="634222453"
          defaultValue={state?.defaultValues?.document}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor={salesGoal}>Meta mensual de ventas</Label>
        <Input
          name="salesGoal"
          id={salesGoal}
          defaultValue={state?.defaultValues?.salesGoal}
          type="number"
          placeholder="$50'000.000"
        />
        <span className="block text-muted-foreground text-sm">Sin puntos, comas o espacios</span>
      </div>

      <input name="ownerId" type="hidden" className="hidden" defaultValue={defaultValue} />

      <div>
        <FormErros error={state?.error} />
      </div>

      <Button loading={pending} className="mx-auto w-full max-w-xs">
        Empezar a vender
      </Button>
    </Form>
  );
};
