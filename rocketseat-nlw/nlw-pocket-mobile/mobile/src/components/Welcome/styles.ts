import { StyleSheet } from "react-native";

import { COLORS,  FONT_FAMILY } from "@/styles/theme";

export const styles = StyleSheet.create({
  logo: {
    width: 48,
    height: 48,
    marginTop: 24,
    marginBottom: 28,
  },

  title: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: 24,
    color: COLORS.gray[600]
  },

  subtitle: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 14,
    color: COLORS.gray[500],
    marginTop: 12,
  }
})