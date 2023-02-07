import { signOut, useSession } from "next-auth/react";
import Page from "@/components/page";

export default function Journals() {
  const { data: session } = useSession();
  return (
    <Page isProtected={true}>
      <p>Show all journals from {session?.user?.email}</p>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
    </Page>
  );
}
