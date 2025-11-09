// screens/Form.js
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Alert } from "react-native";
import { createTask, getTaskById, updateTask } from "../src/services/firestoreService";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Formulario({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const id = route.params?.id;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getTaskById(id)
      .then(task => {
        if (task) {
          setTitle(task.title || "");
          setCantidad(task.cantidad ? String(task.cantidad) : "");
          setPrecio(task.precio ? String(task.precio) : "");
          setDate(task.date || "");
        }
      })
      .catch(e => Alert.alert("Error", e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = "Obligatorio";
    if (!cantidad.trim()) errs.cantidad = "Obligatorio";
    if (!precio.trim()) errs.precio = "Obligatorio";
    setErrors(errs);
    return !Object.keys(errs).length;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    const now = new Date();
    const fechaHora = `${now.getDate().toString().padStart(2,"0")}/${(now.getMonth()+1)
      .toString().padStart(2,"0")}/${now.getFullYear()} - ${now.getHours()
      .toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`;

    const data = {
      title: title.trim(),
      cantidad: parseInt(cantidad, 10) || 0,
      precio: parseFloat(precio) || 0,
      date: id ? date : fechaHora,
    };

    try {
      id ? await updateTask(id, data) : await createTask(data);
      navigation.goBack();
    } catch (e) {
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input label="Título" value={title} onChangeText={setTitle} placeholder="Ej: Comprar pan" error={errors.title} />
      <Input label="Cantidad" value={cantidad} onChangeText={setCantidad} placeholder="Ej: 5" keyboardType="numeric" error={errors.cantidad} />
      <Input label="Precio" value={precio} onChangeText={setPrecio} placeholder="Ej: 120.50" keyboardType="numeric" error={errors.precio} />
      <Button title={id ? "Actualizar" : "Guardar"} onPress={handleSubmit} loading={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40, backgroundColor: "#F7FBFF" },
});