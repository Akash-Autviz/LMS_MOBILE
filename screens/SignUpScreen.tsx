import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useStateContext } from "./Context/ContextProvider";
import axios from "axios";
import { baseUrl } from "../utils";
import { FontAwesome } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [focused, setFocused] = useState(false);
  const [surName, setSurName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const config = {
    "Content-Type": "application/json",
  };
  const checkValidation = () => {
    let PhoneNoRegex = new RegExp(/(0|91)?[6-9][0-9]{9}/);
    // let EmailRegex = new RegExp(
    //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    // );

    if (name.trim() == "") {
      alert("Enter Name");
    } else if (surName.trim() == "") {
      alert("Enter surName");
    } else if (
      !PhoneNoRegex.test(phoneNumber) ||
      phoneNumber == "" ||
      phoneNumber.length != 10
    ) {
      if (!PhoneNoRegex.test(phoneNumber)) {
        alert("Enter Correct PhoneNo");
      } else alert("Enter 10 digit PhoneNo");
    } else if (email == "" || !email.includes("@")) {
      alert("Enter Correct Email");
    } else if (password.trim() == "" || password.trim().length < 5) {
      alert("Weak Password");
    } else {
      signUp();
    }
  };

  const signUp = async () => {
    var data = JSON.stringify({
      name: name,
      surname: surName,
      userName: phoneNumber,
      emailAddress: email,
      password: password,
    });

    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/Account/Register`,
      headers: {
        "Content-Type": "application/json",
        "Abp-TenantId": "1",
      },
      data: data,
    };

    axios(config)
      .then((res: any) => {
        console.log("signInSucecesFull", res);
        alert("SuccessFully Account created");
        navigation.dispatch(StackActions.replace("SignIn"));
      })
      .catch((error: any) => {
        alert("Something went Wrong");
        console.log(error);
      });
  };

  // ("http://13.126.218.96/api/services/app/Account/Register");
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Create Account</Text>
          <View>
            <Text style={styles.textHeader}>Name</Text>
            <TextInput
              value={name}
              placeholder="Enter Name"
              style={styles.textInput}
              onChangeText={(data: any) => setName(data.trim())}
            />
          </View>
          <View>
            <Text style={styles.textHeader}>SurName</Text>
            <TextInput
              placeholder="Enter SurName"
              value={surName}
              style={styles.textInput}
              onChangeText={(data: any) => setSurName(data)}
            />
          </View>
          <View>
            <Text style={styles.textHeader}>Phone Number</Text>
            <TextInput
              placeholder="Enter Phone No"
              value={phoneNumber}
              textContentType="telephoneNumber"
              keyboardType="number-pad"
              style={styles.textInput}
              onChangeText={(data: any) => setPhoneNumber(data)}
            />
          </View>
          <View>
            <Text style={styles.textHeader}>Enter your email</Text>
            <TextInput
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              style={styles.textInput}
              onChangeText={(data: any) => setEmail(data)}
            />
          </View>
          <View>
            <Text style={styles.textHeader}>Password</Text>
            <TextInput
              placeholder="Enter Password"
              style={styles.textInput}
              value={password}
              onChangeText={(data: any) => setPassword(data)}
            />
          </View>

          {/* <View style={styles.btnContainer}></View> */}
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity
        onPress={checkValidation}
        style={{
          width: wid / 1.3,
          flexDirection: "row",
          height: high / 17,
          marginTop: high / 50,
          backgroundColor: "#1E2E46",
          alignSelf: "center",
          borderRadius: 14,
          justifyContent: "center",
        }}
      >
        <Text allowFontScaling={false} style={styles.BottomText}>
          Sign Up
        </Text>
        <FontAwesome
          name="long-arrow-right"
          color={"white"}
          style={{ alignSelf: "center", left: wid / 38.4 }}
        ></FontAwesome>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: high / 80, flexDirection: "row" }}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text>Already have an account ? </Text>
        <Text allowFontScaling={false} style={{ color: "#309EAF" }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFB",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    marginTop: high / 18,
    height: high / 1.5,
    justifyContent: "space-around",
  },
  header: {
    textAlign: "center",
    fontSize: 36,
    marginBottom: 48,
  },
  BottomText: {
    fontFamily: "Poppins-Regular",
    alignSelf: "center",
    color: "white",
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    fontFamily: "Poppins-Regular",
    marginBottom: 5,
    borderColor: "#DBDBDB",
    alignSelf: "center",
    paddingHorizontal: wid / 30,
    width: wid / 1.3,
    flexDirection: "row",
    borderRadius: 5,
    justifyContent: "center",
    height: high / 16.35,
  },
  textHeader: {
    fontFamily: "Poppins-Regular",
    alignSelf: "center",
    width: wid / 1.3,
    flexDirection: "row",
    borderRadius: 5,
    marginBottom: 8,
    justifyContent: "center",
  },
});
