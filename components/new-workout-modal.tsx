import Button from "./button";
import Modal from "./modal";
import { useState } from "react";

export default function NewWorkoutModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (workoutName: string) => void;
}) {
  const [selectedWorkoutName, setSelectedWorkoutName] = useState("");
  const closeAndCleanUp = () => {
    onClose();
    setSelectedWorkoutName("");
  };
  return isOpen ? (
    <Modal header="Select move" onClose={closeAndCleanUp}>
      <div className="flex flex-col gap-2">
        {["Deadlift", "Bench Press", "Squat", "Other shit"].map((name) => (
          <Button
            key={name}
            onClick={() => setSelectedWorkoutName(name)}
            isInverted={selectedWorkoutName !== name}
          >
            {name}
          </Button>
        ))}
      </div>
      <Button
        className={`self-end ${
          selectedWorkoutName.length === 0 && "opacity-50"
        }`}
        isDisabled={selectedWorkoutName.length === 0}
        onClick={() => {
          onSubmit(selectedWorkoutName);
          closeAndCleanUp();
        }}
      >
        Submit
      </Button>
    </Modal>
  ) : null;
}
