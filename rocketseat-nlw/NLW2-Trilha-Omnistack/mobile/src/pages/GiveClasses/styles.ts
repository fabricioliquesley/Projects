import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#8257e5",
    padding: 40,
  },

  background: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "contain",
  },

  title: {
    color: "#fff",
    fontFamily: "Archivo_700Bold",
    fontSize: 32,
    lineHeight: 37,
    maxWidth: 180,
  },

  description: {
    color: "#d4c2ff",
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 26,
    marginTop: 24,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 58,
    backgroundColor: "#04d361",
    borderRadius: 8,
    marginVertical: 40,
  },

  buttonText: {
    color: "#fff",
    fontFamily: "Archivo_700Bold",
    fontSize: 16,
  },
});
