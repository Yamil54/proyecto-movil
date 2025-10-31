// screens/Home.js
import React, { useState, useEffect } from "react";
import {SafeAreaView,View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Image,} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../src/config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserEmail(auth.currentUser?.email ?? null);
  }, []);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header con usuario y logout */}
      <View style={styles.header}>
        <View style={styles.userRow}>
          <View style={styles.avatarWrap}>
            <Image
              source={{ uri: "https://www.gravatar.com/avatar/?d=mp" }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.greeting}>
            <Text style={styles.hello}>Bienvenido</Text>
            <Text numberOfLines={1} style={styles.email}>
              {userEmail ?? "Usuario"}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleSignOut}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Ionicons name="log-out-outline" size={22} color="#fff" />
          )}
        </TouchableOpacity>
      </View>

      {/* Contenido principal */}
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Organiza lista de compras</Text>
          <Text style={styles.cardText}>
            Crear, editar y eliminar tus compras
          </Text>

          <View style={styles.actions}>
            {/* Botón Lista */}
            <TouchableOpacity
              style={[styles.actionBtn, styles.primary]}
              onPress={() => navigation.navigate("List")}
            >
              <Ionicons
                name="list"
                size={18}
                color="#fff"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.actionText}>Lista de compras</Text>
            </TouchableOpacity>

            {/* Botón Agregar */}
            <TouchableOpacity
              style={[styles.actionBtn, styles.secondary]}
              onPress={() => navigation.navigate("Form")}
            >
              <Ionicons
                name="add"
                size={18}
                color="#0288D1"
                style={{ marginRight: 8 }}
              />
              <Text style={[styles.actionText, { color: "#0288D1" }]}>
                Agregar
              </Text>
            </TouchableOpacity>

            {/* Botón Consulta */}
            <TouchableOpacity
              style={[styles.actionBtn, styles.consulta]}
              onPress={() => navigation.navigate("Consulta")}
            >
              <Ionicons
                name="chatbox-ellipses"
                size={18}
                color="#0288D1"
                style={{ marginRight: 8 }}
              />
              <Text style={[styles.actionText, { color: "#0288D1" }]}>
                Consulta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F7FBFF" },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    paddingTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E6EEF6",
  },
  userRow: { flexDirection: "row", alignItems: "center" },
  avatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#EDEFF6",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: { width: 56, height: 56, resizeMode: "cover" },
  greeting: { maxWidth: 220 },
  hello: { fontSize: 14, color: "#6B7A90" },
  email: { fontSize: 16, fontWeight: "700", color: "#122033", marginTop: 2 },

  logoutBtn: {
    backgroundColor: "#E64A19",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  content: { padding: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 18,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#0F1724" },
  cardText: { fontSize: 14, color: "#6B7A90", marginTop: 8 },
  actions: { flexDirection: "row", flexWrap: "wrap", marginTop: 14 },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  primary: { backgroundColor: "#0288D1" },
  secondary: {
    backgroundColor: "#EAF6FF",
    borderWidth: 1,
    borderColor: "#D6EDFF",
  },
  consulta: {
    backgroundColor: "#FFF3E0",
    borderWidth: 1,
    borderColor: "#FFD180",
  },
  actionText: { color: "#fff", fontWeight: "700" },

  quick: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  quickBtn: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EEF5FB",
  },
  quickText: { marginTop: 6, color: "#0F1724", fontWeight: "600" },
});