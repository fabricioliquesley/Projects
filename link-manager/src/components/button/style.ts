import { StyleSheet } from "react-native";

import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: 52,
    backgroundColor: colors.green[300],
    borderRadius: 8
  },

  title: {
    color: colors.green[900],
    fontSize: 16,
    fontWeight: "600"
  }
})