import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db, auth } from "../config/firebaseConfig";

const getUserId = () => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Usuario no autenticado");
  return uid;
};

export const getUserRole = async () => {
  const uid = getUserId();
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) {
    await setDoc(doc(db, "users", uid), {
      email: auth.currentUser?.email,
      role: "cliente",
      createdAt: new Date(),
    });
    return "cliente";
  }
  return snap.data().role || "cliente";
};

const mapSnapshot = (snapshot) =>
  snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

// Productos
export const createProduct = async (data) =>
  (await addDoc(collection(db, "tasks"), { ...data, createdAt: new Date() })).id;

export const getProducts = async () =>
  mapSnapshot(await getDocs(collection(db, "tasks")));

export const getProductById = async (id) => {
  const snap = await getDoc(doc(db, "tasks", id));
  return { id: snap.id, ...snap.data() };
};

export const updateProduct = (id, data) =>
  updateDoc(doc(db, "tasks", id), data);

export const deleteProduct = (id) => deleteDoc(doc(db, "tasks", id));

// Carrito
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
  mapSnapshot(await getDocs(collection(db, "carrito")));

export const updateCartItem = (id, cantidad) =>
  updateDoc(doc(db, "carrito", id), { cantidad });

export const deleteCartItem = (id) => deleteDoc(doc(db, "carrito", id));

// Consultas
export const registerConsultaPersonalizada = async (mensaje) => {
  const now = new Date();
  const fechaHora = `${now.getDate().toString().padStart(2,"0")}/${(now.getMonth()+1).toString().padStart(2,"0")}/${now.getFullYear()} - ${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`;
  return (await addDoc(collection(db, "consultas"), {
    userId: getUserId(),
    email: auth.currentUser?.email,
    mensaje,
    date: fechaHora,
    createdAt: now,
  })).id;
};