import type { GetServerSideProps } from "next/types";

import { getServerSession } from "next-auth/next";
import { signIn, useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session, status);
  return (
    <main>
      <h1 className="text-2xl">Welcome to 1000lbs journey!</h1>
      <p>Sign in to start your journey.</p>
      <button onClick={() => signIn(undefined, { callbackUrl: "/timeline" })}>
        Sign in
      </button>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/timeline",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
