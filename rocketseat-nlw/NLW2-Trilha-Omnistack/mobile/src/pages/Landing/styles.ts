import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#8257e5",
    padding: 40,
  },

  banner: {
    width: "100%",
    resizeMode: "contain",
  },

  title: {
    color: "#fff",
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
    lineHeight: 30,
    marginTop: 80,
  },

  titleBold: {
    fontFamily: "Poppins_600SemiBold",
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },

  button: {
    justifyContent: "space-between",
    height: 150,
    width: "48%",
    padding: 24,
    borderRadius: 8,
  },

  buttonPrimary: {
    backgroundColor: "#9871f5",
  },

  buttonSecondary: {
    backgroundColor: "#04d361",
  },

  buttonText: {
    color: "#fff",
    fontFamily: "Archivo_700Bold",
    fontSize: 20,
  },

  totalConnections: {
    color: "#d4c2ff",
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 20,
    maxWidth: 160,

    marginTop: 40,
  },
});
