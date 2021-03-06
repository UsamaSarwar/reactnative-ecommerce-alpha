import React, { useState } from "react";
// import app from "../realmApp";
import { useAuth } from "../providers/AuthProvider.js";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  StatusBar,
  Button,
  ImageBackground,
  Pressable,
  Image,
  Alert,
} from "react-native";

import styles from "../styles/Styles.js";

export default function Deleteaccount({ navigation }) {
  const { signOut, user, deleteUser } = useAuth();
  const [text, setText] = useState("");
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.logoView}>
          <Image
            source={require("../assets/hu_logo.png")}
            style={styles.logo}
          ></Image>
        </View>
        <View style={styles.fields}>
          <Text style={styles.headText}>
            Please write "DELETE ACCOUNT" below:
          </Text>
          <TextInput
            style={styles.inputbox}
            placeholder="Confirmation Text"
            // secureTextEntry={true}
            onChangeText={(text) => setText(text)}
          />
          <Pressable
            style={styles.p_button}
            onPress={() =>
              Alert.alert(
                "Are you sure you want to delete this account?",
                null,
                [
                  {
                    text: "Yes, Delete Account",
                    style: "destructive",
                    onPress: () => {
                      console.log("Deleting Account");
                      if (text === "DELETE ACCOUNT") {
                        deleteUser(user);
                        signOut(); //To locally signout the user
                        navigation.navigate("Login");
                        Alert.alert(
                          "Your account has been successfully deleted"
                        );
                      } else {
                        Alert.alert("Confirmation text not valid");
                      }
                    },
                  },
                  { text: "Cancel", style: "cancel" },
                ]
              )
            }
          >
            <Text style={styles.p_button_text}>Delete Account</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
