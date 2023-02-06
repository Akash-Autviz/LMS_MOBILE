import React, { useEffect, useState } from "react";
import { BackHandler, ScrollView, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RazorpayCheckout from "react-native-razorpay";
import { useStateContext } from "./Context/ContextProvider";
import { baseUrl } from "../utils";
import axios from "axios";
import { calcValidity } from "../utils/Logics";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function CourseDetails(props: any) {
  const { userDetail, setRefresh, access_token } = useStateContext();
  const navigation = useNavigation();
  const { data } = props.route.params;
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
    "Abp-TenantId": "1",
  };
  const backbuttonHander = () => {
    navigation.navigate("TabTwo");
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  }, [backbuttonHander]);

  const [buttonValue, setButtonValue] = useState(
    data.isBuy == false ? "Buy" : "False"
  );
  const BuyCourse = () => {
    var options = {
      description: "Credits towards Coures",
      image: "https://i.imgur.com/3g7nmJC.jpg",
      currency: "INR",
      key: "rzp_test_zChmfgG09ShLe2",
      amount: data.price * 100,
      name: "Teacher's Vision",
      prefill: {
        email: userDetail.emailAddress,
        contact: "",
        name: userDetail.name,
      },
      theme: { color: "#319EAE" },
    };
    RazorpayCheckout.open(options as any)
      .then((data: any) => {
        setRefresh(new Date().getTime());
        createPayment();
        createEnrollementCoures();
      })
      .catch((error: any) => {
        createPayment();
        alert(
          `Payment Failed if Money deducted from your account.Please Contact Admin`
        );
      });
  };
  const createEnrollementCoures = async () => {
    let payload = JSON.stringify({
      studentId: userDetail.id,
      courseManagementId: data.id,
    });
    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/EnrollCourses/CreateEnrollCourse`,
      headers,
      data: payload,
    };
    axios(config)
      .then(function (response: any) {
        setButtonValue("View");
        console.log(response, "Create Enroll Success");
      })
      .catch(function (error: any) {
        console.log("Create Enroll Failed", error);
      });
  };

  const createPayment = async () => {
    var payload = JSON.stringify({
      courseManagementId: data.id,
      name: userDetail.name,
      paymentType: "Course",
      purchaseTitle: data.name,
      price: data.price,
    });
    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/Payment/CreatePayment`,
      headers,
      data: payload,
    };
    axios(config)
      .then(function (response: any) {
        console.log("Create payment Api Sucess");
      })
      .catch(function (error: any) {
        console.log("create payment APi", error);
      });
  };
  const goToPurchasePage = () => {
    props.navigation.navigate("Purchased", {
      id: data.id,
    });
  };
  return (
    <ScrollView style={{ flex: 1, marginBottom: 100 }}>
      <View
        style={{
          alignItems: "center",
          marginTop: high / 30,
        }}
      >
        {data.imagePath ? (
          <Image
            source={{ uri: data.imagePath }}
            style={{
              width: wid / 1.12,
              height: high / 3,
              borderRadius: 10,
              resizeMode: "contain",
              backgroundColor: "transparent",
            }}
          ></Image>
        ) : (
          <Image
            source={require("../assets/images/bigEnglish.png")}
            style={{
              width: wid / 1.12,
              height: high / 3,
              borderRadius: 10,
              resizeMode: "contain",
              backgroundColor: "transparent",
            }}
          ></Image>
        )}
      </View>
      <View style={{ marginTop: 10, paddingHorizontal: wid / 18 }}>
        <Text
          allowFontScaling={false}
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 22,
            marginTop: high / 60,
          }}
        >
          {data.name}
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            fontFamily: "Poppins-Regular",
          }}
        >
          {data.detail}
        </Text>
      </View>
      <View
        style={{
          borderWidth: 2,
          borderStyle: "dashed",
          borderColor: "#D1CB97",
          borderRadius: 8,
          width: wid / 1.1,
          marginTop: high / 60,
          paddingHorizontal: wid / 20,
          paddingVertical: high / 60,
          alignSelf: "center",
          justifyContent: "center",
          backgroundColor: "#F5F5F5",
          marginBottom: 20,
        }}
      >
        <View style={styles.courseDetail}>
          <Text allowFontScaling={false} style={styles.textstyle}>
            Price
          </Text>
          <Text allowFontScaling={false} style={styles.textstyle}>
            {data.price}
          </Text>
        </View>
        <View style={styles.courseDetail}>
          <Text allowFontScaling={false} style={styles.textstyle}>
            Duration
          </Text>
          <Text allowFontScaling={false} style={styles.textstyle}>
            1 Year
          </Text>
        </View>
        <View style={styles.courseDetail}>
          <Text allowFontScaling={false} style={styles.textstyle}>
            Valid Year
          </Text>
          <Text allowFontScaling={false} style={styles.textstyle}>
            {calcValidity(data.creationTime)}
          </Text>
        </View>
        <View style={styles.courseDetail}>
          <Text allowFontScaling={false} style={styles.textstyle}>
            Total
          </Text>
          <Text allowFontScaling={false} style={styles.textstyle}>
            {data.price}
          </Text>
        </View>
        <View style={{}}>
          <TouchableOpacity
            style={{
              backgroundColor: "#319EAE",
              marginTop: high / 30,
              width: wid / 1.371,
              borderRadius: 6,
              height: high / 17.08,

              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              buttonValue == "Buy" ? BuyCourse() : goToPurchasePage();
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 18,
                color: "white",
              }}
            >
              {buttonValue == "Buy" ? `Buy ${data.price}` : "View"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: "#FAFAFB",
              width: wid / 1.371,
              borderRadius: 6,
              borderWidth: 1,
              marginTop: high / 60,
              borderColor: "#F1F1F1",
              height: high / 17.08,
              alignSelf: "center",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 18,
                color: "grey",
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  loader: {
    // top: high / 2,
    // width: wid / 2,
  },
  courseDetail: {
    marginVertical: high / 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textstyle: {
    color: "#A9A9A9",
    fontFamily: "Poppins-Regular",
    fontSize: 20,
  },
});
