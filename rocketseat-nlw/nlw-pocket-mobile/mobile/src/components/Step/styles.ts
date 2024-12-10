import { StyleSheet } from "react-native";

import { COLORS, FONT_FAMILY } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: "row",
    gap: 16
  },

  details: {
    flex: 1
  },

  title: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 16,
    color: COLORS.gray[600]
  },

  description: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 14,
    color: COLORS.gray[500]
  }
})