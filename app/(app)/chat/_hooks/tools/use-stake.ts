"use client"

import { useState } from "react";

import { VersionedTransaction } from "@solana/web3.js";


import { useChat } from "../../_contexts/chat";

import { useNativeBalance, useStakeData, useTokenAccounts, useTokenDataByAddress } from "@/hooks";

import type { StakeArgumentsType } from "@/ai";
import { useSendTransaction } from "@/hooks/reown";
import { useAppKitAccount } from "@reown/appkit/react";

export const useStake = (toolCallId: string, args: StakeArgumentsType, userPublicKey: string) => {

    const { addToolResult } = useChat();

   const { address } =
        useAppKitAccount();

    const [isStaking, setIsStaking] = useState(false);

    const { sendTransaction } = useSendTransaction();

    const { data: stakeData, isLoading: stakeDataLoading } = useStakeData({
      inputAmount: args.amount,
      slippageBps: 300,
      userPublicKey,
      contractAddress: args.contractAddress,
    });

    const { data: inputTokenData, isLoading: inputTokenDataLoading } = useTokenDataByAddress("So11111111111111111111111111111111111111112");
    const { data: outputTokenData, isLoading: outputTokenDataLoading } = useTokenDataByAddress(args.contractAddress);

    const { mutate: mutateNativeBalance } = useNativeBalance(userPublicKey);
    const { mutate: mutateTokenAccounts } = useTokenAccounts(userPublicKey);

    const onStake = async () => {

        if (!address) return;

        setIsStaking(true);

        try {
            // Deserialize the transaction
            const swapTransactionBuf = Buffer.from(stakeData.swapTransaction, "base64");
            const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

            const tx = await sendTransaction(transaction);
        
            addToolResult(toolCallId, {
                message: `Successfully staked ${args.amount} SOL for ${outputTokenData!.symbol}.`,
                body: {
                    transaction: tx,
                    inputAmount: args.amount,
                    symbol: outputTokenData!.symbol,
                }
            });

            mutateNativeBalance();
            mutateTokenAccounts();

        } catch (error) {
            addToolResult(toolCallId, {
                message: `Error executing stake: ${error}`,
            });
        }

        setIsStaking(false);
    }

    const onCancel = () => {
        addToolResult(toolCallId, {
            message: `Cancelled stake`,
        });
    }

    return {
        onStake,
        isStaking,
        stakeData,
        inputTokenData,
        outputTokenData,
        inputTokenDataLoading,
        outputTokenDataLoading,
        stakeDataLoading,
        onCancel,
    }
}