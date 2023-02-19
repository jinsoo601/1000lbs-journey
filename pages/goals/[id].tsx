import { TGoal, TSet } from "@/types";
import { createNewGoal, getGoal, updateGoal } from "@/db";
import { useEffect, useState } from "react";

import FloatingButton from "@/components/floating-button";
import Page from "@/components/page";
import Set from "@/components/set";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const DOTS = new Array(100).fill(".").join(" ");

export default function Goal() {
  const router = useRouter();
  const { data: session } = useSession();
  const [label, setLabel] = useState("");
  const [until, setUntil] = useState("");
  const [deadlift, setDeadlift] = useState<TSet>({
    weight: { value: 135, unit: "lbs" },
    reps: 1,
  });
  const [squat, setSquat] = useState<TSet>({
    weight: { value: 135, unit: "lbs" },
    reps: 1,
  });
  const [benchPress, setBenchPress] = useState<TSet>({
    weight: { value: 135, unit: "lbs" },
    reps: 1,
  });

  useEffect(() => {
    if (router.query.id === "new") {
      // init for new goal
    } else {
      try {
        const goal: TGoal = JSON.parse(router.query.goal as string);
        setLabel(goal.label);
        setUntil(goal.until);
        setDeadlift(goal.deadlift);
        setSquat(goal.squat);
        setBenchPress(goal.benchPress);
      } catch (e) {
        if (typeof router.query.id === "string") {
          getGoal(router.query.id).then((goal) => {
            if (goal) {
              setLabel(goal.label);
              setUntil(goal.until);
              setDeadlift(goal.deadlift);
              setSquat(goal.squat);
              setBenchPress(goal.benchPress);
            }
          });
        }
      }
    }
  }, [router.query.id, router.query.goal]);

  const onSave = () => {
    if (router.query.id === "new") {
      // @ts-ignore
      const userId: string = session?.user?.id;
      createNewGoal(userId, {
        label,
        until,
        deadlift,
        squat,
        benchPress,
      })
        .then(() => {
          router.push("/goals");
        })
        .catch(() => {
          alert("Save failed!");
        });
    } else {
      updateGoal(router.query.id as string, {
        label,
        until,
        deadlift,
        squat,
        benchPress,
      })
        .then(() => {
          router.push("/goals");
        })
        .catch(() => {
          alert("Save failed!");
        });
    }
  };

  return (
    <Page isProtected={true}>
      <div className="flex my-6 justify-between">
        <label className="text-lg" htmlFor="name-of-the-goal">
          Name of the goal:
        </label>
        <input
          className="text-black"
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          id="name-of-the-goal"
        />
      </div>
      <div className="flex my-6 justify-between">
        <label className="text-lg" htmlFor="target-date">
          Target Date:
        </label>
        <input
          className="text-black border-2 border-indigo-200"
          type="date"
          value={fromIntlFormat(until)}
          onChange={(e) => setUntil(toIntlFormat(e.target.value))}
          id="target-date"
        />
      </div>
      <div className="flex my-6 justify-between items-end">
        <span className="text-lg overflow-hidden whitespace-nowrap">
          Deadlift {DOTS}
        </span>
        <Set set={deadlift} onChangeSet={setDeadlift} noBorder />
      </div>
      <div className="flex my-6 justify-between items-end">
        <span className="text-lg overflow-hidden whitespace-nowrap">
          Squat {DOTS}
        </span>
        <Set set={squat} onChangeSet={setSquat} noBorder />
      </div>
      <div className="flex my-6 justify-between items-end">
        <span className="text-lg overflow-hidden whitespace-nowrap">
          Bench Press {DOTS}
        </span>
        <Set set={benchPress} onChangeSet={setBenchPress} noBorder />
      </div>
      <FloatingButton
        onClick={onSave}
        isDisabled={label.length === 0 || until.length === 0}
      >
        Save
      </FloatingButton>
    </Page>
  );
}

/**
 * @param dateStr format for input[type="date"] which is yyyy-mm-dd
 * @returns Intl.DateTimeFormat("en") mm/dd/yyyy
 */
function toIntlFormat(dateStr: string): string {
  const regex = /^\d\d\d\d-\d\d-\d\d$/g;
  if (regex.test(dateStr)) {
    const parts = dateStr.split("-");
    return `${parts[1]}/${parts[2]}/${parts[0]}`;
  } else {
    return "";
  }
}

/**
 * @param dateStr in Intl.DateTimeFormat("en") mm/dd/yyyy
 * @returns format for input[type="date"] which is yyyy-mm-dd
 */
function fromIntlFormat(dateStr: string): string {
  const regex = /^\d\d\/\d\d\/\d\d\d\d$/g;
  if (regex.test(dateStr)) {
    const parts = dateStr.split("/");
    return `${parts[2]}-${parts[0]}-${parts[1]}`;
  } else {
    return "";
  }
}
