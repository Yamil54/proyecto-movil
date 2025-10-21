import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { createTask, getTaskById, updateTask } from "../src/services/firestoreService";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Form({ route, navigation }) {
  const [title, setTitle] = useState("");
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
          setDate(task.date);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Este campo es obligatorio";
    if (!date.trim()) newErrors.date = "Este campo es obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    const data = { title, date };
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
    <View style={styles.container}>
      <Input
        label="Título"
        value={title}
        onChangeText={setTitle}
        placeholder="Ej: Comprar pan"
        error={errors.title}
      />
      <Input
        label="Fecha"
        value={date}
        onChangeText={setDate}
        placeholder="Ej: 2025-10-17"
        error={errors.date}
      />
      <Button title={id ? "Actualizar" : "Guardar"} onPress={handleSubmit} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 }
});