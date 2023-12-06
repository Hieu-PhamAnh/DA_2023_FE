"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { approveEvent } from "@/lib/actions/event.actions";

interface Props {
  eventId: string;
  currentUserId: string;
  authorId: string;
  opponentId: string;
}

function ApproveEvent({
  eventId,
  currentUserId,
  authorId,
  opponentId,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  if (currentUserId !== opponentId ) return null;

  const handleClick = async () => {
    await approveEvent(JSON.parse(eventId), pathname);
  };

 
  return (
    <Image
      src="/assets/approve.svg"
      alt="approve"
      width={18}
      height={18}
      className="cursor-pointer object-contain"
      onClick={handleClick}
    />
  ); 
}

export default ApproveEvent;
