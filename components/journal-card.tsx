import { TJournal } from "@/types";
import { useRouter } from "next/router";

type Props = {
  journal: TJournal;
};

export default function JournalCard({ journal }: Props) {
  const router = useRouter();
  return (
    <div
      className="truncate border-2 border-indigo-200 p-2 mt-4"
      onClick={() =>
        router.push(
          {
            pathname: `/journals/${journal.id}`,
            query: { journal: JSON.stringify(journal) },
          },
          `/journals/${journal.id}`
        )
      }
      role="button"
    >
      <span className="border-r-2 border-indigo-200 pr-2 mr-2">
        {journal.date}
      </span>
      <span>{journal.workouts.map(({ name }) => name).join(", ")}</span>
    </div>
  );
}
