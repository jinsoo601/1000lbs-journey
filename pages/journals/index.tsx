import FloatingButton from "@/components/floating-button";
import Page from "@/components/page";
import { useSession } from "next-auth/react";

export default function Journals() {
  const { data: session } = useSession();
  return (
    <Page isProtected={true}>
      <p>Show all journals from {session?.user?.email}</p>
      <FloatingButton href="/journals/new">+ New Journal</FloatingButton>
    </Page>
  );
}
