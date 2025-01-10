import React from 'react';

import SwapDisplay from './swap-display';



import type { SolanaTradeArgumentsType } from '@/ai';
import LogInButton from '@/app/(app)/_components/log-in-button';
import { useAppKitAccount } from '@reown/appkit/react';

interface SwapCallBodyProps {
    toolCallId: string;
    args: SolanaTradeArgumentsType;
}

const SwapCallBody = ({ toolCallId, args }: SwapCallBodyProps) => {
    

      const { address } =
        useAppKitAccount();

    return (
        <div>
            {
                address ? (
                    <SwapDisplay toolCallId={toolCallId} args={args} userPublicKey={address} />
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-sm text-muted-foreground">Connect your wallet to swap tokens</p>
                        <LogInButton />
                    </div>
                )
            }
        </div>
    );
};

export default SwapCallBody; 