import SubscribeButton from "@components/elements/SubscribeButton";
import LoadingPage from "@components/LoadingPage";
import useContractRead from "@hooks/useContractRead";
import { useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import { Button } from "primereact/button";
import React from "react";
import { User } from "types/user";
import { Video } from "types/video";
import {
  Player,
  ControlBar,
  BigPlayButton,
  ReplayControl,
  ForwardControl,
} from "video-react";
import "video-react/dist/video-react.css";

type Props = {
  isLoading: boolean;
};

const VideoPage: React.FC<Props & Video> = ({
  title,
  thumbnailUrl,
  videoUrl,
  description,
  dislikes,
  likes,
  owner,
  views,
  isLoading,
  id,
}) => {
  const address = useAddress();

  const { data, isLoading: isUserProfileLoading } = useContractRead(
    "getUserProfile",
    owner
  );

  if (isLoading) return <LoadingPage className="!h-full flex-1" size="small" />;

  if (isUserProfileLoading || !data)
    return <LoadingPage className="!h-full flex-1" size="small" />;

  const user = data as User;

  const isUserProfile =
    address?.toLowerCase() === user?.walletId?.toLowerCase();

  return (
    <div className="w-full grid place-items-center">
      <div className="bg-black w-full grid place-items-center">
        <div className="w-full 2xl:w-[60%]">
          <Player poster={thumbnailUrl} src={videoUrl} aspectRatio="16:9">
            <BigPlayButton className="!hidden" />

            <ControlBar>
              <ReplayControl seconds={5} />
              <ForwardControl seconds={5} />
            </ControlBar>
          </Player>
        </div>
      </div>

      <div className="w-full 3xl:w-[60%] grid xl:grid-cols-2 gap-4 p-2 md:py-4">
        <div className="grid gap-4">
          <h1 className="text-[28px]">{title}</h1>

          <div className="flex gap-4 items-start">
            <img
              src={user.profileImage}
              className="w-12 h-12 border rounded-full flex-shrink-0"
              alt={user.channelName}
            />

            <div className="w-full flex gap-10">
              <Link href={`/channel/@${user.channelName}`}>
                <h5 className="-mb-1">{user.channelName}</h5>
                <span className="font-semibold text-gray-400">
                  {user.subscribers.length} subscribers
                </span>
              </Link>

              <SubscribeButton
                videoId={id.toString()}
                subscribers={user.subscribers}
                severity="danger"
                className="!rounded-full"
                disabled={isUserProfile}
              />
            </div>

            <div className="p-buttonset flex h-10">
              <Button
                severity="secondary"
                icon="pi pi-thumbs-up-fill"
                className="space-x-2 !border-r !border-black"
                tooltip="Like"
                tooltipOptions={{
                  position: "bottom",
                }}
              >
                <span>{likes.length}</span>
              </Button>

              <Button
                severity="secondary"
                icon="pi pi-thumbs-down-fill"
                className="!border-l !border-black"
                tooltip="Dislike"
                tooltipOptions={{
                  position: "bottom",
                }}
              />
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default VideoPage;
