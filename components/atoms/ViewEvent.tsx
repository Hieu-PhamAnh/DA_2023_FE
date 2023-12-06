
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  eventId: string;
  currentUserId: string;
  authorId: string;
  opponentId: string;
}

const ViewEvent = ({ eventId, currentUserId, authorId, opponentId }: Props) => {

  return (
    <Link href={`/view-event/${JSON.parse(eventId)}`}>
      <div className="cursor-pointer">
        <Image
          src="/assets/view.svg"
          alt="edit event"
          width={18}
          height={18}
          className="object-contain"
        />
      </div>
    </Link>
  );
};

export default ViewEvent;
