import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import { COLORS } from "@/styles/theme";
import { Place as PlaceT } from "@/utils/types";

type PlaceProps = TouchableOpacityProps & {
  data: PlaceT
};

export function Place({
  data: {
    id,
    name,
    cover,
    address,
    description,
    coupons, 
  },
  ...rest
}: PlaceProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Image style={styles.image} source={{ uri: cover }}/>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.footer}>
          <MaterialCommunityIcons 
            name="ticket-percent-outline" 
            size={16}
            color={COLORS.red.base}
          />
          <Text 
            style={styles.tickets}
          >
            {coupons} cupons disponíveis
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}