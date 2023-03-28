import withAuth from "@hoc/withAuth";
import { PageLayout } from "@layouts/PageLayout";
import { useStore } from "@utils/store";
import Link from "next/link";
import React from "react";

const ViewAds = () => {
  const { adAccount } = useStore();

  return (
    <PageLayout title="Ad Manager" isAdPage>
      <Link href="/ad/create">CREATE AD</Link>
    </PageLayout>
  );
};

export default withAuth(ViewAds, false, "", true);
