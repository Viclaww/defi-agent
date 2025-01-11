"use client"

import { useState } from "react";

import { VersionedTransaction } from "@solana/web3.js";


import { useChat } from "../../_contexts/chat";

import { useTokenDataByAddress, useUnstakeData } from "@/hooks";

import type { UnstakeArgumentsType } from "@/ai";
import { useSendTransaction } from "@/hooks/reown";
import { useAppKitAccount } from "@reown/appkit/react";

export const useUnstake = (toolCallId: string, args: UnstakeArgumentsType, userPublicKey: string) => {

    const { addToolResult } = useChat();


       const { address } =
            useAppKitAccount();

    const { sendTransaction } = useSendTransaction();

    const [isUnstaking, setIsUnstaking] = useState(false);

    const { data: unstakeData, isLoading: unstakeDataLoading } = useUnstakeData({
      inputAmount: args.amount,
      slippageBps: 500,
      userPublicKey,
      contractAddress: args.contractAddress,
    });


    const { data: inputTokenData, isLoading: inputTokenDataLoading } = useTokenDataByAddress(args.contractAddress);
    const { data: outputTokenData, isLoading: outputTokenDataLoading } = useTokenDataByAddress("So11111111111111111111111111111111111111112");

    const onUnstake = async () => {

        if (!address) return;

        setIsUnstaking(true);

        try {
            // Deserialize the transaction
            const unstakeTransactionBuf = Buffer.from(unstakeData.swapTransaction, "base64");
            const transaction = VersionedTransaction.deserialize(unstakeTransactionBuf);

            const tx = await sendTransaction(transaction);
        
            addToolResult(toolCallId, {
                message: `Successfully unstaked ${args.amount} ${inputTokenData!.symbol} for SOL.`,
                body: {
                    transaction: tx,
                    inputAmount: args.amount,
                    symbol: inputTokenData!.symbol,
                }
            });
        } catch (error) {
            console.error(error);
            addToolResult(toolCallId, {
                message: `Error executing stake: ${error}`,
            });
        }

        setIsUnstaking(false);
    }

    const onCancel = () => {
        addToolResult(toolCallId, {
            message: `Cancelled stake`,
        });
    }

    return {
        onUnstake,
        isUnstaking,
        unstakeData,
        inputTokenData,
        outputTokenData,
        inputTokenDataLoading,
        outputTokenDataLoading,
        unstakeDataLoading,
        onCancel,
    }
}