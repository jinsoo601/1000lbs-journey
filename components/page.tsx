import Head from "./head";
import { Raleway } from "@next/font/google";
import React from "react";
import { useSession } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  isProtected?: boolean;
  title?: string;
};

const font = Raleway({ subsets: ["latin"] });

export default function Page({
  children,
  isProtected = false,
  title = "1000LBS Journey",
}: Props) {
  useSession({ required: isProtected });
  return (
    <>
      <Head title={title} />
      <main className={`${font.className} text-indigo-200 bg-black h-screen`}>
        {children}
      </main>
    </>
  );
}
