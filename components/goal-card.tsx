import Set from "./set";
import { TGoal } from "@/types";
import { useRouter } from "next/router";

type Props = {
  goal: TGoal;
};

export default function GoalCard({ goal }: Props) {
  const router = useRouter();
  return (
    <div
      className="border-2 border-indigo-200 p-2 mt-4"
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
      <p className="text-xl">{`${goal.label} (by ${goal.until})`}</p>
      <div className="flex items-center">
        <span className="text-lg">Deadlift: </span>
        <Set set={goal.deadlift} onChangeSet={() => {}} />
      </div>
      <div className="flex items-center">
        <span className="text-lg">Squat: </span>
        <Set set={goal.squat} onChangeSet={() => {}} />
      </div>
      <div className="flex items-center">
        <span className="text-lg">Bench Press: </span>
        <Set set={goal.benchPress} onChangeSet={() => {}} />
      </div>
    </div>
  );
}
