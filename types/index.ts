export type TWorkout = {
  name: string;
  sets: TSet[];
};

export type TSet = {
  weight: TWeight;
  reps: number;
};

export type TWeight = {
  value: number;
  unit: "lbs" | "kg";
};

export type TGoal = {
  until: string; // date string
  label: string;
  benchPress: TSet;
  deadlift: TSet;
  squat: TSet;
};
