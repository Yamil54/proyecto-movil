// screens/Home.js
import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../src/config/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => setUserEmail(auth.currentUser?.email ?? null), []);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (e) {
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.row}>
          <Image source={{ uri: "https://www.gravatar.com/avatar/?d=mp" }} style={styles.avatar} />
          <View>
            <Text style={styles.hello}>Bienvenido</Text>
            <Text style={styles.email}>{userEmail ?? "Usuario"}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleSignOut} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Ionicons name="log-out-outline" size={22} color="#fff" />}
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>ATLETIX GYM</Text>
        <Text style={styles.subtitle}>
          Gestioná tus productos y tu carrito de forma simple.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F7FBFF" },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E6EEF6",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 56, height: 56, borderRadius: 14, marginRight: 12 },
  hello: { fontSize: 14, color: "#6B7A90" },
  email: { fontSize: 16, fontWeight: "700", color: "#122033" },
  logoutBtn: { backgroundColor: "#E64A19", padding: 10, borderRadius: 10 },
  content: { padding: 20 },
  title: { fontSize: 22, fontWeight: "800", color: "#0F1724" },
  subtitle: { marginTop: 8, color: "#6B7A90" },
});