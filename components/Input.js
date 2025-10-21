import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

export default function Input({ label, value, onChangeText, placeholder, secureTextEntry = false, error }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  label: { fontSize: 14, marginBottom: 5, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff"
  },
  inputError: {
    borderColor: "#E53935"
  },
  errorText: {
    color: "#E53935",
    fontSize: 12,
    marginTop: 5
  }
});