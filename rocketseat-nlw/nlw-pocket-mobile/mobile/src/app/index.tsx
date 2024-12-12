import { View } from "react-native";
import { router } from "expo-router";

import { Welcome } from "@/components/Welcome";
import { Steps } from "@/components/steps";
import { Button, } from "@/components/Button";

export default function Home() {
  return (
    <View style={{flex: 1, padding: 40, gap: 40}}>
      <Welcome />
      <Steps />
      <Button onPress={navigateToHome}>
        <Button.Title>
          Começar
        </Button.Title>
      </Button>
    </View>
  )

  function navigateToHome() {
    router.navigate("/home");
  }
}