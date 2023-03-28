import useContractRead from "@hooks/useContractRead";
import { PageLayout } from "@layouts/PageLayout";
import AdContainer from "@modules/Ad/Container";
import React from "react";

const AllAds = () => {
  const { data, isLoading } = useContractRead(
    "getAllAdVideos",
    null,
    "blocktubeAds"
  );

  console.log({ data });

  return (
    <PageLayout title="" isAdPage>
      <AdContainer isLoading={isLoading} ads={data} />
    </PageLayout>
  );
};

export default AllAds;
