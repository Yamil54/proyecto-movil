import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
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

  if (!task) return <Text>Cargando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text>{task.date}</Text>
      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  button: { marginTop: 20, backgroundColor: "#E64A19", padding: 15, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "bold" }
});