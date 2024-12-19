"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

import { Slot, Slottable } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import { Loader2Icon } from "lucide-react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button-variants";

interface IconProps {
  icon: ReactNode;
  iconPlacement: "left" | "right";
}

interface IconRefProps {
  icon?: never;
  iconPlacement?: undefined;
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  tooltip?: boolean;
  tooltipContent?: ReactNode;
  loading?: boolean;
}

export type ButtonIconProps = IconProps | IconRefProps;

const Button = forwardRef<HTMLButtonElement, ButtonProps & ButtonIconProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      icon,
      iconPlacement,
      children,
      rightIcon,
      leftIcon,
      tooltip = false,
      tooltipContent,
      loading = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return tooltip ? (
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Comp
              className={cn(buttonVariants({ variant, size, className }))}
              disabled={loading}
              aria-disabled={loading}
              ref={ref}
              {...props}
            >
              {loading ? (
                <Loader2Icon size={16} className="animate-spin" />
              ) : (
                <>
                  {rightIcon && (
                    <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
                      {rightIcon}
                    </div>
                  )}
                  {icon && iconPlacement === "left" && (
                    <div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-100 group-hover:pr-2 group-hover:opacity-100">
                      {icon}
                    </div>
                  )}

                  <Slottable>
                    {leftIcon && <span className="mr-2 inline-block">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className="ml-2 inline-block">{rightIcon}</span>}
                  </Slottable>
                  {icon && iconPlacement === "right" && (
                    <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
                      {icon}
                    </div>
                  )}
                </>
              )}
            </Comp>
          </TooltipTrigger>
          <TooltipContent>{tooltip && tooltipContent}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={loading}
        aria-disabled={loading}
        ref={ref}
        {...props}
      >
        {loading ? (
          <Loader2Icon size={16} className="animate-spin" />
        ) : (
          <>
            {rightIcon && (
              <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
                {rightIcon}
              </div>
            )}
            {icon && iconPlacement === "left" && (
              <div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-100 group-hover:pr-2 group-hover:opacity-100">
                {icon}
              </div>
            )}

            <Slottable>
              {leftIcon && <span className="mr-2 inline-block">{leftIcon}</span>}
              {children}
              {rightIcon && <span className="ml-2 inline-block">{rightIcon}</span>}
            </Slottable>
            {icon && iconPlacement === "right" && (
              <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
                {icon}
              </div>
            )}
          </>
        )}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
