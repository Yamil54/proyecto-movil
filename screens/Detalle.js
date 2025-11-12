import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProductById, deleteProduct, getUserRole } from "../src/services/firestoreService";

export default function Detalle({ route, navigation }) {
  const { id } = route.params;
  const [p, setP] = useState(null), [role, setRole] = useState(null);

  useEffect(() => {
    getProductById(id).then(setP).catch(e=>Alert.alert("Error",e.message));
    getUserRole().then(setRole).catch(e=>Alert.alert("Error",e.message));
  }, [id]);

  const handleDelete = () => Alert.alert("Confirmar","¿Eliminar producto?",[
    {text:"Cancelar",style:"cancel"},
    {text:"Eliminar",style:"destructive",onPress:async()=>{try{await deleteProduct(id);Alert.alert("Éxito","Producto eliminado");navigation.goBack();}catch(e){Alert.alert("Error",e.message);}}}
  ]);

  if (!p) return <Text style={s.load}>Cargando...</Text>;

  return (
    <SafeAreaView style={s.c}>
      <Text style={s.t}>{p.title}</Text>
      <Text>Cantidad: {p.cantidad}</Text><Text>Precio: ${p.precio}</Text><Text>{p.date}</Text>
      {role==="empleado" && (
        <>
          <TouchableOpacity style={[s.btn,s.edit]} onPress={()=>navigation.navigate("Formulario",{id})}><Text style={s.txt}>Editar</Text></TouchableOpacity>
          <TouchableOpacity style={[s.btn,s.del]} onPress={handleDelete}><Text style={s.txt}>Eliminar</Text></TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  c:{flex:1,padding:20,backgroundColor:"#F7FBFF"}, t:{fontSize:22,fontWeight:"bold",marginBottom:10}, load:{marginTop:40,textAlign:"center"},
  btn:{marginTop:20,padding:15,borderRadius:8}, edit:{backgroundColor:"#0288D1"}, del:{backgroundColor:"#E64A19"}, txt:{color:"#fff",fontWeight:"bold",textAlign:"center"}
});