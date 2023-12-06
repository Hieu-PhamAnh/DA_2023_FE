import ViewEvent from "@/components/forms/ViewEvent";
import { fetchEventById } from "@/lib/actions/event.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const event = await fetchEventById(params.id);

  // Assuming you have access to authorId and opponentId in your event data
  const { authorId, opponentId } = event;

  // Assuming you have access to currentUserId from your user data
  const currentUserId = userInfo._id;
  const currentUserName= userInfo.name
  return (
    <>
      <h1 className="head-text">Join Team</h1>

      <ViewEvent
        eventId={event.id}
        currentUserId={currentUserId}
        authorId={authorId}
        opponentId={opponentId}
        team1={event.team1.name}
        team2={event.team2.name}
        currentUserName={currentUserName}
      />
    </>
  );
};

export default Page;
