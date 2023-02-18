import { TGoal, TJournal, TWorkout } from "@/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const createNewJournal = (userId: string, workouts: TWorkout[]) => {
  const newJournal = {
    userId,
    date: Intl.DateTimeFormat("en").format(),
    workouts,
  };
  return addDoc(collection(db, "journals"), newJournal);
};

export const getJournals = async (userId: string): Promise<TJournal[]> => {
  const collectionRef = collection(db, "journals");
  const querySnapshot = await getDocs(
    query(collectionRef, where("userId", "==", userId))
  );
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    date: doc.data().date,
    workouts: doc.data().workouts,
  }));
};

export const getJournal = async (id: string): Promise<TJournal | undefined> => {
  const docRef = doc(db, "journals", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      date: data.date,
      workouts: data.workouts,
    };
  } else {
    return undefined;
  }
};

export const updateJournal = (id: string, workouts: TWorkout[]) => {
  const docRef = doc(db, "journals", id);
  return updateDoc(docRef, {
    workouts,
  });
};

export const deleteJournal = (id: string) => {
  return deleteDoc(doc(db, "journals", id));
};

export const createNewGoal = (userId: string, goal: Omit<TGoal, "id">) => {
  return addDoc(collection(db, "goals"), { ...goal, userId });
};

export const getGoals = async (userId: string): Promise<TGoal[]> => {
  const collectionRef = collection(db, "goals");
  const querySnapshot = await getDocs(
    query(collectionRef, where("userId", "==", userId))
  );
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    until: doc.data().until,
    label: doc.data().label,
    benchPress: doc.data().benchPress,
    deadlift: doc.data().deadlift,
    squat: doc.data().squat,
  }));
};

export const getGoal = async (id: string): Promise<TGoal | undefined> => {
  const docRef = doc(db, "goals", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      until: data.until,
      label: data.label,
      deadlift: data.deadlift,
      squat: data.squat,
      benchPress: data.benchPress,
    };
  } else {
    return undefined;
  }
};

export const updateGoal = (id: string, goal: Omit<TGoal, "id">) => {
  const docRef = doc(db, "goals", id);
  return setDoc(docRef, goal);
};

export const deleteGoal = (id: string) => {
  return deleteDoc(doc(db, "goals", id));
};
