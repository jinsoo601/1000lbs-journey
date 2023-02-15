import { TJournal, TSet, TWorkout } from "@/types";
import { getJournal, updateJournal } from "@/db";
import { useCallback, useEffect, useState } from "react";

import Button from "@/components/button";
import FloatingButton from "@/components/floating-button";
import NewWorkoutModal from "@/components/new-workout-modal";
import Page from "@/components/page";
import Set from "@/components/Set";
import { useRouter } from "next/router";

const NEW_SET: TSet = { weight: { value: 135, unit: "lbs" }, reps: 10 };

export default function Journal() {
  const router = useRouter();
  const [date, setDate] = useState<string>("");
  const [workouts, setWorkouts] = useState<TWorkout[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkoutIndex, setNewWorkoutIndex] = useState(0);
  useEffect(() => {
    try {
      const journal: TJournal = JSON.parse(router.query.journal as string);
      setWorkouts(journal.workouts);
      setDate(journal.date);
    } catch (e) {
      if (typeof router.query.id === "string") {
        getJournal(router.query.id).then((journal) => {
          setWorkouts(journal?.workouts ?? []);
          setDate(journal?.date ?? "");
        });
      }
    }
  }, [router.query.id, router.query.journal]);
  const onModalSubmit = useCallback(
    (name: string) => {
      if (newWorkoutIndex === workouts.length) {
        setWorkouts((prev) => [...prev, { name, sets: [NEW_SET] }]);
      } else {
        setWorkouts((prev) =>
          prev.map((workout, index) =>
            index === newWorkoutIndex ? { ...workout, name } : { ...workout }
          )
        );
      }
    },
    [workouts.length, newWorkoutIndex]
  );
  const onAddSet = (workoutToUpdateIndex: number) => {
    setWorkouts((prev) =>
      prev.map((workout, index) => {
        if (index === workoutToUpdateIndex) {
          return { ...workout, sets: [...workout.sets, NEW_SET] };
        }
        return { ...workout };
      })
    );
  };
  const onChangeSet = (set: TSet, setIndex: number, workoutIndex: number) => {
    setWorkouts((prev) =>
      prev.map((workout, index) => {
        if (index === workoutIndex) {
          const newSets = [
            ...workout.sets.slice(0, setIndex),
            set,
            ...workout.sets.slice(setIndex + 1),
          ];
          return { ...workout, sets: newSets };
        }
        return { ...workout };
      })
    );
  };
  const onSave = () => {
    updateJournal(router.query.id as string, workouts)
      .then(() => {
        router.push("/journals");
      })
      .catch(() => {
        alert("Save failed!");
      });
  };
  return (
    <Page isProtected={true}>
      <h2 className="text-xl my-8">{date}</h2>
      <div className="divide-y">
        {workouts.map(({ name, sets }, workoutIndex) => (
          <div key={`workout-${workoutIndex}`} className="p-2">
            <Button
              className="py-0 mb-2 text-lg"
              onClick={() => {
                setNewWorkoutIndex(workoutIndex);
                setIsModalOpen(true);
              }}
            >
              {name}
              <span className="text-xs ml-1">(✎)</span>
            </Button>
            <div className="flex gap-2 flex-wrap">
              {sets.map((set, setIndex) => (
                <Set
                  key={setIndex}
                  set={set}
                  onChangeSet={(set) =>
                    onChangeSet(set, setIndex, workoutIndex)
                  }
                />
              ))}
              <Button
                className="py-0 px-3 text-4xl leading-6"
                onClick={() => onAddSet(workoutIndex)}
              >
                +
              </Button>
            </div>
          </div>
        ))}
        <div className="p-2">
          <Button
            onClick={() => {
              setNewWorkoutIndex(workouts.length);
              setIsModalOpen(true);
            }}
          >
            Add move
          </Button>
        </div>
      </div>
      <FloatingButton onClick={onSave} isDisabled={workouts.length === 0}>
        Save
      </FloatingButton>
      <NewWorkoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onModalSubmit}
      />
    </Page>
  );
}