import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
    position: userInfo?.position || "",

    Potential: userInfo?.Potential || "",
    WeakFoot: userInfo?.WeakFoot || "",
    Skill: userInfo?.Skill || "",
    Crossing: userInfo?.Crossing || "",
    Finishing: userInfo?.Finishing || "",
    Heading: userInfo?.Heading || "",
    ShortPass: userInfo?.ShortPass || "",
    Volley: userInfo?.Volley || "",
    Dribbling: userInfo?.Dribbling || "",
    Curve: userInfo?.Curve || "",
    Freekick: userInfo?.Freekick || "",
    LongPass: userInfo?.LongPass || "",
    BallControl: userInfo?.BallControl || "",
    Acceleration: userInfo?.Acceleration || "",
    Speed: userInfo?.Speed || "",
    Agility: userInfo?.Agility || "",
    Reactions: userInfo?.Reactions || "",
    Balance: userInfo?.Balance || "",
    ShotPower: userInfo?.ShotPower || "",
    Stamina: userInfo?.Stamina || "",
    LongShots: userInfo?.LongShots || "",
    Aggression: userInfo?.Aggression || "",
    Intercept: userInfo?.Intercept || "",
    Positioning: userInfo?.Positioning || "",
    Vision: userInfo?.Vision || "",
    Penalties: userInfo?.Penalties || "",
    Composure: userInfo?.Composure || "",
    Tackle: userInfo?.Tackle || "",
    SlidingTackle: userInfo?.SlidingTackle || "",
    Height: userInfo?.Height || "",
    Weight: userInfo?.Weight || "",
    GKReflexes: userInfo?.GKReflexes || "",
  };

  return (
    <>
      <h1 className="head-text">Edit Profile</h1>
      <p className="mt-3 text-base-regular text-light-2">Make any changes</p>

      <section className="mt-12">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </>
  );
}

export default Page;
