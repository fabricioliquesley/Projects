import { StyleSheet } from "react-native";

import { COLORS, FONT_FAMILY } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    gap: 24,
    flex: 1
  },

  title: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 16,
    color: COLORS.gray[500]
  }
})