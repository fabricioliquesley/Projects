import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "#fff",
    paddingTop: 24,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: "#e6e6f0",
    borderRadius: 8,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 50,
    backgroundColor: "#eee",
  },

  teacherName: {
    color: "#32264d",
    fontFamily: "Archivo_700Bold",
    fontSize: 20,
    lineHeight: 25,
  },

  subject: {
    color: "#6a6180",
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 20,
  },

  description: {
    color: "#6a6180",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 24,

    marginTop: 24,
  },

  footer: {
    alignItems: "center",
    backgroundColor: "#fafafc",
    marginTop: 24,
    marginHorizontal: -24,
    padding: 24,
    borderTopWidth: 1,
    borderColor: "#e6e6f0",
  },

  price: {
    color: "#8257e5",
    fontFamily: "Archivo_700Bold",
    fontSize: 16,
    lineHeight: 26,
  },

  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },

  button: {
    height: 56,
    padding: 16,
    borderRadius: 8,
  },

  favoriteButton: {
    backgroundColor: "#8257E5",
  },

  removeFavoriteButton: {
    backgroundColor: "#E33D3D",
  },

  contactButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    backgroundColor: "#04D361",
  },

  buttonText: {
    color: "#fff",
    fontFamily: "Archivo_700Bold",
    fontSize: 16,
    lineHeight: 26,
  },
});
