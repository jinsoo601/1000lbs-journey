import { signOut, useSession } from "next-auth/react";
import Page from "@/components/page";

export default function Goals() {
  const { data: session } = useSession();
  return (
    <Page isProtected={true}>
      <p className="text-3xl">Show all GOALS from {session?.user?.email}</p>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
    </Page>
  );
}
