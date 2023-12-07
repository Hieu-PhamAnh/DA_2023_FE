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
    Crossing: userInfo?.Crossing || "",
    Finishing: userInfo?.Finishing || "",
    Heading: userInfo?.Heading || "",
    ShortPass: userInfo?.ShortPass || "",
    Freekick: userInfo?.Freekick || "",
    LongPass: userInfo?.LongPass || "",
    BallControl: userInfo?.BallControl || "",
    Intercept: userInfo?.Intercept || "",
    Positioning: userInfo?.Positioning || "",
    Marking: userInfo?.Marking || "",
    Tackle: userInfo?.Tackle || "",
    GKReflexes: userInfo?.GKReflexes || "",
    Height: userInfo?.Height || "",
    Weight: userInfo?.Weight || "",
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
