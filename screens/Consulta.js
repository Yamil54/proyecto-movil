import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { registerConsultaPersonalizada } from "../src/services/firestoreService";

export default function Consulta({ navigation }) {
  const [mensaje, setMensaje] = useState("");

  const handleEnviar = async () => {
    if (!mensaje.trim()) {
      Alert.alert("Error", "Por favor escribí tu consulta.");
      return;
    }

    try {
      await registerConsultaPersonalizada(mensaje);
      Alert.alert("Consulta enviada", "Gracias por tu mensaje.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Escribí tu consulta:</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="Ej: ¿Cuál es el precio del arroz?"
        value={mensaje}
        onChangeText={setMensaje}
      />
      <TouchableOpacity style={styles.button} onPress={handleEnviar}>
        <Text style={styles.buttonText}>Enviar consulta</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40, backgroundColor: "#F7FBFF" },
  label: { fontSize: 16, marginBottom: 10 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlignVertical: "top",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0288D1",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});