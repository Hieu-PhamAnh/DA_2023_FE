"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { deleteEvent } from "@/lib/actions/event.actions";

interface Props {
  eventId: string;
  currentUserId: string;
  authorId: string;
  opponentId: string;
}

function DeleteEvent({
  eventId,
  currentUserId,
  authorId,
  opponentId,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  if (currentUserId !== authorId && currentUserId !== opponentId) return null;

  const handleClick = async () => {
    await deleteEvent(JSON.parse(eventId), pathname);
  };
  return (
    <Image
      src="/assets/delete.svg"
      alt="delete"
      width={18}
      height={18}
      className="cursor-pointer object-contain"
      onClick={handleClick}
    />
  );
}

export default DeleteEvent;
