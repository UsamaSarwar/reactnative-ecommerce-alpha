import { StyleSheet } from "react-native";

export default buttonStyles = StyleSheet.create({
  p_button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#42C88F",
    marginBottom: 24,
  },
  p_button_login: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#42C88F",
    marginBottom: 24,
    flexDirection: "row",
  },
  p_button_text: {
    fontSize: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },

  s_button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginBottom: 24,
  },
  s_button_fp: {
    // alignItems: "center",
    // justifyContent: "center",
    flexDirection: "row-reverse",
    backgroundColor: "transparent",
    marginBottom: 24,
  },
  s_button_text: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#AAAAAA",
  },

  d_button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "red",
    marginBottom: 24,
    // height: 45,
  },
  d_button_text: {
    fontSize: 21,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },

  checkout_button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#42C88F",
  },
  checkout_button_dis: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#f6f8f9",
  },
  checkout_button_text: {
    fontSize: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },
  checkout_button_text_dis: {
    fontSize: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "grey",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
