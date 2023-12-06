import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import PostEvent from "@/components/forms/PostEvent";
import { fetchUser } from "@/lib/actions/user.actions";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  const currentUserInfo = await fetchUser(user.id);

  console.log("currentUser", currentUserInfo.name);
  console.log("userInfo", userInfo.name);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
    return null;
  }

  return (
    <>
      <h1 className='head-text'>Create Event</h1>
      <PostEvent opponentId={userInfo._id} authorId ={currentUserInfo._id} />
    </>
  );
}

export default Page;