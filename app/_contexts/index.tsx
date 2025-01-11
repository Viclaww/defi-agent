"use client";

import { Analytics } from "@vercel/analytics/react";

import { ColorModeProvider } from "./color-mode";
import { PostHogProvider } from "./posthog";
import ReownProvider from "./reown";

interface Props {
  children: React.ReactNode;
  cookies?: string | null;
}

const Providers: React.FC<Props> = ({ children, cookies }) => {
  return (
    <PostHogProvider>
        <ReownProvider cookies={cookies}>
          <ColorModeProvider>
            <Analytics />
            {children}
          </ColorModeProvider>
        </ReownProvider>
    </PostHogProvider>
  );
};

export default Providers;

export * from "./color-mode";
