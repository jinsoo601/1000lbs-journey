import Set from "./set";
import { TGoal } from "@/types";
import { useRouter } from "next/router";

type Props = {
  goal: TGoal;
};

const DOTS = new Array(100).fill(".").join(" ");

export default function GoalCard({ goal }: Props) {
  const router = useRouter();
  return (
    <div
      className="border-2 border-indigo-200 p-4 mt-4"
      onClick={() =>
        router.push(
          {
            pathname: `/goals/${goal.id}`,
            query: { goal: JSON.stringify(goal) },
          },
          `/goals/${goal.id}`
        )
      }
      role="button"
    >
      <p className="text-lg text-center">
        {goal.label}
        <span className="text-sm ml-2">(by {goal.until})</span>
      </p>
      <div className="flex items-center justify-center mt-2">
        <span className="w-1/2 overflow-hidden whitespace-nowrap">
          Deadlift {DOTS}
        </span>
        <Set set={goal.deadlift} noBorder />
      </div>
      <div className="flex items-center justify-center mt-2">
        <span className="w-1/2 overflow-hidden whitespace-nowrap">
          Squat {DOTS}
        </span>
        <Set set={goal.squat} noBorder />
      </div>
      <div className="flex items-end justify-center mt-2">
        <span className="w-1/2 overflow-hidden whitespace-nowrap">
          Bench Press {DOTS}
        </span>
        <Set set={goal.benchPress} noBorder />
      </div>
    </div>
  );
}
