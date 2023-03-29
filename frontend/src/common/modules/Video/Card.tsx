import Link from "next/link";
import React from "react";
import { Video, VideoProps } from "types/video";

type Props = {} & VideoProps;

const VideoCard: React.FC<Props> = ({
  id,
  title,
  thumbnailUrl,
  channelName,
  profileImage,
  views,
}) => {
  return (
    <Link href={`/video/${id.toNumber()}`} className="grid gap-2">
      <img className="w-full rounded-lg" src={thumbnailUrl} alt={title} />

      <div className="flex gap-4">
        <img
          src={profileImage}
          className="w-10 h-10 rounded-full flex-shrink-0"
          alt={channelName}
        />

        <div className="grid">
          <h4 className="line-clamp-2">{title}</h4>
          <Link
            href={`/channel/@${channelName}`}
            className="text-base font-semibold hover:underline"
          >
            {channelName}
          </Link>

          <p>{views.length}</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
