"use client";

import type { FC, PropsWithChildren } from "react";
import { useEffect, useState } from "react";

import { usePathname, useSearchParams } from "next/navigation";

import posthogClient from "posthog-js";
import type { PostHog } from "posthog-js";
import { PostHogProvider as Provider, usePostHog } from "posthog-js/react";

import { env } from "@/env/client";

export const PostHogProvider: FC<PropsWithChildren> = ({ children }) => {
  const [client] = useState<PostHog | undefined>(() =>
    process.env.NODE_ENV === "production"
      ? posthogClient.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
          api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
          person_profiles: "always",
          capture_pageleave: true,
          capture_pageview: false,
          capture_heatmaps: true,
          enable_heatmaps: true,
        })
      : undefined,
  );

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const posthog = usePostHog();

  useEffect(() => {
    if (pathname && posthog) {
      let url = `${window.origin}${pathname}`;

      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }

      posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams, posthog]);

  return <Provider client={client}>{children}</Provider>;
};
