import { StyleSheet } from "react-native";

import { COLORS, FONT_FAMILY } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
    height: 56,
    maxHeight: 56,
    backgroundColor: COLORS.green.base,
    borderRadius: 10
  },

  title: {
    color: COLORS.gray[100],
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 16
  }
})