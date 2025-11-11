import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProductById, deleteProduct } from "../src/services/firestoreService";

export default function Detalle({ route, navigation }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then(setProduct).catch(e => Alert.alert("Error", e.message));
  }, [id]);

  const handleDelete = () =>
    Alert.alert("Confirmar", "¿Seguro que deseas eliminar este producto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteProduct(id);
            Alert.alert("Éxito", "Producto eliminado");
            navigation.goBack();
          } catch (e) {
            Alert.alert("Error", e.message);
          }
        },
      },
    ]);

  if (!product) return <Text style={{ marginTop: 40, textAlign: "center" }}>Cargando...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{product.title}</Text>
      <Text>Cantidad: {product.cantidad}</Text>
      <Text>Precio: ${product.precio}</Text>
      <Text>{product.date}</Text>

      <TouchableOpacity style={[styles.button, { backgroundColor: "#0288D1" }]} onPress={() => navigation.navigate("Form", { id })}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 40, backgroundColor: "#F7FBFF" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  button: { marginTop: 20, backgroundColor: "#E64A19", padding: 15, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});