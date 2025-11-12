import React, { useEffect, useState } from "react";
import { Text, FlatList, TouchableOpacity, StyleSheet, Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCartItems, deleteCartItem } from "../src/services/firestoreService";
import { useIsFocused } from "@react-navigation/native";

export default function Carrito() {
  const [cart, setCart] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => { if (isFocused) getCartItems().then(setCart).catch(e => Alert.alert("Error", e.message)); }, [isFocused]);
  const handleEliminar = async id => { try { await deleteCartItem(id); setCart(p => p.filter(i => i.id !== id)); } catch(e){ Alert.alert("Error", e.message);} };
  const total = cart.reduce((acc, i) => acc + (i.precio||0)*(i.cantidad||0), 0);

  return (
    <SafeAreaView style={s.c}>
      <Text style={s.t}>🛒 Carrito</Text>
      <FlatList
        data={cart}
        keyExtractor={i=>i.id}
        renderItem={({item})=>(
          <View style={s.card}>
            <View style={{flex:1}}>
              <Text style={s.n}>{item.nombre}</Text>
              <Text>{item.cantidad} x ${item.precio}</Text>
              <Text>Subtotal: ${item.precio*item.cantidad}</Text>
            </View>
            <TouchableOpacity style={s.del} onPress={()=>handleEliminar(item.id)}>
              <Text style={s.delTxt}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={s.empty}>Tu carrito está vacío</Text>}
      />
      <View style={s.footer}><Text style={s.total}>Total: ${total}</Text></View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  c:{flex:1,backgroundColor:"#F7FBFF",padding:20}, t:{fontSize:22,fontWeight:"bold",marginBottom:15},
  card:{flexDirection:"row",alignItems:"center",backgroundColor:"#fff",padding:12,borderRadius:8,marginBottom:10},
  n:{fontSize:16,fontWeight:"600"}, del:{backgroundColor:"#E64A19",padding:8,borderRadius:6}, delTxt:{color:"#fff",fontWeight:"bold"},
  empty:{textAlign:"center",marginTop:40,color:"#666"}, footer:{borderTopWidth:1,borderTopColor:"#ddd",paddingTop:10,marginTop:10},
  total:{fontSize:18,fontWeight:"bold",color:"#0288D1",textAlign:"right"}
});