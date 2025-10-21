import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function Button({ title, onPress, color = "#0288D1", loading = false }) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress} disabled={loading}>
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});