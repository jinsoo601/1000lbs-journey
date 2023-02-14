import { useEffect, useState } from "react";

import FloatingLinkButton from "@/components/floating-link-button";
import JournalCard from "@/components/journal-card";
import Page from "@/components/page";
import type { TJournal } from "@/types";
import { getJournals } from "@/db";

export default function Journals() {
  const [journals, setJournals] = useState<TJournal[]>([]);
  useEffect(() => {
    getJournals().then((journals) => setJournals(journals));
  }, []);
  return (
    <Page isProtected={true}>
      <h2 className="text-xl my-8">My Journals</h2>
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
