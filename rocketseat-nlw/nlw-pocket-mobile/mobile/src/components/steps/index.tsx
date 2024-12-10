import { Text, View } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import { Step } from "../Step";
import {COLORS} from "@/styles/theme";

export function Steps() {
  return (
    <View style={styles.container}> 
      <Text style={styles.title}>Veja como funciona:</Text>
      <Step 
        icon={<Feather name="map-pin" size={32} color={COLORS.red.base}/>}
        title="Encontre estabelecimentos" 
        description="Veja locais perto de você que são parceiros Nearby"
      />
      <Step 
        icon={<Ionicons name="qr-code" size={32} color={COLORS.red.base}/>}
        title="Ative o cupom com QR Code" 
        description="Escanei o código no estabelecimento para usar o benefício"
      />
      <Step
        icon={<MaterialCommunityIcons name="ticket-percent-outline" size={32} color={COLORS.red.base}/>}
        title="Garanta as vantagens perto de você"  
        description="Ative cupons onde estiver, em diferentes tipos de estabelecimentos"
      />
    </View>
  )
}