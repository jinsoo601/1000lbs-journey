import { useEffect, useState } from "react";

import FloatingLinkButton from "@/components/floating-link-button";
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
      {journals.map((journal) => (
        <div key={journal.id}>{journal.date}</div>
      ))}
      <FloatingLinkButton href="/journals/new">
        + New Journal
      </FloatingLinkButton>
    </Page>
  );
}
