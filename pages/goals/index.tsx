import { useEffect, useState } from "react";

import FloatingLinkButton from "@/components/floating-link-button";
import GoalCard from "@/components/goal-card";
import Page from "@/components/page";
import type { TGoal } from "@/types";
import { getGoals } from "@/db";
import { useSession } from "next-auth/react";

export default function Goals() {
  const { data: session } = useSession();
  const [goals, setGoals] = useState<TGoal[]>([]);
  useEffect(() => {
    // @ts-ignore
    const userId: string | undefined = session?.user?.id;
    if (userId) {
      getGoals(userId).then(setGoals);
    }
  }, [session?.user]);
  return (
    <Page isProtected={true}>
      <h2 className="text-xl my-6">My Goals</h2>
      <div className="overflow-auto">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
      <FloatingLinkButton href="/goals/new">+ New Goal</FloatingLinkButton>
    </Page>
  );
}
