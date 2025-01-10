import React from 'react';

import LogInButton from '@/app/(app)/_components/log-in-button';

import UnstakeDisplay from './unstake-display';


import type { UnstakeArgumentsType } from '@/ai';
import { useAppKitAccount } from '@reown/appkit/react';

interface UnstakeCallBodyProps {
    toolCallId: string;
    args: UnstakeArgumentsType;
}

const UnstakeCallBody = ({ toolCallId, args }: UnstakeCallBodyProps) => {

      const { address } =
        useAppKitAccount();

    return (
        <div>
            {
                address ? (
                    <UnstakeDisplay toolCallId={toolCallId} args={args} userPublicKey={address} />
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-sm text-muted-foreground">Connect your wallet to unstake</p>
                        <LogInButton />
                    </div>
                )
            }
        </div>
    );
};

export default UnstakeCallBody; 