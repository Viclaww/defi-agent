'use client'

import React from 'react'

import { useLogin, usePrivy } from '@privy-io/react-auth';
import { Button } from '@/components/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';

const LoginButton: React.FC = () => {

    const router = useRouter();

    const { authenticated } = usePrivy();
      const { open, close } = useAppKit();
        const {
          address,
          isConnected,
          caipAddress,
          status,
          embeddedWalletInfo,
        } = useAppKitAccount();

    const { login } = useLogin({
        onComplete: (_, __, wasAlreadyAuthenticated) => {
            if (!wasAlreadyAuthenticated) {
                router.replace('/chat');
            }
        }
    });

    if (isConnected) return (
        <Link href="/chat">
            <Button variant={'brand'}>
                Get Started
            </Button>
        </Link>
    );

    return (
        <Button
            variant={'brand'}
            onClick={() => open()}
            disabled={isConnected}
        >
            Login
        </Button>
    )
}

export default LoginButton;