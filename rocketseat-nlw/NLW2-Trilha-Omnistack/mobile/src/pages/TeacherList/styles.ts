import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f7",
  },

  cardContainer: {
    flex: 1,
    gap: 16,
    marginTop: -32,
    paddingHorizontal: 16,
    paddingBottom: 48,
  },

  searchForm: {
    marginBottom: 8,
  },

  label: {
    color: "#d4c2ff",
    fontFamily: "Poppins_400Regular",
  },

  input: {
    justifyContent: "center",
    height: 54,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,

    color: "#c1bccc",
  },

  inputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },

  inputBlock: {
    flex: 1,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    height: 54,
    backgroundColor: "#04D361",
    borderRadius: 8
  },

  buttonText: {
    color: "#fff",
    fontFamily: "Archivo_700Bold",
    fontSize: 14,
    lineHeight: 26,
  },
});
