import { useEffect, useState } from "react";

import FloatingLinkButton from "@/components/floating-link-button";
import JournalCard from "@/components/journal-card";
import Page from "@/components/page";
import type { TJournal } from "@/types";
import { getJournals } from "@/db";
import { useSession } from "next-auth/react";

export default function Journals() {
  const { data: session } = useSession();
  const [journals, setJournals] = useState<TJournal[]>([]);
  useEffect(() => {
    // @ts-ignore
    const userId: string | undefined = session?.user?.id;
    if (userId) {
      getJournals(userId).then(setJournals);
    }
  }, [session?.user]);
  return (
    <Page isProtected={true}>
      <h2 className="text-xl my-6">My Journals</h2>
      <div className="overflow-auto">
        {journals.map((journal) => (
          <JournalCard key={journal.id} journal={journal} />
        ))}
      </div>
      <FloatingLinkButton href="/journals/new">
        + New Journal
      </FloatingLinkButton>
    </Page>
  );
}
