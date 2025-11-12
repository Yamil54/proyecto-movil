import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc, setDoc, query, where } from "firebase/firestore";
import { db, auth } from "../config/firebaseConfig";

const getUserId = () => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Usuario no autenticado");
  return uid;
};

export const getUserRole = async () => {
  const ref = doc(db, "users", getUserId());
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, { email: auth.currentUser?.email, role: "cliente", createdAt: new Date() });
    return "cliente";
  }
  return snap.data().role || "cliente";
};

const mapSnapshot = s => s.docs.map(d => ({ id: d.id, ...d.data() }));

// Productos
export const createProduct = async data =>
  (await addDoc(collection(db, "tasks"), { ...data, createdAt: new Date() })).id;

export const getProducts = async () => mapSnapshot(await getDocs(collection(db, "tasks")));

export const getProductById = async id => {
  const s = await getDoc(doc(db, "tasks", id));
  return { id: s.id, ...s.data() };
};

export const updateProduct = (id, data) => updateDoc(doc(db, "tasks", id), data);
export const deleteProduct = id => deleteDoc(doc(db, "tasks", id));

// Carrito (filtrado por usuario)
export const addToCart = async (p, cantidad = 1) =>
  (await addDoc(collection(db, "carrito"), {
    userId: getUserId(),
    productoId: p.id,
    nombre: p.title,
    precio: p.precio,
    cantidad,
    createdAt: new Date(),
  })).id;

export const getCartItems = async () =>
  mapSnapshot(await getDocs(query(collection(db, "carrito"), where("userId", "==", getUserId()))));

export const updateCartItem = (id, cantidad) => updateDoc(doc(db, "carrito", id), { cantidad });
export const deleteCartItem = id => deleteDoc(doc(db, "carrito", id));