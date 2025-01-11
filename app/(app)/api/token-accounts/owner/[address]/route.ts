import { NextResponse } from 'next/server';

import { getTokenDataByAddress } from '@/lib/solana';
import { getTokenAccounts } from '@/lib/solana/getBalances';
import { PublicKey } from '@solana/web3.js';

export const GET = async (request: Request, { params }: { params: Promise<{ address: string }> }) => {
    try {
        const { address } = await params;
    
        const tokenAccounts = await getTokenAccounts((new PublicKey(address)).toString());
        console.log(tokenAccounts)
        const tokenDatas = await Promise.all(tokenAccounts.map(async (tokenAccount) => {
            return getTokenDataByAddress(tokenAccount.mint);
        }));

        return NextResponse.json(tokenAccounts.map((tokenAccount, index) => {
            return {
                ...tokenAccount,
                token_data: tokenDatas[index]
            };
        }));
    } catch (error) {
        console.error('Error fetching token accounts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch token accounts' },
            { status: 500 }
        );
    }
}