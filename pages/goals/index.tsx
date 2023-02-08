import FloatingButton from "@/components/floating-button";
import Page from "@/components/page";
import { useSession } from "next-auth/react";

export default function Goals() {
  const { data: session } = useSession();
  return (
    <Page isProtected={true}>
      <p className="text-3xl">Show all GOALS from {session?.user?.email}</p>
      <FloatingButton href="/goals/new">+ New Goal</FloatingButton>
    </Page>
  );
}
