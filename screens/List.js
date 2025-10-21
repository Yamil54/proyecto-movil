import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { getTasks } from "../src/services/firestoreService";
import { useIsFocused } from "@react-navigation/native";

export default function List({ navigation }) {
  const [items, setItems] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadItems = async () => {
      const data = await getTasks();
      setItems(data);
    };
    if (isFocused) loadItems();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Detail", { id: item.id })}>
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Form")}>
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { padding: 15, backgroundColor: "#eee", marginBottom: 10, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: "bold" },
  addButton: { position: "absolute", bottom: 30, right: 30, backgroundColor: "#0288D1", borderRadius: 30, padding: 15 },
  addText: { color: "#fff", fontSize: 24 }
});