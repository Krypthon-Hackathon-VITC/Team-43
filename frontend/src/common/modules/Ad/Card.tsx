import Link from "next/link";
import React from "react";
import { AdVideo } from "types/ad";

type Props = {} & AdVideo;

const AdCard: React.FC<Props> = ({
  id,
  title,
  bidAmount,
  category,
  videoUrl,
  websiteLink,
  owner,
}) => {
  return (
    <div className="grid gap-2">
      <video className="rounded-md" controls>
        <source src={videoUrl} />
      </video>

      <div className="grid gap-2">
        <h4 className="line-clamp-2">{title} asdas da sd as das d</h4>

        <p className="text-sm font-bold text-gray-500 truncate">{owner}</p>

        <Link href={websiteLink} className="hover:underline">
          Visit <i className="pi pi-external-link ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default AdCard;
