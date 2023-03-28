import withAuth from "@hoc/withAuth";
import useContractRead from "@hooks/useContractRead";
import { PageLayout } from "@layouts/PageLayout";
import AdContainer from "@modules/Ad/Container";
import { useAddress } from "@thirdweb-dev/react";
import React from "react";

const ViewAdsProfile = () => {
  const address = useAddress();

  const { data, isLoading } = useContractRead(
    "getAdVideosByAddress",
    address,
    "blocktubeAds"
  );

  console.log({ data });

  return (
    <PageLayout title="" isAdPage>
      <AdContainer isLoading={isLoading} ads={data} />
    </PageLayout>
  );
};

export default withAuth(ViewAdsProfile, false, "", true);
