import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, View, Text } from "react-native";

import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Home from "../screens/Home";
import Lista from "../screens/Lista";
import Formulario from "../screens/Formulario";
import Detalle from "../screens/Detalle";
import Carrito from "../screens/Carrito";
import { getUserRole } from "../src/services/firestoreService";

const Stack = createStackNavigator(), Tab = createBottomTabNavigator();
const icons = { Inicio: "home-outline", Productos: "list-outline", Agregar: "add-circle-outline", Carrito: "cart-outline" };

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

const ListaStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Lista" component={Lista} />
    <Stack.Screen name="Detalle" component={Detalle} />
    <Stack.Screen name="Formulario" component={Formulario} />
  </Stack.Navigator>
);

function MainTabs() {
  const [role, setRole] = useState(null), [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserRole().then(setRole).catch(console.log).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0288D1" />
        <Text style={{ marginTop: 10 }}>Cargando rol...</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#0288D1",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#fff", borderTopColor: "#eee" },
        tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name]} size={size} color={color} />,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeStack} />
      <Tab.Screen name="Productos" component={ListaStack} />
      {role === "empleado" && <Tab.Screen name="Agregar" component={Formulario} />}
      {role === "cliente" && <Tab.Screen name="Carrito" component={Carrito} />}
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}