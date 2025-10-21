import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc, query, where } from "firebase/firestore";
import { db, auth } from "../config/firebaseConfig";

export const createTask = async (data) => {
  const userId = auth.currentUser?.uid;
  const docRef = await addDoc(collection(db, "tasks"), {
    ...data,
    userId,
    createdAt: new Date()
  });
  return docRef.id;
};

export const getTasks = async () => {
  const userId = auth.currentUser?.uid;
  const q = query(collection(db, "tasks"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getTaskById = async (id) => {
  const docRef = doc(db, "tasks", id);
  const snapshot = await getDoc(docRef);
  return { id: snapshot.id, ...snapshot.data() };
};

export const updateTask = async (id, data) => {
  const docRef = doc(db, "tasks", id);
  await updateDoc(docRef, data);
};

export const deleteTask = async (id) => {
  const docRef = doc(db, "tasks", id);
  await deleteDoc(docRef);
};