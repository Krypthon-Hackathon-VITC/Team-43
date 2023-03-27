import Link from "next/link";
import React from "react";
import { Video } from "types/video";

type Props = {} & Video;

const VideoCard: React.FC<Props> = ({ id, title, thumbnailUrl }) => {
  return (
    <Link href={`/video/${id.toNumber()}`} className="grid gap-2">
      <img className="w-full rounded-lg" src={thumbnailUrl} alt={title} />

      <div className="grid">
        <h4 className="line-clamp-2">{title}</h4>
      </div>
    </Link>
  );
};

export default VideoCard;
