import type { GetServerSideProps } from "next/types";
import Page from "@/components/page";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default function Home() {
  return (
    <Page>
      <h1 className="text-2xl">Welcome to 1000lbs journey!</h1>
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/journals",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
