"use client";

import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";

import { Root, Indicator } from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...props }, ref) => (
    <Root
      ref={ref}
      className={cn(
        "peer size-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className,
      )}
      {...props}
    >
      <Indicator className={cn("flex items-center justify-center text-current")}>
        <Check className="size-4" />
      </Indicator>
    </Root>
  ),
);
Checkbox.displayName = Root.displayName;

export { Checkbox };
