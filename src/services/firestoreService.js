import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../config/firebaseConfig";

// 🔧 Helper para obtener userId
const getUserId = () => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Usuario no autenticado");
  return uid;
};

// 🔧 Helper para mapear snapshot
const mapSnapshot = (snapshot) =>
  snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

// =======================
// 📦 CRUD de Productos (tasks)
// =======================
export const createTask = async (data) =>
  (await addDoc(collection(db, "tasks"), { ...data, userId: getUserId(), createdAt: new Date() })).id;

export const getTasks = async () =>
  mapSnapshot(await getDocs(query(collection(db, "tasks"), where("userId", "==", getUserId()))));

export const getTaskById = async (id) => {
  const snap = await getDoc(doc(db, "tasks", id));
  return { id: snap.id, ...snap.data() };
};

export const updateTask = (id, data) => updateDoc(doc(db, "tasks", id), data);

export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

// =======================
// 🛒 Carrito
// =======================
export const addToCart = async (producto, cantidad = 1) =>
  (await addDoc(collection(db, "carrito"), {
    userId: getUserId(),
    productoId: producto.id,
    nombre: producto.title,
    precio: producto.precio,
    cantidad,
    createdAt: new Date(),
  })).id;

export const getCartItems = async () =>
  mapSnapshot(await getDocs(query(collection(db, "carrito"), where("userId", "==", getUserId()))));

export const updateCartItem = (id, cantidad) =>
  updateDoc(doc(db, "carrito", id), { cantidad });

export const deleteCartItem = (id) => deleteDoc(doc(db, "carrito", id));

// =======================
// 📝 Consultas personalizadas
// =======================
export const registerConsultaPersonalizada = async (mensaje) => {
  const now = new Date();
  const fechaHora = `${now.getDate().toString().padStart(2, "0")}/${
    (now.getMonth() + 1).toString().padStart(2, "0")
  }/${now.getFullYear()} - ${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return (
    await addDoc(collection(db, "consultas"), {
      userId: getUserId(),
      email: auth.currentUser?.email,
      mensaje,
      date: fechaHora,
      createdAt: now,
    })
  ).id;
};