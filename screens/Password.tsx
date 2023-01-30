import { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import * as SecureStore from "expo-secure-store";

import { Text, View } from "../components/Themed";
import axios from "axios";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from "../utils";
import { useStateContext } from "./Context/ContextProvider";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function Password() {
  const naviagation = useNavigation();
  const { access_token } = useStateContext();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const checkPasswordValidation = (password: any, newPassword: any) => {
    if (newPassword.trim() == "" || newPassword.trim().length < 7) {
      alert("Weak Password");
    } else {
      changePassword(password, newPassword);
    }
  };
  const changePassword = async (password: any, newPassword: any) => {
    var data = JSON.stringify({
      currentPassword: password,
      newPassword: newPassword,
    });
    // console.log(data);
    // console.log(token);

    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/User/ChangePassword`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Abp-TenantId": "1",
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then((res: any) => {
        Alert.alert("Success", "Password Changed Successfuly", [
          {
            text: "Okay",
            onPress: () => {
              naviagation.navigate("Home");
            },
          },
        ]);
        console.log(res);
        setNewPassword("");
        setPassword("");
      })
      .catch((error: any) => {
        console.log(error);
        Alert.alert("Enter Correct Old Password ", "Enter Old Password", [
          { text: "Okay" },
        ]);
        setNewPassword("");
        setPassword("");
      });
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: 19,
          alignSelf: "center",
        }}
      >
        Update Password
      </Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#DBDBDB",
          top: high / 8.55,
          alignContent: "flex-start",
          width: "80%",
          borderRadius: 5,
          alignSelf: "center",
          justifyContent: "center",
          // left: wid/12.8,
          // backgroundColor: "pink",
          flexDirection: "column",
          height: high / 16.35,
        }}
      >
        <TextInput
          style={{
            fontFamily: "Poppins-Regular",
            fontSize: 18,
            left: wid / 76.8,
            textAlignVertical: "center",
          }}
          value={password}
          autoCapitalize="none"
          placeholder="Old Password"
          onChangeText={(e) => setPassword(e)}
        />
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#DBDBDB",
          top: high / 6.55,
          alignContent: "flex-start",
          width: "80%",
          borderRadius: 5,
          alignSelf: "center",
          justifyContent: "center",
          // left: wid/12.8,
          // backgroundColor: "pink",
          flexDirection: "column",
          height: high / 16.35,
        }}
      >
        <TextInput
          style={{
            fontFamily: "Poppins-Regular",
            fontSize: 18,
            // top: high / 4,
            // height: 40,
            left: wid / 76.8,
            textAlignVertical: "center",
          }}
          value={newPassword}
          autoCapitalize="none"
          placeholder="New Password"
          onChangeText={(e) => setNewPassword(e)}
        />
      </View>
      <TouchableOpacity
        onPress={() => checkPasswordValidation(password, newPassword)}
        style={{
          width: "80%",
          alignSelf: "center",
          height: 40,
          borderRadius: 10,
          alignItems: "center",
          top: high / 4,
          justifyContent: "center",
          backgroundColor: "#1E2E46",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            fontSize: 16,
            color: "white",
          }}
        >
          Update
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
