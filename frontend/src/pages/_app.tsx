import "@styles/globals.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import type { AppProps } from "next/app";
import { ThirdwebProvider, useAddress } from "@thirdweb-dev/react";
import { Toaster } from "react-hot-toast";
import "primeicons/primeicons.css";
import useContractRead from "@hooks/useContractRead";
import { useEffect, useState } from "react";
import { useStore } from "@utils/store";
import LoadingPage from "@components/LoadingPage";
import { ConnectWalletPrompt } from "@components/ConnectWalletPage";

const PageComponent = ({ Component, pageProps }: AppProps) => {
  const { setMyProfile } = useStore();
  const address = useAddress();

  const [isLoading, setIsLoading] = useState(true);

  const { data } = useContractRead("getUserProfile", address);

  async function setMyProfileFunc() {
    setMyProfile({ ...data }, () => setIsLoading(false));
  }

  useEffect(() => {
    if (data) setMyProfileFunc();
  }, [data, address]);

  if (!address) return <ConnectWalletPrompt />;

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <Component {...pageProps} />

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default function App(pageProps: AppProps) {
  return (
    <ThirdwebProvider activeChain="mumbai">
      <PageComponent {...pageProps} />
    </ThirdwebProvider>
  );
}
