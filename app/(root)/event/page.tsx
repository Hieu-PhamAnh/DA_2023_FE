import { redirect } from "next/navigation";
import { fetchUser, fetchUserEvents } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import EventCard from "@/components/cards/EventCard";

import Pagination from "@/components/shared/Pagination";
import { fetchEvents } from "@/lib/actions/event.actions";
import EventUserCard from "@/components/cards/EventUserCard";

interface Event {
    _id: string;
    title: string;
    time: Date;
    location: string;
    description: string;
    author: {
      name: string;
      image: string;
      id: string;
    };
    opponent: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    approve: boolean;
  }
  
  interface Props {
    currentUserId: string;
    accountId: string;
    authorId: string;
    opponentId: string;
    accountType: string;
  }
async function Event({ currentUserId, accountId,opponentId, authorId, accountType }: Props) {
  let events: Event[];

  const searchParams = {}; 

  try {
    const { events: fetchedEvents, isNext } = await fetchEvents(
        searchParams.page ? +searchParams.page : 1,
        5
      );
      
      events = fetchedEvents;
      

    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) {
      redirect("/onboarding");
    }

    console.log(userInfo.id)

    events.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });

    return (
      <>
        <h1 className="head-text text-left my-4">Event</h1>

        {events.map((event) => (
          <EventUserCard
            key={event._id}
            id={event._id}
            currentUserId={currentUserId}
            title={event.title}
            location={event.location}
            time={new Date(event.time).toString()}
            description={event.description}
            author={
              event.author
                ? { name: event.author.name, image: event.author.image, id: event.author.id }
                : { name: userInfo.name, image: userInfo.image, id: userInfo.id }
            }
            opponent={
              event.opponent
                ? { name: event.opponent.name, image: event.opponent.image, id: event.opponent.id }
                : { name: userInfo.name, image: userInfo.image, id: userInfo.id }
            }
            community={
              accountType === "Community"
                ? { name: userInfo.name, id: userInfo.id, image: userInfo.image }
                : event.community
            }
            createdAt={event.createdAt}
            approve={event.approve}
          />
        ))}

        <Pagination
          path="/"
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </>
    );
  } catch (error) {
    redirect("/error");
    return null;
  }
}

export default Event;
