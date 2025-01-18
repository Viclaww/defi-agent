"use client"

import { Button } from '@/components/ui';
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from '@radix-ui/react-alert-dialog';
// Index.tsx
import {
  useNotifications,
  usePrepareRegistration,
  useRegister,
  useSubscribe,
  useSubscription,
  useUnsubscribe,
  useWeb3InboxAccount,
  useWeb3InboxClient
} from '@web3inbox/react'

import { useSignMessage, useAccount } from 'wagmi'


export default function Web3InboxAlertDialog() {
  // Wagmi Hooks
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()

  // W3I Hooks
  const { prepareRegistration } = usePrepareRegistration()
  const { register, isLoading: isRegistering } = useRegister()
  const { data: w3iClient, isLoading: w3iClientIsLoading } = useWeb3InboxClient()
  const { isRegistered } = useWeb3InboxAccount(`eip155:1:${address}`)

  // Registration of your address to allow notifications
  // This is done via a signature of a message (SIWE) and the
  // signMessageAsync function from wagmi
  const handleRegistration = async () => {
    try {
      const { message, registerParams } = await prepareRegistration()
      const signature = await signMessageAsync({ message: message })
      await register({ registerParams, signature })
    } catch (registerIdentityError: any) {
      console.error(registerIdentityError)
    }
  }

  // Subscription to dapp notifications
  // Subscribe can be called as a function post registration
  // Can be moved above but shown for example clarity
  const { subscribe, isLoading: isSubscribing } = useSubscribe()
  const { unsubscribe, isLoading: isUnsubscribing } = useUnsubscribe()
  const { data: subscription } = useSubscription()
  const isSubscribed = Boolean(subscription)

  // Note: We are using AppKit for the dapp <> wallet connection.
  // The <appkit-button /> module is from AppKit. Check AppKit Docs for further info.
  return (
    <>
      <AlertDialog open={false}>
        {w3iClientIsLoading ? (
          <AlertDialogTitle>Loading W3I Client</AlertDialogTitle>
        ) : (
          <div>
            <AlertDialogTitle>W3I QuickStart</AlertDialogTitle>

            <AlertDialogContent>
              <button onClick={handleRegistration} disabled={isRegistered}>
                {isRegistered ? "Registered" : "Register"}
              </button>
              <Button
              variant={"brand"}
                onClick={() => (isSubscribed ? unsubscribe() : subscribe())}
                disabled={isSubscribing || isUnsubscribing}
              >
                {isSubscribed ? "Unsubscribe" : "Subscribe"}
              </Button>
              <hr />
              {isSubscribed ? "Subscribed" : "not suscribed"}
            </AlertDialogContent>
          </div>
        )}
      </AlertDialog>
    </>
  );
}