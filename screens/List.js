import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, View } from "react-native";
import { getTasks } from "../src/services/firestoreService";
import { useIsFocused } from "@react-navigation/native";

export default function List({ navigation }) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadItems = async () => {
      const data = await getTasks();
      setItems(data);
    };
    if (isFocused) loadItems();
  }, [isFocused]);

  // Filtrar tareas según búsqueda
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔍 Buscador */}
      <TextInput
        style={styles.search}
        placeholder="Buscar tarea..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Lista de tareas */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Detail", { id: item.id })}>
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>Cantidad: {item.cantidad}</Text>
              <Text>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay tareas</Text>}
      />

      {/* Botón flotante para crear tarea */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Form")}>
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40, backgroundColor: "#F7FBFF" },
  search: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  card: { padding: 15, backgroundColor: "#eee", marginBottom: 10, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: "bold" },
  empty: { textAlign: "center", marginTop: 20, color: "#666" },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#0288D1",
    borderRadius: 30,
    padding: 15,
  },
  addText: { color: "#fff", fontSize: 24 },
});