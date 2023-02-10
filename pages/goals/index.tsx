import FloatingLinkButton from "@/components/floating-link-button";
import Page from "@/components/page";
import { useSession } from "next-auth/react";

export default function Goals() {
  const { data: session } = useSession();
  return (
    <Page isProtected={true}>
      <p className="text-3xl">Show all GOALS from {session?.user?.email}</p>
      <FloatingLinkButton href="/goals/new">+ New Goal</FloatingLinkButton>
    </Page>
  );
}
