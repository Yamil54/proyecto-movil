import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { getTaskById, deleteTask } from "../src/services/firestoreService";

export default function Detail({ route, navigation }) {
  const { id } = route.params;
  const [task, setTask] = useState(null);

  useEffect(() => {
    getTaskById(id).then(setTask);
  }, [id]);

  const handleDelete = async () => {
    await deleteTask(id);
    Alert.alert("Éxito", "Tarea eliminada");
    navigation.goBack();
  };

  if (!task) return <Text style={{ marginTop: 40, textAlign: "center" }}>Cargando...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text>Cantidad: {task.cantidad}</Text>
      <Text>{task.date}</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#0288D1" }]}
        onPress={() => navigation.navigate("Form", { id })}
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40, backgroundColor: "#F7FBFF" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  button: { marginTop: 20, backgroundColor: "#E64A19", padding: 15, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});