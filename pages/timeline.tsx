import type { GetServerSideProps } from "next/types";

import { getServerSession } from "next-auth/next";
import { useSession, signOut } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import { Session } from "next-auth";

export default function Timeline() {
  const { data: session, status } = useSession();
  console.log(session, status);
  return (
    <main>
      This is timeline. You must be signed in to see this page.{" "}
      {session?.user?.email}
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{
  session: Session;
}> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
