import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProducts, addToCart } from "../src/services/firestoreService";
import { useIsFocused } from "@react-navigation/native";

export default function List({ navigation }) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [cantidades, setCantidades] = useState({});
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) getProducts().then(setItems).catch(e => Alert.alert("Error", e.message));
  }, [isFocused]);

  const handleAgregarAlCarrito = async (item) => {
    const cantidad = parseInt(cantidades[item.id] || "1", 10);
    if (!cantidad || cantidad <= 0) return Alert.alert("Error", "Ingrese una cantidad válida");

    try {
      await addToCart(item, cantidad);
      Alert.alert("Éxito", `${cantidad} x ${item.title} agregado al carrito`);
      setCantidades(prev => ({ ...prev, [item.id]: "" }));
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  const filtered = items.filter(i => i.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <SafeAreaView style={styles.container}>
      <TextInput style={styles.search} placeholder="Buscar producto..." value={search} onChangeText={setSearch} />

      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate("Detail", { id: item.id })}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>Stock: {item.cantidad}</Text>
              <Text>Precio: ${item.precio}</Text>
              <Text>{item.date}</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.qtyInput}
              placeholder="1"
              keyboardType="numeric"
              value={cantidades[item.id] || ""}
              onChangeText={t => setCantidades(p => ({ ...p, [item.id]: t }))}
            />

            <TouchableOpacity style={styles.cartBtn} onPress={() => handleAgregarAlCarrito(item)}>
              <Text style={styles.cartText}>🛒</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay productos</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20, backgroundColor: "#F7FBFF" },
  search: { backgroundColor: "#fff", borderRadius: 8, padding: 10, marginBottom: 15, borderWidth: 1, borderColor: "#ccc" },
  card: { flexDirection: "row", alignItems: "center", padding: 15, backgroundColor: "#eee", marginBottom: 10, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: "bold" },
  empty: { textAlign: "center", marginTop: 20, color: "#666" },
  qtyInput: { width: 50, height: 40, backgroundColor: "#fff", borderRadius: 6, borderWidth: 1, borderColor: "#ccc", textAlign: "center", marginRight: 8 },
  cartBtn: { backgroundColor: "#0288D1", padding: 10, borderRadius: 8 },
  cartText: { color: "#fff", fontSize: 18 },
});