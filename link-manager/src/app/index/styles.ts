import { StyleSheet } from "react-native";

import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 62
  },

  text: {
    color: colors.green[900]
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 24
  },

  logo: {
    width: 38,
    height: 32,
  },

  links: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[600]
  },

  linksContent: {
    gap: 20,
    padding: 24,
    paddingBottom: 100
  }
})