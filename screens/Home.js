import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../src/config/firebaseConfig";

export default function Home({ navigation }) {
  const handleSignOut = async () => {
    await signOut(auth);
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bienvenido {auth.currentUser?.email}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("List")}>
        <Text style={styles.buttonText}>Ver mis tareas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#E64A19" }]} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  welcome: { fontSize: 20, marginBottom: 20, fontWeight: "600" },
  button: { backgroundColor: "#0288D1", padding: 15, borderRadius: 8, width: "80%", alignItems: "center", marginBottom: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" }
});