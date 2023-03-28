import SubscribeButton from "@components/elements/SubscribeButton";
import LoadingPage from "@components/LoadingPage";
import useContractRead from "@hooks/useContractRead";
import useContractWrite from "@hooks/useContractWrite";
import { useAddress } from "@thirdweb-dev/react";
import clsx from "clsx";
import Link from "next/link";
import { Button } from "primereact/button";
import React, { useState } from "react";
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
  const [showDescription, setShowDescription] = useState(false);

  const { data, isLoading: isUserProfileLoading } = useContractRead(
    "getUserProfile",
    owner
  );

  const { mutateAsync: addLikes } = useContractWrite("addLikes");

  if (isLoading) return <LoadingPage className="!h-full flex-1" size="small" />;

  if (isUserProfileLoading || !data)
    return <LoadingPage className="!h-full flex-1" size="small" />;

  const user = data as User;

  const isUserProfile =
    address?.toLowerCase() === user?.walletId?.toLowerCase();

  const isUserLikedTheVideo = likes.some((e) => e === address);
  console.log({ isUserLikedTheVideo });

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

      <div className="w-full 3xl:w-[60%] grid xl:grid-cols-2 gap-4 p-4 sm:py-4">
        <div className="grid gap-4">
          <h1 className="text-xl md:text-[28px]">{title}</h1>

          <div className="flex gap-4 flex-col md:flex-row items-start">
            <div className="w-full flex gap-4 items-start">
              <img
                src={user.profileImage}
                className="w-14 h-14 rounded-full flex-shrink-0"
                alt={user.channelName}
              />

              <div className="w-full flex justify-between md:justify-start gap-10">
                <Link href={`/channel/@${user.channelName}`}>
                  <h5 className="-mb-1">{user.channelName}</h5>
                  <span className="font-semibold text-gray-400">
                    {user.subscribers.length} subscribers
                  </span>
                </Link>

                {!isUserProfile && (
                  <SubscribeButton
                    videoId={id.toString()}
                    subscribers={user.subscribers}
                    severity="danger"
                    className="!rounded-full"
                    disabled={isUserProfile}
                  />
                )}
              </div>
            </div>

            <div className="p-buttonset flex h-10 rounded-full overflow-hidden">
              <Button
                severity="secondary"
                icon="pi pi-thumbs-up-fill"
                className="space-x-2 !border-r !border-black"
                tooltip="Like"
                disabled={isUserLikedTheVideo}
                tooltipOptions={{
                  position: "bottom",
                }}
                onClick={async () => {
                  await addLikes([id.toString()]);
                }}
              >
                <span>{likes.length}</span>
              </Button>

              <Button
                severity="secondary"
                icon="pi pi-thumbs-down-fill"
                className="!border-l text-lg !border-black"
                tooltip="Dislike"
                disabled={isUserLikedTheVideo}
                tooltipOptions={{
                  position: "bottom",
                }}
              />
            </div>
          </div>

          <p
            onClick={(e) => setShowDescription(!showDescription)}
            className={clsx(
              "whitespace-pre-line",
              !showDescription && "line-clamp-1 cursor-pointer"
            )}
          >
            {description}
          </p>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default VideoPage;
