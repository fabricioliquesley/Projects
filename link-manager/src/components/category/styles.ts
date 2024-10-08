import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },

  name: {
    color: colors.gray[400],
    fontSize: 16,
    fontWeight: "600",
  }
})