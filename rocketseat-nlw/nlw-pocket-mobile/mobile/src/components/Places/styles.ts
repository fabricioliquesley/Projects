import { StyleSheet } from "react-native";

import { COLORS, FONT_FAMILY } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray[100]
  },

  content: {
    gap: 12,
    padding: 24,
    paddingBottom: 100,
  },

  indicator: {
    width: 80,
    height: 4,
    backgroundColor: COLORS.gray[300]
  },

  title: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 16,
    color: COLORS.gray[600],
    marginBottom: 16
  }
});