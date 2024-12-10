import { Text, View } from "react-native";

import { styles } from "./styles";
import { COLORS } from "@/styles/theme";

interface StepProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function Step({ icon: Icon, title, description }: StepProps) {
  return (
    <View style={styles.container}>
      {Icon}
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  )
}