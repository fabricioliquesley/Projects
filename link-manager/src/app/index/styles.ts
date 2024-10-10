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
  },

  modal: {
    flex: 1,
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: colors.gray[900],
    borderTopWidth: 1,
    borderTopColor: colors.gray[800],
    padding: 24,
    paddingBottom: 32
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 42
  },

  modalCategory: {
    flex: 1,
    color: colors.gray[400],
    fontSize: 16,
    fontWeight: "500"
  },
  
  modaLinkName: {
    color: colors.gray[200],
    fontSize: 18,
    fontWeight: "600"
  },

  modaLinkUrl: {
    color: colors.gray[400],
    fontSize: 14
  },

  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: colors.gray[600],
    paddingVertical: 14
  }
})