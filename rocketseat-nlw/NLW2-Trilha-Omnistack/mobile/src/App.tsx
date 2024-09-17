import {
  Archivo_400Regular,
  Archivo_700Bold,
  useFonts,
} from "@expo-google-fonts/archivo";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AppStack } from "./routes/AppStack";

export function App() {
  const [loaded, error] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <AppStack />
      <StatusBar style="light" />
    </>
  );
}
