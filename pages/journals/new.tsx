import type { TSet, TWorkout } from "@/types";
import { useCallback, useState } from "react";

import Button from "@/components/button";
import FloatingButton from "@/components/floating-button";
import Page from "@/components/page";
import Set from "@/components/Set";

const NEW_SET: TSet = { weight: { value: 135, unit: "lbs" }, reps: 10 };

export default function NewJournal() {
  const [workouts, setWorkouts] = useState<TWorkout[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkoutIndex, setNewWorkoutIndex] = useState(0);
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
  return (
    <Page isProtected={true}>
      <h2 className="text-xl my-8">{Intl.DateTimeFormat("en").format()}</h2>
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
      <FloatingButton onClick={() => {}}>Save</FloatingButton>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onModalSubmit}
      />
    </Page>
  );
}

function Modal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (workoutName: string) => void;
}) {
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const closeAndCleanUp = () => {
    onClose();
    setSelectedWorkout("");
  };
  return isOpen ? (
    <>
      <div
        className="fixed w-screen h-screen left-0 top-0 backdrop-blur-sm"
        onClick={closeAndCleanUp}
      />
      <div className="fixed w-64 h-80 left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] border-2 border-indigo-200 p-4 flex flex-col justify-between bg-black">
        <header className="flex justify-between items-start">
          <h3 className="text-lg">Select move</h3>
          <button className="text-3xl leading-4" onClick={closeAndCleanUp}>
            ×
          </button>
        </header>
        <div className="flex flex-col gap-1">
          {["Deadlift", "Bench Press", "Squat"].map((name) => (
            <Button
              key={name}
              className={`border-2 border-indigo-200 ${
                selectedWorkout !== name && "bg-black text-indigo-200"
              }`}
              onClick={() => setSelectedWorkout(name)}
            >
              {name}
            </Button>
          ))}
        </div>
        <Button
          className={`self-end ${selectedWorkout.length === 0 && "opacity-50"}`}
          isDisabled={selectedWorkout.length === 0}
          onClick={() => {
            onSubmit(selectedWorkout);
            closeAndCleanUp();
          }}
        >
          Submit
        </Button>
      </div>
    </>
  ) : null;
}
