import { ConnectWalletPrompt } from "@components/ConnectWalletPage";
import { useAddress } from "@thirdweb-dev/react";
import React from "react";
import { useStore } from "@utils/store";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const withAuth = (
  Component: React.FC,
  checkCreator = false,
  message = "You need CREATOR account to upload video"
) =>
  function PageProp({ ...pageProps }) {
    const address = useAddress();
    const { isCreator, user } = useStore();
    const router = useRouter();

    if (router.isReady && checkCreator && !isCreator && address) {
      router.replace("/creator");
      toast.error(message);
    }

    if (!!address) return <Component {...pageProps} />;
    else return <ConnectWalletPrompt />;
  };

withAuth.displayName = "withAuth";
export default withAuth;
