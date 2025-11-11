import React, { useState, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createProduct, getProductById, updateProduct } from "../src/services/firestoreService";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Formulario({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const id = route.params?.id;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProductById(id)
      .then(p => {
        if (p) {
          setTitle(p.title || "");
          setCantidad(p.cantidad ? String(p.cantidad) : "");
          setPrecio(p.precio ? String(p.precio) : "");
          setDate(p.date || "");
        }
      })
      .catch(e => Alert.alert("Error", e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = "Obligatorio";
    if (!cantidad.trim()) errs.cantidad = "Obligatorio";
    if (!precio.trim()) errs.precio = "Obligatorio";
    setErrors(errs);
    return !Object.keys(errs).length;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    const now = new Date();
    const fechaHora = `${now.getDate().toString().padStart(2,"0")}/${(now.getMonth()+1)
      .toString().padStart(2,"0")}/${now.getFullYear()} - ${now.getHours()
      .toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`;

    const data = {
      title: title.trim(),
      cantidad: parseInt(cantidad, 10) || 0,
      precio: parseFloat(precio) || 0,
      date: id ? date : fechaHora,
    };

    try {
      id ? await updateProduct(id, data) : await createProduct(data);
      navigation.goBack();
    } catch (e) {
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input label="Título" value={title} onChangeText={setTitle} placeholder="Ej: Pan" error={errors.title} />
      <Input label="Cantidad" value={cantidad} onChangeText={setCantidad} placeholder="Ej: 5" keyboardType="numeric" error={errors.cantidad} />
      <Input label="Precio" value={precio} onChangeText={setPrecio} placeholder="Ej: 120.50" keyboardType="numeric" error={errors.precio} />
      <Button title={id ? "Actualizar" : "Guardar"} onPress={handleSubmit} loading={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#F7FBFF",
  },
});