import React, { useEffect } from 'react'

import LoginButton from '@/app/(app)/_components/log-in-button';

import ToolCard from '../tool-card';


import { useChat } from '@/app/(app)/chat/_contexts/chat';

import type { ToolInvocation } from 'ai';
import type { GetWalletAddressResultType } from '@/ai';
import { useAppKitAccount } from '@reown/appkit/react';


interface Props {
    tool: ToolInvocation
}

const GetWalletAddress: React.FC<Props> = ({ tool }) => {

    return (
        <ToolCard 
            tool={tool}
            icon="Wallet"
            agentName="Wallet Agent"
            loadingText={`Getting Wallet Address...`}   
            resultHeading={() => `Fetched Wallet Address`}
            resultBody={(result: GetWalletAddressResultType) => result.body 
                ? `${result.body.address}` 
                :  "No wallet address found"}
            callBody={(toolCallId: string) => <GetWalletAddressAction toolCallId={toolCallId} />}
        />
    )
}

const GetWalletAddressAction = ({ toolCallId }: { toolCallId: string }) => {

    const { addToolResult } = useChat();

    const { address } = useAppKitAccount()

    useEffect(() => {
        if(address) {
            addToolResult(toolCallId, {
                message: "Wallet connected",
                body: {
                    address: address
                }
            });
        }
    }, [address]);

    const onComplete = () => {
        if (!address) return;
        addToolResult(toolCallId, {
            message: "Wallet connected",
            body: {
                address: address
            }
        });
    }

    return (
        <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground">Connect your wallet to proceed</p>
            <LoginButton onComplete={onComplete} />
        </div>
    )
}

export default GetWalletAddress;