import { Connection, GetProgramAccountsFilter } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

const rpcEndpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_URL!;
const solanaConnection = new Connection(rpcEndpoint);

const walletToQuery = "YOUR_PUBLIC_KEY"; //example: vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg

 export async function getTokenAccounts(wallet: string) {
  const filters: GetProgramAccountsFilter[] = [
    {
      dataSize: 165, //size of account (bytes)
    },
    {
      memcmp: {
        offset: 32, //location of our query in the account (bytes)
        bytes: wallet, //our search criteria, a base58 encoded string
      },
    },
  ];
  const accounts = await solanaConnection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID, //new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
    { filters: filters }
  );
  console.log(
    `Found ${accounts.length} token account(s) for wallet ${wallet}.`
  );
const mapAccounts = accounts.map((account, i) => {
    //Parse the account data
    const parsedAccountInfo: any = account.account.data;
    const mintAddress: string = parsedAccountInfo["parsed"]["info"]["mint"];
    const tokenBalance: number =
      parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
    // //Log results
    // console.log(`Token Account No. ${i + 1}: ${account.pubkey.toString()}`);
    // console.log(`--Token Mint: ${mintAddress}`);
    // console.log(`--Token Balance: ${tokenBalance}`);
    return {...account, mint: mintAddress}
  });
  return mapAccounts
}
getTokenAccounts(walletToQuery);
