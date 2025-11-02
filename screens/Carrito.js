// screens/Carrito.js
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, FlatList, TouchableOpacity, StyleSheet, Alert, View } from "react-native";
import { getCartItems, deleteCartItem } from "../src/services/firestoreService";
import { useIsFocused } from "@react-navigation/native";

export default function Carrito() {
  const [cart, setCart] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) getCartItems().then(setCart).catch(err => Alert.alert("Error", err.message));
  }, [isFocused]);

  const handleEliminar = async (id) => {
    await deleteCartItem(id);
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const total = cart.reduce((acc, i) => acc + (i.precio || 0) * (i.cantidad || 0), 0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🛒 Carrito</Text>

      <FlatList
        data={cart}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.nombre}</Text>
              <Text>{item.cantidad} x ${item.precio}</Text>
              <Text>Subtotal: ${item.precio * item.cantidad}</Text>
            </View>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => handleEliminar(item.id)}>
              <Text style={styles.deleteText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Tu carrito está vacío</Text>}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${total}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FBFF", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10 },
  name: { fontSize: 16, fontWeight: "600" },
  deleteBtn: { backgroundColor: "#E64A19", padding: 8, borderRadius: 6 },
  deleteText: { color: "#fff", fontWeight: "bold" },
  empty: { textAlign: "center", marginTop: 40, color: "#666" },
  footer: { borderTopWidth: 1, borderTopColor: "#ddd", paddingTop: 10, marginTop: 10 },
  total: { fontSize: 18, fontWeight: "bold", color: "#0288D1", textAlign: "right" },
});