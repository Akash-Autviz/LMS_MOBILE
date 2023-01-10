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
export default function Password() {
  var token: any = "";
  SecureStore.getItemAsync("access_token").then((value) => {
    token = value;
  });
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const changePassword = async (password: any, newPassword: any) => {
    // const res = await axios.post(
    //   `http://lmsapi-dev.ap-south-1.elasticbeanstalk.com/api/services/app/User/ChangePassword`,
    //   { currentPassword: password, newPassword: newPassword },
    //   {
    //     headers: {
    //       // Authorization: `Bearer ${token}`,
    //       // //     // Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBhc3BuZXRib2lsZXJwbGF0ZS5jb20iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6Ijc2MWY4MmU5LWM2YWMtODE5Mi0zMDdlLTNhMDdkMGNiNjc4ZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwic3ViIjoiMSIsImp0aSI6IjNkOGFjZTlkLTQ5ZWYtNDZhNy05YTA0LWU4ZDkwNzVkZTFiNSIsImlhdCI6MTY2OTY5NzY3MCwibmJmIjoxNjY5Njk3NjcwLCJleHAiOjE2Njk3ODQwNzAsImlzcyI6IkxtcyIsImF1ZCI6IkxtcyJ9.QHelMCjOSld_dhXK0hKMV5MKcRhf-LOlNbgO5uMudvY`,
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //       //  'Content-Type: application/json-patch+json'
    //     },
    //   }
    // );
    // console.log(res);

    var data = JSON.stringify({
      currentPassword: password,
      newPassword: newPassword,
    });
    // console.log(data);
    // console.log(token);

    var config = {
      method: "post",
      url: "http://lmsapi-dev.ap-south-1.elasticbeanstalk.com/api/services/app/User/ChangePassword",
      headers: {
        Authorization: `Bearer ${token}`,
        "Abp-TenantId": "1",
        // Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBhc3BuZXRib2lsZXJwbGF0ZS5jb20iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6Ijc2MWY4MmU5LWM2YWMtODE5Mi0zMDdlLTNhMDdkMGNiNjc4ZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwic3ViIjoiMSIsImp0aSI6IjNkOGFjZTlkLTQ5ZWYtNDZhNy05YTA0LWU4ZDkwNzVkZTFiNSIsImlhdCI6MTY2OTY5NzY3MCwibmJmIjoxNjY5Njk3NjcwLCJleHAiOjE2Njk3ODQwNzAsImlzcyI6IkxtcyIsImF1ZCI6IkxtcyJ9.QHelMCjOSld_dhXK0hKMV5MKcRhf-LOlNbgO5uMudvY`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then((res: any) => {
        console.log(res);
        Alert.alert("Success", "Password Changed Successfuly", [
          { text: "Okay" },
        ]);
      })
      .catch((error: any) => {
        // console.log(config);
        Alert.alert("Invalid Entry", "Enter Password", [{ text: "Okay" }]);
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
          autoCapitalize="none"
          placeholder="New Password"
          onChangeText={(e) => setNewPassword(e)}
        />
      </View>
      <TouchableOpacity
        onPress={() => changePassword(password, newPassword)}
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
