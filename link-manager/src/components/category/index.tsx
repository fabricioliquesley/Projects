import { MaterialIcons } from "@expo/vector-icons"
import { Pressable, type PressableProps, Text } from "react-native"

import { colors } from "@/styles/colors"
import { styles } from "./styles"

type IconList = keyof typeof MaterialIcons.glyphMap

interface CategoryProps extends PressableProps {
  title: string;
  icon: IconList;
}

export function Category({ title, icon, ...rest }: CategoryProps) {
  return (
    <Pressable style={styles.container} {...rest}>
      <MaterialIcons name={icon} size={16} color={colors.gray[400]}/>
      <Text style={styles.name}>{title}</Text>
    </Pressable>
  )
}