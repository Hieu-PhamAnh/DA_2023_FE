import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";
// export const runtime = 'edge';
async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
    position: userInfo?.Crossing || "Không cần",
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
    Weight: userInfo?.Weighi || "",
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <section className="mt-9 bg-dark-2 p-10">
        <h1 className="head-text">Welcome to SocialSport</h1>
        <p className="mt-3 text-base-regular text-light-2 my-5">
          Complete your profile now to use SocialSport
        </p>

        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

export default Page;
