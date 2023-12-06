import { redirect } from "next/navigation";
import { fetchUser, fetchUserEvents } from "@/lib/actions/user.actions";
import EventCard from "../cards/EventCard";
import { currentUser } from "@clerk/nextjs";

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
  accountType: string;
}

async function EventTab({ currentUserId, accountId, accountType }: Props) {
  let events: Event[];

  if (accountType === "User") {
    const userEvents = await fetchUserEvents(accountId);
    if (!userEvents) {
      redirect("/");
    }
    events = userEvents.events;
  } else {
    const user = await fetchUser(accountId);
    if (!user) {
      redirect("/");
    }
    events = user.events;
  }

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  events.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section className="mt-9 flex flex-col gap-10">
      {events.map((event) => (
        <EventCard
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
    </section>
  );
}

export default EventTab;
