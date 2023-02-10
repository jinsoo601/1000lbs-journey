import type { TSet } from "@/types";
import { useState } from "react";

const WEIGHT_OPTIONS = Array.from(
  { length: 200 },
  (_, index) => 2.5 * (index + 1)
);
const REPS_OPTIONS = Array.from({ length: 50 }, (_, index) => index + 1);

type Props = {
  set: TSet;
  onChangeSet: (set: TSet) => void;
};

export default function Set({ set, onChangeSet }: Props) {
  return (
    <div className="border-2 border-indigo-200 rounded-md p-1">
      <EditableNumber
        value={set.weight.value.toFixed(1)}
        setValue={(value) =>
          onChangeSet({ ...set, weight: { ...set.weight, value } })
        }
        options={WEIGHT_OPTIONS}
      />
      <em className="text-xs align-bottom ml-1">{set.weight.unit}</em>
      <span className="mx-1">×</span>
      <EditableNumber
        value={set.reps}
        setValue={(value) => onChangeSet({ ...set, reps: value })}
        options={REPS_OPTIONS}
      />
    </div>
  );
}

function EditableNumber({
  value,
  setValue,
  options,
}: {
  value: string | number;
  setValue: (n: number) => void;
  options: number[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        className="bg-indigo-200 font-semibold text-black px-1 rounded"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {value}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-0.5 no-scrollbar max-h-40 overflow-x-auto bg-indigo-200 font-semibold text-black divide-y divide-black">
          {options.map((option) => (
            <button
              className="block px-1 text-start w-full"
              key={option}
              onClick={() => {
                setValue(option);
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
