import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
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
    try { await signOut(auth); navigation.replace("Login"); }
    catch (e) { Alert.alert("Error", e.message); }
    finally { setLoading(false); }
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <View style={s.row}>
          <Image source={{ uri: "https://www.gravatar.com/avatar/?d=mp" }} style={s.avatar} />
          <View>
            <Text style={s.hello}>Bienvenido</Text>
            <Text style={s.email}>{userEmail ?? "Usuario"}</Text>
          </View>
        </View>
        <TouchableOpacity style={s.logoutBtn} onPress={handleSignOut} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Ionicons name="log-out-outline" size={22} color="#fff" />}
        </TouchableOpacity>
      </View>

      <View style={s.content}>
        <Text style={s.title}>ATLETIX GYM</Text>
        <Text style={s.subtitle}>Gestioná tus productos y tu carrito de forma simple.</Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:{flex:1,backgroundColor:"#F7FBFF"},
  header:{paddingHorizontal:20,paddingTop:20,paddingBottom:15,backgroundColor:"#fff",borderBottomWidth:1,borderBottomColor:"#E6EEF6",flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
  row:{flexDirection:"row",alignItems:"center"},
  avatar:{width:56,height:56,borderRadius:14,marginRight:12},
  hello:{fontSize:14,color:"#6B7A90"},
  email:{fontSize:16,fontWeight:"700",color:"#122033"},
  logoutBtn:{backgroundColor:"#E64A19",padding:10,borderRadius:10},
  content:{flex:1,paddingHorizontal:20,justifyContent:"center",alignItems:"center"},
  title:{fontSize:26,fontWeight:"800",color:"#0F1724",textAlign:"center"},
  subtitle:{marginTop:12,color:"#6B7A90",fontSize:16,textAlign:"center"},
});