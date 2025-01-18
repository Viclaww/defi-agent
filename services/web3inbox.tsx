import { initWeb3InboxClient } from "@web3inbox/react";

// The project ID and domain you setup in the Domain Setup section
const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!;
const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN!;

initWeb3InboxClient({
  projectId,
  domain: appDomain,
  allApps: process.env.NODE_ENV !== "production",
});

console.log("Web3Inbox client initialized");