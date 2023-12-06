"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface Props {
  id: string;
  _id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

function UserCard({ _id, id, name, username, imgUrl, personType }: Props) {
  const router = useRouter();
  const handleCreateEvent = () => {
    router.push(`/create-event/${id}`);
  };
  console.log(_id)
  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <div className="relative h-12 w-12">
          <Image src={imgUrl} alt="user_logo" fill className="rounded-full object-cover" />
        </div>

        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>

      <Button
        className="user-card_btn"
        onClick={() =>
          router.push(personType === "User" ? `/profile/${id}` : `/communities/${id}`)
        }
      >
        View
      </Button>

      <Button className="user-card_btn" onClick={handleCreateEvent}>
        Create Event
      </Button>
    </article>
  );
}

export default UserCard;
