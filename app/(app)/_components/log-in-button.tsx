"use client";

import React, { useEffect } from "react";

import { Button } from "@/components/ui";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useAppKitWallet } from "@reown/appkit-wallet-button/react";

interface Props {
  onComplete?: () => void;
}

const LogInButton: React.FC<Props> = ({ onComplete }) => {
  const { open } = useAppKit();
  const { isReady, connect } = useAppKitWallet();
  const { isConnected } = useAppKitAccount();

  useEffect(() => {
    if (isReady) {
    onComplete &&  onComplete();
    }
  }, [isReady, onComplete]);
  return (
    <Button
      variant="brand"
      onClick={() => {
        if (isConnected) {
          connect("phantom");
        } else {
          open();
        }
      }}
      className="w-full"
    >
      Connect Wallet
    </Button>
  );
};

export default LogInButton;
