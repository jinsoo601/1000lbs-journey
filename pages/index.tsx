import type { GetServerSideProps } from "next/types";

import { getServerSession } from "next-auth/next";
import { signIn, useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import Page from "@/components/page";

export default function Home() {
  return (
    <Page>
      <h1 className="text-2xl">Welcome to 1000lbs journey!</h1>
      <p>Sign in to start your journey.</p>
      <button onClick={() => signIn(undefined, { callbackUrl: "/timeline" })}>
        Sign in
      </button>
    </Page>
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
