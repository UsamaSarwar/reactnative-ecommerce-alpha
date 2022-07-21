import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-between",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    padding: 50,
  },
  fields: {
    backgroundColor: "rgba(255, 255, 255, .5)",
    padding: 20,
    borderRadius: 20,
    // flex: 1,
    // justifyContent: "space-around",
  },
  logoView: {
    alignItems: "center",
    marginBottom: 50,
  },
  logo: {
    width: 125,
    height: 125,
  },
  headText: {
    paddingHorizontal: "2%",
    color: "purple",
    paddingBottom: "5%",
  },
  random_text: {
    fontSize: 15,
    color: "black",
    paddingVertical: "1%",
    paddingHorizontal: "19%",
    // margin: 36,
    borderWidth: 2,
    borderRadius: 20,
  },
  inputbox: {
    height: 45,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "black",
    shadowRadius: 100,
    marginBottom: 24,
    paddingLeft: 10,
  },
  p_button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#40e1d1",
    marginBottom: 24,
  },
  p_button_text: {
    fontSize: 21,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },

  s_button: {
    alignItems: "center",
    justifyContent: "center",
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
  footer: {
    position: "absolute",
    flex: 1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor: "cyan",
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    opacity: 0.3,
    flexDirection: "row-reverse",
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginTop: 7,
  },
  logOutIcon: {
    // marginTop: 20,
    fontSize: 20,
    marginBottom: 13,
    marginRight: 65,
  },
  inputContainer: {
    padding: 5,
  },
  inputStyle: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 2,
  },
  manageTeamWrapper: {
    width: 350,
  },
  manageTeamTitle: {
    marginBottom: 10,
  },
  addTeamMemberInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 5,
    fontSize: 18,
  },
  manageTeamButtonContainer: {
    textAlign: "left",
    borderTopColor: "grey",
    borderTopWidth: 1,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  plusButton: {
    fontSize: 28,
    fontWeight: "400",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
