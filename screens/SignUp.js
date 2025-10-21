import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/config/firebaseConfig";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("yamilayarde4@gmail.com");
  const [password, setPassword] = useState("123456789");
  const [confirmPassword, setConfirmPassword] = useState("123456789");

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Éxito", "Usuario registrado correctamente.");
      navigation.replace("Home");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
      <TextInput style={styles.input} placeholder="Correo electrónico" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirmar contraseña" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { width: "100%", borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 10 },
  button: { backgroundColor: "#0288D1", padding: 15, borderRadius: 8, width: "100%", alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  link: { marginTop: 15, color: "#007AFF" }
});