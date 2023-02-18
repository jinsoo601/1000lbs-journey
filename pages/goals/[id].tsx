import { TGoal, TSet } from "@/types";
import { createNewGoal, getGoal, updateGoal } from "@/db";
import { useEffect, useState } from "react";

import FloatingButton from "@/components/floating-button";
import Page from "@/components/page";
import Set from "@/components/set";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

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
      <div className="flex mt-8 mb-4 justify-between">
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
      <div className="flex my-4 justify-between">
        <label className="text-lg" htmlFor="target-date">
          Target Date:
        </label>
        <input
          className="text-black"
          type="date"
          value={fromIntlFormat(until)}
          onChange={(e) => setUntil(toIntlFormat(e.target.value))}
          id="target-date"
        />
      </div>
      <div className="flex my-4 justify-between">
        <span className="text-lg">Deadlift</span>
        <Set set={deadlift} onChangeSet={setDeadlift} />
      </div>
      <div className="flex my-4 justify-between">
        <span className="text-lg">Squat</span>
        <Set set={squat} onChangeSet={setSquat} />
      </div>
      <div className="flex my-4 justify-between">
        <span className="text-lg">Bench Press</span>
        <Set set={benchPress} onChangeSet={setBenchPress} />
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
