"use client";

import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

import { useQueryState } from "nuqs";

import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  query: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ query: q, ...props }, ref) => {
    const [query, setQuery] = useQueryState(q, {
      clearOnDefault: true,
      throttleMs: 1000,
      shallow: false,
    });

    return (
      <Input
        type="search"
        role="search"
        ref={ref}
        defaultValue={query ?? ""}
        onChange={(e) => setQuery(e.target.value)}
        {...props}
      />
    );
  },
);
SearchInput.displayName = "SearchInput";

export { Input, SearchInput };
