import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import getAllUsers from "@/lib/getAllUsers";
import { Suspense } from "react";
import UserPosts from "./components/UserPosts";
import type { Metadata } from "next/types";
import { notFound } from 'next/navigation'

type Params = {
  params: {
    userId: string;
  };
};

// Dynamic Metadata
export async function generateMetadata({
  params: { userId },
}: Params): Promise<Metadata> {
  const userData: Promise<User> = getUser(userId);
  const user: User = await userData;

  if (!user) {
    return {
      title: "User Not Found",
    };
  }

  return {
    title: user.name,
    description: `This is th page of ${user.name}`,
  };
}

// Dynamic Path
export default async function UserPage({ params: { userId } }: Params) {
  const userData: Promise<User> = getUser(userId);
  const userPostsData: Promise<Post[]> = getUserPosts(userId);

  // Parallel Fetching
  //const [user, userPosts] = await Promise.all([userData, userPostsData]);

  const user = await userData;

  if (!user) return notFound()

  return (
    <>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading ...</h2>}>
        {/* @ts-expect-error Async Server Component */}
        <UserPosts promise={userPostsData} />
      </Suspense>
    </>
  );
} // Generate Static Paths we know the params in advance for SSG...
export async function generateStaticParams() {
  const userData: Promise<User[]> = getAllUsers();
  const users = await userData;

  return users.map((user) => {
    return {
      params: {
        userId: user.id.toString(),
      },
    };
  });
}
