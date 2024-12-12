import { StyleSheet } from "react-native";

import { COLORS, FONT_FAMILY } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    width: '100%',
    height: 120,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    borderRadius: 12
  },

  image: {
    width: 116,
    height: 104,
    backgroundColor: COLORS.gray[200],
    borderRadius: 8
  },

  content: {
    flex: 1,
    gap: 4
  }, 

  name: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: 14,
    color: COLORS.gray[600]
  },

  description: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 12,
    color: COLORS.gray[500]
  },

  footer: {
    flexDirection: "row",
    gap: 7,
    marginTop: 10,
  },

  tickets: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 12,
    color: COLORS.gray[400]
  }
})