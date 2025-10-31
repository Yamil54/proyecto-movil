import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Consulta from "../screens/Consulta";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Home from "../screens/Home";
import List from "../screens/List";
import Form from "../screens/Form";
import Detail from "../screens/Detail";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 👇 Stack interno para manejar navegación dentro de "Tareas"
function TaskStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Consulta" component={Consulta} />
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Form" component={Form} />
    </Stack.Navigator>
  );
}

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
          else if (route.name === "Tareas") iconName = "list-outline";
          else if (route.name === "Agregar") iconName = "add-circle-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={Home} />
      <Tab.Screen name="Tareas" component={TaskStack} />
      <Tab.Screen name="Agregar" component={Form} />
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