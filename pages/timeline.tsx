import { signOut, useSession } from "next-auth/react";
import Page from "@/components/page";

export default function Timeline() {
  const { data: session } = useSession();
  return (
    <Page isProtected={true}>
      This is timeline. You must be signed in to see this page.{" "}
      {session?.user?.email}
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
    </Page>
  );
}
