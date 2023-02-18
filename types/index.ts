export type TJournal = {
  id: string;
  date: string; // date string mm/dd/yyyy
  workouts: TWorkout[];
};

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
  id: string;
  until: string; // date string mm/dd/yyyy
  label: string;
  benchPress: TSet;
  deadlift: TSet;
  squat: TSet;
};
