import React from 'react';

import LoginButton from '@/app/(app)/_components/log-in-button';

import StakeDisplay from './stake-display';

import type { StakeArgumentsType } from '@/ai';
import { useAppKitAccount } from '@reown/appkit/react';


interface StakeCallBodyProps {
    toolCallId: string;
    args: StakeArgumentsType;
}

const StakeCallBody = ({ toolCallId, args }: StakeCallBodyProps) => {
    

      const { address } =
        useAppKitAccount();

    return (
        <div>
            {
                address ? (
                    <StakeDisplay toolCallId={toolCallId} args={args} userPublicKey={address} />
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-sm text-muted-foreground">Connect your wallet to stake tokens</p>
                        <LoginButton />
                    </div>
                )
            }
        </div>
    );
};

export default StakeCallBody; 