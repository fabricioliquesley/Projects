import { MaterialIcons } from "@expo/vector-icons"
import { Pressable, type PressableProps, Text } from "react-native"

import { colors } from "@/styles/colors"
import { styles } from "./styles"

type IconList = keyof typeof MaterialIcons.glyphMap

interface CategoryProps extends PressableProps {
  title: string;
  icon: IconList;
  isSelected?: boolean;
}

export function Category({ title, icon, isSelected = false, ...rest }: CategoryProps) {
  const COLOR = isSelected ? colors.green[300] : colors.gray[400];
  
  return (
    <Pressable style={styles.container} {...rest}>
      <MaterialIcons name={icon} size={16} color={COLOR}/>
      <Text style={[styles.name, { color: COLOR }]}>{title}</Text>
    </Pressable>
  ) 
}