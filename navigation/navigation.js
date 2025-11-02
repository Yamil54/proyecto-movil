import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Home from "../screens/Home";
import List from "../screens/List";
import Form from "../screens/Form";
import Detail from "../screens/Detail";
import Carrito from "../screens/Carrito";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 👇 Stack solo para Home
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

// 👇 Stack para Lista y Detail
function ListStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Form" component={Form} />
    </Stack.Navigator>
  );
}

// 👇 Tabs principales
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#0288D1",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#fff", borderTopColor: "#eee" },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Inicio") iconName = "home-outline";
          else if (route.name === "Productos") iconName = "list-outline";
          else if (route.name === "Agregar") iconName = "add-circle-outline";
          else if (route.name === "Carrito") iconName = "cart-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeStack} />
      <Tab.Screen name="Productos" component={ListStack} />
      <Tab.Screen name="Agregar" component={Form} />
      <Tab.Screen name="Carrito" component={Carrito} />
    </Tab.Navigator>
  );
}

// 👇 Navegación principal con login
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