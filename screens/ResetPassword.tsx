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
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function ResetPassword() {
  //   var token: any = "";
  //   SecureStore.getItemAsync("access_token").then((value) => {
  //     token = value;
  //   });
  const [number, setNumber] = useState("");
  const changePassword = async (num: any) => {
    try {
      const config = {
        headers: {
          // "Abp-TenantId": "1",
        },
      };
      const res = await axios.get(
        `http://lmsapi-dev.ap-south-1.elasticbeanstalk.com/api/services/app/Account/ForgotPassword?usernameOrEmail=${num}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: 16,
          alignSelf: "center",
        }}
      >
        New Password
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
          autoCapitalize="none"
          placeholder="Enter Mobile Number"
          onChangeText={(e) => setNumber(e)}
        />
      </View>
      {/* <View
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
          autoCapitalize="none"
          placeholder="New Password"
          onChangeText={(e) => setNewPassword(e)}
        />
      </View> */}
      <TouchableOpacity
        onPress={() => changePassword(number)}
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
          Send Email
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
