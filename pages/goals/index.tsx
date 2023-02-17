import { useEffect, useState } from "react";

import FloatingLinkButton from "@/components/floating-link-button";
import GoalCard from "@/components/goal-card";
import Page from "@/components/page";
import type { TGoal } from "@/types";
import { getGoals } from "@/db";

export default function Goals() {
  const [goals, setGoals] = useState<TGoal[]>([]);
  useEffect(() => {
    getGoals().then(setGoals);
  }, []);
  return (
    <Page isProtected={true}>
      <h2 className="text-xl my-8">My Goals</h2>
      <div className="overflow-auto">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
      <FloatingLinkButton href="/goals/new">+ New Goal</FloatingLinkButton>
    </Page>
  );
}
