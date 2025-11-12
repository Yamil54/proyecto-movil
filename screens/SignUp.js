import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../src/config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState(""), [password, setPassword] = useState(""), [confirm, setConfirm] = useState("");

  const handleSignUp = async () => {
    if (!email || !password || !confirm) return Alert.alert("Error", "Todos los campos son obligatorios.");
    if (password !== confirm) return Alert.alert("Error", "Las contraseñas no coinciden.");
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const role = email === "empleado@miempresa.com" ? "empleado" : "cliente";
      await setDoc(doc(db, "usuarios", user.uid), { email, role, createdAt: new Date() });
      Alert.alert("Éxito", `Usuario registrado como ${role}.`);
      navigation.replace("Main");
    } catch (e) { Alert.alert("Error", e.message); }
  };

  return (
    <SafeAreaView style={s.c}>
      <Text style={s.t}>Crear Cuenta</Text>
      <TextInput style={s.i} placeholder="Correo electrónico" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={s.i} placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={s.i} placeholder="Confirmar contraseña" secureTextEntry value={confirm} onChangeText={setConfirm} />
      <TouchableOpacity style={s.btn} onPress={handleSignUp}><Text style={s.btnTxt}>Registrarse</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}><Text style={s.link}>¿Ya tienes cuenta? Inicia sesión</Text></TouchableOpacity>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  c:{flex:1,justifyContent:"center",alignItems:"center",padding:20,backgroundColor:"#F7FBFF"},
  t:{fontSize:24,fontWeight:"bold",marginBottom:20},
  i:{width:"100%",borderWidth:1,borderRadius:8,padding:12,marginBottom:10,backgroundColor:"#fff"},
  btn:{backgroundColor:"#0288D1",padding:15,borderRadius:8,width:"100%",alignItems:"center"},
  btnTxt:{color:"#fff",fontSize:16,fontWeight:"bold"},
  link:{marginTop:15,color:"#007AFF"},
});