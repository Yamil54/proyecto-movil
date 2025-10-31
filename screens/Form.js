import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Alert } from "react-native";
import { createTask, getTaskById, updateTask } from "../src/services/firestoreService";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Form({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [cantidad, setCantidad] = useState(""); // 👈 nuevo estado
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { id } = route.params || {};

  useEffect(() => {
    if (id) {
      setLoading(true);
      getTaskById(id)
        .then(task => {
          setTitle(task.title);
          setCantidad(task.cantidad?.toString() || ""); // 👈 cargar cantidad si existe
          setDate(task.date);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Este campo es obligatorio";
    if (!cantidad.trim()) newErrors.cantidad = "Este campo es obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
  if (!validate()) return;
  setLoading(true);

  // Generar fecha/hora actual en formato DD/MM/YYYY - HH:mm
  const now = new Date();
  const fechaHora = `${now.getDate().toString().padStart(2, "0")}/${
    (now.getMonth() + 1).toString().padStart(2, "0")
  }/${now.getFullYear()} - ${
    now.getHours().toString().padStart(2, "0")
  }:${now.getMinutes().toString().padStart(2, "0")}`;

  const data = {
    title,
    cantidad: parseInt(cantidad, 10),
    date: id ? date : fechaHora, // 👈 si es nuevo, usa la fecha formateada
  };

  try {
    if (id) {
      await updateTask(id, data);
    } else {
      await createTask(data);
    }
    navigation.goBack();
  } catch (error) {
    Alert.alert("Error", error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <Input
        label="Título"
        value={title}
        onChangeText={setTitle}
        placeholder="Ej: Comprar pan"
        error={errors.title}
      />
      <Input
        label="Cantidad"
        value={cantidad}
        onChangeText={setCantidad}
        placeholder="Ej: 5"
        keyboardType="numeric"
        error={errors.cantidad}
      />
      <Button title={id ? "Actualizar" : "Guardar"} onPress={handleSubmit} loading={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40, backgroundColor: "#F7FBFF" },
});