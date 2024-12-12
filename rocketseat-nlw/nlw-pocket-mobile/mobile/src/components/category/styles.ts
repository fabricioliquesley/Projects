import { StyleSheet } from "react-native";

import { COLORS, FONT_FAMILY } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 36,
    backgroundColor: COLORS.gray[100],
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: 8,
    paddingHorizontal: 12
  },

  name: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 14,
    color: COLORS.gray[500]
  },

  containerSelected: {
    backgroundColor: COLORS.green.base,
    borderWidth: 1
  },

  nameSelected: {
    color: COLORS.gray[100]
  }
})