import { Connection, VersionedTransaction } from "@solana/web3.js";

import { type Provider } from "@reown/appkit-adapter-solana/react";
import { useAppKitAccount, useAppKitProvider} from "@reown/appkit/react";
export const useSendTransaction = () => {



    const sendTransaction = async (transaction :VersionedTransaction) => {
        const {address} = useAppKitAccount() 
    
         const { walletProvider,  } = useAppKitProvider<Provider>("solana");
        if(!address) throw new Error("No wallets found");

        const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!);

        return walletProvider.sendTransaction(transaction, connection, {
            skipPreflight: true,
        });
    }

    return {
        sendTransaction
    }
}