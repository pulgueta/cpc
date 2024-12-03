import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:top-4 [&>svg]:left-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 bg-red-100 text-destructive dark:border-destructive dark:bg-rose-950 dark:text-red-100 [&>svg]:text-destructive dark:[&>svg]:text-red-100",
        info: "border-[hsl(221,91%,91%)] bg-[hsl(208,100%,97%)] text-[hsl(210,92%,45%)] dark:border-[hsl(223,100%,12%)] dark:bg-[hsl(215,100%,6%)] dark:text-[hsl(216,87%,65%)] [&>svg]:text-[hsl(210,92%,45%)] dark:[&>svg]:text-[hsl(216,87%,65%)]",
        success:
          "border-green-400/50 bg-green-100 text-green-600 dark:border-green-400 dark:bg-green-600 dark:text-background [&>svg]:text-green-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = "Alert";

const AlertTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  ),
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
  ),
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
