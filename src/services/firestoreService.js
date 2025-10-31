import {collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc, query, where,} from "firebase/firestore";
import { db, auth } from "../config/firebaseConfig";

// Crear una nueva tarea
export const createTask = async (data) => {
  const userId = auth.currentUser?.uid;
  const docRef = await addDoc(collection(db, "tasks"), {
    ...data,
    userId,
    createdAt: new Date(),
  });
  return docRef.id;
};

// Obtener todas las tareas del usuario actual
export const getTasks = async () => {
  const userId = auth.currentUser?.uid;
  const q = query(collection(db, "tasks"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Obtener una tarea por ID
export const getTaskById = async (id) => {
  const docRef = doc(db, "tasks", id);
  const snapshot = await getDoc(docRef);
  return { id: snapshot.id, ...snapshot.data() };
};

// Actualizar una tarea
export const updateTask = async (id, data) => {
  const docRef = doc(db, "tasks", id);
  await updateDoc(docRef, data);
};

// Eliminar una tarea
export const deleteTask = async (id) => {
  const docRef = doc(db, "tasks", id);
  await deleteDoc(docRef);
};

// Registrar una consulta personalizada escrita por el usuario
export const registerConsultaPersonalizada = async (mensaje) => {
  const userId = auth.currentUser?.uid;
  const userEmail = auth.currentUser?.email;

  const now = new Date();
  const fechaHora = `${now.getDate().toString().padStart(2, "0")}/${
    (now.getMonth() + 1).toString().padStart(2, "0")
  }/${now.getFullYear()} - ${
    now.getHours().toString().padStart(2, "0")
  }:${now.getMinutes().toString().padStart(2, "0")}`;

  const docRef = await addDoc(collection(db, "consultas"), {
    userId,
    email: userEmail,
    mensaje,
    date: fechaHora,
    createdAt: now,
  });

  return docRef.id;
};