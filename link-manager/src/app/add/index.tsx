import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { styles } from "./styles";
import { colors } from "@/styles/colors";
import { Categories } from "@/components/categories";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function Add() {
  const [ category, setCategory ] = useState("");
  const [ name, setName ] = useState("");
  const [ url, setUrl ] = useState("");

  function navigateBack() {
    return router.back();
  }

  function handleAdd() {
    if (!category) {
      return Alert.alert("Categoria", "Selecione uma categoria.")
    }

    if (!name.trim()) {
      return Alert.alert("Nome", "Informe o nome.")
    }

    if (!url.trim()) {
      return Alert.alert("URL", "Informe a URL.")
    }

    console.log({ category, name, url })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateBack}>
          <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]}/>
        </TouchableOpacity>

        <Text style={styles.title}>Novo</Text>
      </View>
      <Text style={styles.label}>Selecione uma categoria</Text>
      <Categories onChange={setCategory} selectedCategory={category}/>

      <View style={styles.form}>
        <Input placeholder="Nome" onChangeText={setName} />
        <Input 
          placeholder="URL" 
          onChangeText={setUrl} 
          autoCorrect={false} 
          autoCapitalize="none"
          keyboardType="url"
        />
        <Button title="Adicionar" onPress={handleAdd}/>
      </View>
    </View>
  )
}