import { View } from "react-native";

import { Welcome } from "@/components/Welcome";
import { Steps } from "@/components/steps";

export default function Home() {
  return (
    <View style={{flex: 1, padding: 40, gap: 40}}>
      <Welcome />
      <Steps />
    </View>
  )
}