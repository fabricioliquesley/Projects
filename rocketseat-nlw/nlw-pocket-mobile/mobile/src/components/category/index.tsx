import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, PressableProps, Text } from "react-native";

import { styles } from "./styles";
import { COLORS } from "@/styles/theme";

type CategoryProps = PressableProps & {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  isSelected?: boolean;
  name: string;
}

export function Category({
  iconName, isSelected = false, name, ...rest
}: CategoryProps) {
  return (
    <Pressable 
      style={[styles.container, isSelected && styles.containerSelected]}
      {...rest}
    >
      <MaterialCommunityIcons 
        name={iconName} 
        size={16} 
        color={COLORS.gray[isSelected ? 100 : 400]}
      />
      <Text style={[styles.name, isSelected && styles.nameSelected]}>{name}</Text>
    </Pressable>
  )
}