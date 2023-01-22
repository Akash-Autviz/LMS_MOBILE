import React from "react";
import {
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { View, Text } from "./Themed";
import { useNavigation } from "@react-navigation/native";
import { useStateContext } from "../screens/Context/ContextProvider";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import RazorpayCheckout from "react-native-razorpay";
import axios from "axios";
import { trimDate, trimName, trimText } from "../utils/Logics";
import { baseUrl } from "../utils";
const high = Dimensions.get("window").height;
const wid = Dimensions.get("window").width;
export default function MockTestCard(props: any) {
  const navigation = useNavigation();
  const { mockTestId, setMockTestId, userDetail, access_token } =
    useStateContext();
  const {
    name,
    details,
    date,
    startTime,
    endTime,
    id,
    price,
    isBuy,
    isMockTest,
  } = props;
  let buy = isBuy;
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
    "Abp-TenantId": "1",
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
      .then(function (response: any) {})
      .catch(function (error: any) {
        console.log("create payment APi", error);
      });
  };

  const createCourseMockTest = async () => {
    var data = JSON.stringify({
      studentId: userDetail.id,
      courseManagementId: id,
    });
    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/EnrollMockTest/CreateCourseMockTest`,
      headers,
      data: data,
    };

    axios(config)
      .then(function (response: any) {
        alert(`Congratulations Transaction has been completed`);
      })
      .catch(function (error: any) {
        console.log("Create MockTest Failed", error);
      });
  };

  const createEnrollementCoures = async () => {
    let data = JSON.stringify({
      studentId: userDetail.id,
      courseManagementId: id,
    });
    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/EnrollCourses/CreateEnrollCourse`,
      headers,
      data: data,
    };

    axios(config)
      .then(function (response: any) {
        buy = true;
        console.log(response, "Create Enroll Success");
      })
      .catch(function (error: any) {
        console.log("Create Enroll Failed", error);
      });
  };

  const BuyCourse = () => {
    var options = {
      description: "Credits towards Coures",
      image: "https://i.imgur.com/3g7nmJC.jpg",
      currency: "INR",
      key: "rzp_test_zChmfgG09ShLe2",
      amount: price * 100,
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
        createCourseMockTest();
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

  return (
    <>
      <View
        style={{
          alignSelf: "center",
          width: "92%",
          borderStyle: "dashed",
          borderColor: "#C9C17F",
          borderWidth: 1,
          borderRadius: 11,
          marginVertical: "2%",
        }}
      >
        <View
          style={[
            styles.MockTestCard,
            styles.paddingInContainer,
            {
              justifyContent: "space-between",
              marginTop: high / 71.16,
              width: "100%",
            },
          ]}
        >
          <Text
            allowFontScaling={false}
            style={{ fontSize: 14, fontFamily: "Poppins-Bold" }}
          >
            {name.length <= 27 ? name : trimName(name)}
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.fontColor, { alignSelf: "center" }]}
          >
            Date : {trimDate(date)}
          </Text>
        </View>
        {details && (
          <View style={{ width: "95%" }}>
            <Text
              allowFontScaling={false}
              style={[
                styles.paddingInContainer,
                styles.fontColor,
                { marginTop: high / 80.16, fontSize: 13 },
              ]}
            >
              {details.length <= 18 || details.length != null
                ? trimText(details)
                : "Details Not Available"}
            </Text>
          </View>
        )}
        <View
          style={[
            styles.paddingInContainer,
            styles.MockTestCard,
            {
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: high / 80,
              marginBottom: high / 50,
            },
          ]}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            {price ? (
              <>
                <FontAwesome name="rupee" size={18} color="black" />
                <Text
                  allowFontScaling={false}
                  style={[styles.fontColor, { marginLeft: wid / 64 }]}
                >
                  {price}
                </Text>
              </>
            ) : (
              <>
                <AntDesign name="clockcircleo" size={20} color="#8A8A8A" />
                {startTime ? (
                  <Text
                    allowFontScaling={false}
                    style={[styles.fontColor, { marginLeft: wid / 64 }]}
                  >
                    {trimDate(startTime)}
                  </Text>
                ) : (
                  <Text
                    allowFontScaling={false}
                    style={[styles.fontColor, { marginLeft: wid / 64 }]}
                  >
                    1 Hour
                  </Text>
                )}
              </>
            )}
          </View>
          <View style={{}}>
            {isMockTest == true ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "#319EAE",
                  width: wid / 4,
                  justifyContent: "center",
                  alignContent: "center",
                  height: high / 25.5,
                  borderRadius: 4,
                }}
                onPress={() => {
                  navigation.navigate("Test", { id: id } as never);
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    color: "white",
                    fontFamily: "Poppins-Regular",
                    fontSize: 12,
                    alignSelf: "center",
                  }}
                >
                  Start
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "#319EAE",
                  width: wid / 4,
                  justifyContent: "center",
                  alignContent: "center",
                  height: high / 25.5,
                  borderRadius: 4,
                }}
                onPress={() => {
                  isBuy === "View"
                    ? navigation.navigate("Purchased", { id: id } as never)
                    : BuyCourse();
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    color: "white",
                    fontFamily: "Poppins-Regular",
                    fontSize: 12,
                    alignSelf: "center",
                  }}
                >
                  {buy}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  MockTestCard: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paddingInContainer: {
    paddingHorizontal: wid / 19.2,
  },
  fontColor: {
    color: "#8A8A8A",
    fontFamily: "Poppins-Regular",
  },
});
