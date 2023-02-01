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
  console.log(data);
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
    "Abp-TenantId": "1",
  };

  useEffect(() => {
    const backbuttonHander = () => {
      navigation.navigate("TabTwo");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });

  const [buttonValue, setButtonValue] = useState(
    data.isBuy == false ? "Buy" : "False"
  );
  // useEffect(() => {
  //   SecureStore.getItemAsync("access_token").then((value: any) => {
  //     if (value != null) {
  //       getCourseDetails(value, Courseid);
  //     }
  //   });
  // }, []);

  // const getCourseDetails = async (token: any, id: any) => {
  //   var data = "";
  //   var config = {
  //     method: "get",
  //     url: `${baseUrl}/api/services/app/CourseManagementAppServices/GetCourseContent?courseId=${Courseid}`,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     data: data,
  //   };

  //   axios(config)
  //     .then(function (response: any) {
  //       console.log(response);
  //       setCourseData(response.data.result[0]);
  //       setisLoading(false);
  //     })
  //     .catch(function (error: any) {
  //       console.log(error);
  //     });
  // };

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
    var data = JSON.stringify({});
    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/Payment/CreatePayment`,
      headers,
      data: data,
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
    <View
      style={{
        backgroundColor: "#F5F5F5",
        flex: 1,
        marginBottom: high / 14.23,
      }}
    >
      <ScrollView>
        <View
          style={{
            width: wid,
            height: high / 2.2,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F5F5F5",
          }}
        >
          {data.imagePath || data.imagePath == null ? (
            <Image
              source={require("../assets/images/bigEnglish.png")}
              style={{
                marginTop: high / 10,
                width: "90%",
                height: high / 3.17,
                borderRadius: 10,
                resizeMode: "contain",
                backgroundColor: "transparent",
                alignSelf: "center",
              }}
            ></Image>
          ) : (
            <Image
              source={{ uri: data.imagePath }}
              style={{
                marginTop: high / 10,
                width: "90%",
                height: high / 3.17,
                borderRadius: 10,
                resizeMode: "contain",
                backgroundColor: "transparent",
                alignSelf: "center",
              }}
            ></Image>
          )}

          <Text
            allowFontScaling={false}
            style={{
              fontFamily: "Poppins-Bold",
              fontSize: 22,
              alignSelf: "flex-start",
              left: wid / 12.8,
              top: high / 28.46,
            }}
          >
            {data.name}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              top: high / 21.35,
              alignSelf: "flex-start",
              left: wid / 12.7,
              height: "auto",
              width: "88%",
            }}
          >
            {data.detail}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 2,
            marginBottom: high / 10.675,
            marginTop: high / 15,
            borderStyle: "dashed",
            borderColor: "#D1CB97",
            height: high / 1.3,
            borderRadius: 8,
            top: high / 14.23,
            width: "90%",
            alignSelf: "center",
            flexDirection: "row",
            backgroundColor: "#F5F5F5",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              height: high / 2,
              width: "50%",
              justifyContent: "flex-start",
              alignContent: "center",
              alignItems: "center",
              backgroundColor: "#F5F5F5",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: "#A9A9A9",
                alignSelf: "flex-start",
                left: wid / 12.8,
                fontFamily: "Poppins-Regular",
                fontSize: 20,
                top: high / 21.35,
              }}
            >
              Price
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                color: "#A9A9A9",
                alignSelf: "flex-start",
                left: wid / 12.8,
                fontFamily: "Poppins-Regular",
                fontSize: 20,
                top: high / 10.675,
              }}
            >
              Duration
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                color: "#A9A9A9",
                alignSelf: "flex-start",
                left: wid / 12.8,
                fontFamily: "Poppins-Regular",
                fontSize: 20,
                top: 100,
              }}
            >
              Valid Year
            </Text>

            <Text
              allowFontScaling={false}
              style={{
                color: "black",
                alignSelf: "flex-start",
                left: wid / 12.8,
                fontFamily: "Poppins-Regular",
                fontSize: 20,
                top: 135,
              }}
            >
              Total
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              height: high / 2,
              width: "50%",
              backgroundColor: "#F5F5F5",
              alignSelf: "flex-start",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: "black",
                alignSelf: "flex-end",
                right: 20,
                fontFamily: "Poppins-Regular",
                fontSize: 20,
                top: high / 21.35,
              }}
            >
              {data.price}
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                color: "black",
                alignSelf: "flex-end",
                right: 20,
                fontFamily: "Poppins-Regular",
                fontSize: 20,
                top: high / 10.675,
              }}
            >
              6 Months
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                color: "black",
                alignSelf: "flex-end",
                right: 20,
                fontFamily: "Poppins-Regular",
                fontSize: 20,
                top: high / 7.11,
              }}
            >
              {calcValidity(data.creationTime)}
            </Text>

            <Text
              allowFontScaling={false}
              style={{
                color: "black",
                alignSelf: "flex-end",
                right: 20,
                fontFamily: "Poppins-Regular",
                fontSize: 20,
                top: high / 5.57,
              }}
            >
              {data.price}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#319EAE",
            width: wid / 1.371,
            borderRadius: 6,
            height: high / 17.08,
            alignSelf: "center",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            bottom: high / 3.84,
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
            borderColor: "#F1F1F1",
            height: high / 17.08,
            alignSelf: "center",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            bottom: high / 4.54,
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
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    top: high / 2,
    left: wid / 2.1,
  },
});
