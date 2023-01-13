import React, { useEffect, useState } from "react";
import { BackHandler, ScrollView, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity, Image, Dimensions } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from "../utils";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function CourseDetails(props: any) {
  const [courseData, setCourseData] = useState<any>([]);
  const navigation = useNavigation();
  const [dataTrue, setDataTrue] = useState(false);
  const Courseid = props.route.params.id;
  const [isTrue, setIsTrue] = useState(false);
  const calcValidity = (num: any) => {
    var str = `${num}`;
    var sliced = str.slice(0, 10);

    return sliced;
  };
  useEffect(() => {
    const backbuttonHander = () => {
      navigation.navigate("TabTwo");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });

  function checkNull($value: any) {
    if ($value == null) {
      return "";
    } else {
      return $value;
    }
  }

  const calculate = (num1: number, num2: number) => {
    return (num1 * num2) / 100;
  };
  const calcTotal = (num1: number, num2: number) => {
    return num1 + (num1 * num2) / 100;
  };
  useEffect(() => {
    const backbuttonHander = () => {
      props.navigation.goBack();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });
  useEffect(() => {
    SecureStore.getItemAsync("access_token").then((value: any) => {
      if (value != null) {
        getCourseDetails(value, Courseid);
      }
    });
  });
  useEffect(() => {
    setTimeout(() => {
      setDataTrue(true);
    }, 1000);
  }, []);
  const getCourseDetails = async (token: any, id: any) => {
    var data = "";
    var config = {
      method: "get",
      url: `${baseUrl}/api/services/app/CourseManagementAppServices/GetCourseContent?courseId=${Courseid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response: any) {
        setCourseData(response.data.result[0]);
        if (courseData.courseManagement.name == null) {
          setIsTrue(false);
        } else {
          setIsTrue(true);
        }
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };

  return isTrue ? (
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
          {courseData.courseManagement.imagePath == null ? (
            <Image
              source={require("../assets/images/bigEnglish.png")}
              style={{
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
              source={{ uri: `${courseData.courseManagement.imagePath}` }}
              style={{
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
            {courseData.courseManagement.name}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              top: high / 21.35,
              alignSelf: "flex-start",
              left: wid / 12.7,
              height: "auto",
              width: "88%",
              // marginBottom: high / 15,
            }}
          >
            {courseData.courseManagement.detail}
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
                color: "#A9A9A9",
                alignSelf: "flex-start",
                left: wid / 12.8,
                fontFamily: "Poppins-Regular",
                fontSize: 20,
                top: high / 5.33,
              }}
            >
              TAX (8.25 %)
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                color: "black",
                alignSelf: "flex-start",
                left: wid / 12.8,
                fontFamily: "Poppins-Regular",
                fontSize: 20,
                top: 160,
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
              $ {courseData.courseManagement.price}
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
              {calcValidity(courseData.courseManagement.creationTime)}
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                color: "black",
                alignSelf: "flex-end",
                right: 20,
                fontFamily: "Poppins-Regular",
                fontSize: 20,
                top: high / 5.33,
              }}
            >
              $ {calculate(courseData.courseManagement.price, 8.25)}
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                color: "black",
                alignSelf: "flex-end",
                right: 20,
                fontFamily: "Poppins-Regular",
                fontSize: 20,
                top: high / 4.27,
              }}
            >
              ${calcTotal(courseData.courseManagement.price, 8.25)}
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
        >
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 18,
              color: "white",
            }}
          >
            Buy $ {calcTotal(courseData.courseManagement.price, 8.25)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
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
  ) : !dataTrue ? (
    <ActivityIndicator color={"grey"} size={"large"} style={styles.loader} />
  ) : (
    <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
      <Text style={{ fontFamily: "Poppins-Medium", fontSize: 16 }}>
        No Data Available
      </Text>
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
