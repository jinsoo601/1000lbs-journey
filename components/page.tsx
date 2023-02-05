import { useSession } from "next-auth/react";
import React from "react";
import Head from "./head";

type Props = {
  children: React.ReactNode;
  isProtected?: boolean;
  title?: string;
};

export default function Page({
  children,
  isProtected = false,
  title = "1000LBS Journey",
}: Props) {
  useSession({ required: isProtected });
  return (
    <>
      <Head title={title} />
      <main>{children}</main>
    </>
  );
}
