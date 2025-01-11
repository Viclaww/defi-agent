import useSWR from "swr";

import type { Chat } from "@/db/types";
import { useAppKitAccount } from "@reown/appkit/react";

export const useUserChats = () => {
 
     const {  isConnected, address } =
       useAppKitAccount();

    const { data, isLoading, error, mutate } = useSWR<Chat[]>(
       ` /api/chats?userId=${address}`,
        async (route: string) => {
        
            if (!isConnected) {
                throw new Error("Not authenticated");
            }

            return fetch(route, {
                cache: "no-cache",
                
            }).then(res => res.json());
        },
    );

    return {
        chats: data ?? [],
        isLoading,
        error,
        mutate
    }
};