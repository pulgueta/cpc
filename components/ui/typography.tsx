import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingVariants = cva(
  "inline-flex scroll-m-20 items-center gap-x-2 text-balance tracking-tighter",
  {
    variants: {
      as: {
        h1: "text-3xl md:text-4xl lg:text-5xl",
        h2: "text-2xl md:text-3xl lg:text-4xl",
        h3: "text-xl md:text-2xl lg:text-3xl",
        h4: "text-lg md:text-xl lg:text-2xl",
      },
      weight: {
        black: "font-black",
        extraBold: "font-extrabold",
        bold: "font-bold",
        semibold: "font-semibold",
        normal: "font-normal",
        light: "font-light",
      },
      fontStyle: {
        italic: "italic",
        normal: "normal",
      },
    },
    defaultVariants: {
      weight: "bold",
      as: "h1",
      fontStyle: "normal",
    },
  },
);

interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  center?: boolean;
  muted?: boolean;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as, className, children, fontStyle, weight, center = false, muted = false, ...rest }, ref) => {
    const Comp = as || "h1";

    return (
      <Comp
        ref={ref}
        className={cn(headingVariants({ className, fontStyle, as, weight }), {
          "text-center": center,
          "text-muted-foreground": muted,
        })}
        {...rest}
      >
        {children}
      </Comp>
    );
  },
);

const paragraphVariants = cva("text-pretty font-medium", {
  variants: {
    variant: {
      sub1: "text-base",
      body: "text-lg leading-6",
      sm: "text-sm",
    },
    weight: {
      black: "font-black",
      extraBold: "font-extrabold",
      bold: "font-bold",
      semibold: "font-semibold",
      medium: "font-medium",
      normal: "font-normal",
      light: "font-light",
    },
    fontStyle: {
      italic: "italic",
      normal: "normal",
    },
    tracking: {
      tight: "tracking-tight",
      tighter: "tracking-tighter",
    },
  },
  defaultVariants: {
    variant: "sm",
    weight: "medium",
    fontStyle: "normal",
    tracking: "tight",
  },
});

export interface ParagraphProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {
  center?: boolean;
  muted?: boolean;
}

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ weight, variant, className, center = false, muted = false, ...props }, ref) => {
    return (
      <p
        className={cn(paragraphVariants({ className, variant, weight }), {
          "text-center": center,
          "text-muted-foreground": muted,
        })}
        ref={ref}
        {...props}
      />
    );
  },
);

Paragraph.displayName = "Paragraph";

export const Blockquote = forwardRef<HTMLQuoteElement, HTMLAttributes<HTMLQuoteElement>>(
  ({ className, ...props }, ref) => {
    return (
      <blockquote
        className={cn("text-pretty font-semibold text-xs", className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Blockquote.displayName = "Caption";
