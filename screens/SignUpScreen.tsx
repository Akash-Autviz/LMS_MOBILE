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
import Toast from "react-native-toast-message";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { baseUrl } from "../utils";
import { FontAwesome } from "@expo/vector-icons";

import { ActivityIndicator } from "react-native-paper";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [surName, setSurName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setLoading] = useState(false);
  const resetValue = () => {
    setLoading(false);
    setSurName("");
    setName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
  };
  const checkValidation = () => {
    setLoading(true);
    let PhoneNoRegex = new RegExp(/(0|91)?[6-9][0-9]{9}/);

    if (name == "") {
      // Toast.show({
      //   type: "info",
      //   text1: "Please Enter Name",
      //   position: "top",
      // });
      setLoading(false);
      alert("Please Enter Name");
    } else if (surName == "") {
      // Toast.show({
      //   type: "info",
      //   text1: "Please Enter Surname",
      //   position: "top",
      // });
      alert("Please Enter Surname");
      setLoading(false);
    } else if (
      !PhoneNoRegex.test(phoneNumber) ||
      phoneNumber == "" ||
      phoneNumber.length != 10
    ) {
      if (!PhoneNoRegex.test(phoneNumber)) {
        // Toast.show({
        //   type: "info",
        //   text1: "Please Enter Correct PhoneNo",
        //   position: "top",
        // });
        alert("Please Enter Correct PhoneNo");
        setLoading(false);
      } else {
        setLoading(false);
        alert("Enter 10 digit PhoneNo");
      }
      // Toast.show({
      //   type: "info",
      //   text1: "Enter 10 digit PhoneNo",
      //   position: "top",
      // });
    } else if (email == "" || !email.includes("@")) {
      alert("Please Enter Correct Email");
      setLoading(false);
      // Toast.show({
      //   type: "info",
      //   text1: "Please Enter Correct Email",
      //   position: "top",
      // });
    } else if (password == "" || password.length < 5) {
      if (password == "") {
        alert("Enter Password");
      } else {
        alert("Weak Password");
      }

      setLoading(false);
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

        Toast.show({
          type: "success",
          text1: "OTP Sent SucecesFully ",
          position: "top",
        });
        resetValue();
        navigation.navigate("Otp", {
          password: password,
          email: email,
          userId: res.data.result.id,
        } as never);
      })
      .catch((error: any) => {
        alert(error.response.data.error.message);
        setLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.header}>Create Account</Text>
            <View>
              <Text style={styles.textHeader}>Name</Text>
              <TextInput
                value={name}
                placeholder="Enter Name"
                style={styles.textInput}
                onChangeText={(data: any) => setName(data)}
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
          </View>
        </TouchableWithoutFeedback>

        <TouchableOpacity
          onPress={() => checkValidation()}
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
          {isloading ? (
            <ActivityIndicator size="small" color="#319EAE" />
          ) : (
            <>
              <Text allowFontScaling={false} style={styles.BottomText}>
                Sign Up
              </Text>
              <FontAwesome
                name="long-arrow-right"
                color={"white"}
                style={{ alignSelf: "center", left: wid / 38.4 }}
              ></FontAwesome>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginTop: high / 80,
            flexDirection: "row",
            width: wid,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text>Already have an account ? </Text>
          <Text allowFontScaling={false} style={{ color: "#309EAF" }}>
            Sign In
          </Text>
        </TouchableOpacity>
        <Toast position="top" bottomOffset={20} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFB",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    marginTop: high / 18,
    height: high / 1.4,
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
