import { useState } from "react"; 
import { Image, TouchableOpacity, View, FlatList, Modal, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { styles } from "./styles";
import { colors } from "@/styles/colors";
import { Categories } from "@/components/categories";
import { Link } from "@/components/link";
import { Option } from "@/components/option";
import { categories } from "@/utils/categories";

export default function Index() { 
  const [ category, setCategory ] = useState(categories[0].title);

  function navigateToAddLinkScreen() {
    return router.navigate("/add")
  }

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
        data={["1", "2", "3"]}
        keyExtractor={item => item}
        renderItem={() => (
          <Link 
            name="YouTube" 
            url="https://youtube.com" 
            onDetails={() => console.log("clicou")}
          />
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal transparent visible={false}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>Curso</Text>
              <TouchableOpacity>
                <MaterialIcons name="close" size={20} color={colors.gray[400]}/>
              </TouchableOpacity>
            </View>

            <Text style={styles.modaLinkName}>
              Rocketseat
            </Text>
            <Text style={styles.modaLinkUrl}>
              https://www.rocketseat.com.br
            </Text>

            <View style={styles.modalFooter}>
              <Option title="Excluir" icon="delete" variant="secondary"/>
              <Option title="Abrir" icon="link" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}