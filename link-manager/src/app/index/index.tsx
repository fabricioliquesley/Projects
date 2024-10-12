import { useState, useCallback } from "react"; 
import { Image, TouchableOpacity, View, FlatList, Modal, Text, Alert, Linking } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";

import { styles } from "./styles";
import { colors } from "@/styles/colors";
import { Categories } from "@/components/categories";
import { Link } from "@/components/link";
import { Option } from "@/components/option";
import { categories } from "@/utils/categories";
import { linkStorage, type LinkStorage } from "@/storage/link-storage";

export default function Index() { 
  const [ category, setCategory ] = useState(categories[0].title);
  const [ links, setLinks ] = useState<LinkStorage[]>([]);
  const [ showModal, setShowModal ] = useState(false);
  const [ selectedLink, setSelectedLink ] = useState<LinkStorage>({} as LinkStorage);

  function navigateToAddLinkScreen() {
    return router.navigate("/add")
  }

  async function getLinks() {
    try {
      const response = await linkStorage.get();

      const filteredLinks = response.filter((link) => link.category === category);

      setLinks(filteredLinks);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível listar os links");
      console.log(error)
    }
  }

  function handleDetails(selected: LinkStorage) {
    setShowModal(true);
    setSelectedLink(selected);
  }

  function handleRemove() {
    try {
      Alert.alert(
        "Excluir", 
        "Tem certeza que deseja excluir esse link?",
        [
          { style: "cancel", text: "Não" },
          { text: "Sim", onPress: async () => {
            await linkStorage.remove(selectedLink.id);
            getLinks();
            setShowModal(false);
          }}
        ]
      )
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover o link");
      console.log(error);
    }
  }

  async function handleOpenLink() {
    try {
      await Linking.openURL(selectedLink.url);
      setShowModal(false);
    } catch (error) {
      Alert.alert("Link", "Não foi possível abrir o link.");
      console.log(error)
    }
  }

  useFocusEffect(
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useCallback(() => {
      getLinks();
    }, [category])
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require("@/assets/logo.png")} 
          style={styles.logo}
        />
        <TouchableOpacity onPress={navigateToAddLinkScreen}>
          <MaterialIcons name="add" size={32} color={colors.green[300]}/>
        </TouchableOpacity>
      </View>
      
      <Categories onChange={setCategory} selectedCategory={category}/>
      <FlatList 
        data={links}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <Link 
            name={item.name} 
            url={item.url} 
            onDetails={() => handleDetails(item)}
          />
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal transparent visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>{selectedLink.category}</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <MaterialIcons name="close" size={20} color={colors.gray[400]}/>
              </TouchableOpacity>
            </View>

            <Text style={styles.modaLinkName}>
              {selectedLink.name}
            </Text>
            <Text style={styles.modaLinkUrl}>
              {selectedLink.url}
            </Text>

            <View style={styles.modalFooter}>
              <Option 
                title="Excluir" 
                icon="delete" 
                variant="secondary" 
                onPress={handleRemove}
              />
              <Option title="Abrir" icon="link" onPress={handleOpenLink}/>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}