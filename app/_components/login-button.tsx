"use client";

import React from "react";

import { Button } from "@/components/ui";
import Link from "next/link";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

const LoginButton: React.FC = () => {
  const { open } = useAppKit();
  
  const { isConnected } = useAppKitAccount();

  if (isConnected)
    return (
      <Link href="/chat">
        <Button variant={"brand"}>Get Started</Button>
      </Link>
    );

  return (
    <Button variant={"brand"} onClick={() => open()} disabled={isConnected}>
      Login
    </Button>
  );
};

export default LoginButton;
