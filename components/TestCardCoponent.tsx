import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../screens/Context/ContextProvider";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StackActions } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import { baseUrl } from "../utils";
import moment from "moment";

const high = Dimensions.get("window").height;
const wid = Dimensions.get("window").width;

const TestCardCoponent = (props: any) => {
  const { data, title, setTestRefresh } = props;
  const {
    id,
    isBuy,
    isReattempt,
    isDeleted,
    isResulted,
    isSubmitted,
    isView,
    mockTestId,
    studentId,
    mockTest,
  } = data;
  const navigation = useNavigation();
  let currrentCourseData: any = {
    id: id,
    isReattempt: isReattempt,
    isSubmitted: isSubmitted,
    isView: isView,
    studentId: studentId,
    isBuy: isBuy,
    isResulted: isResulted,
    isDeleted: isDeleted,
    mockTestId: mockTestId,
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      GetUserMockTestSection();
    });

    return unsubscribe;
  }, [navigation]);
  // const [currrentCourseData, SetCurrrentCourseData] = useState<any>();
  const [mockTestSectionData, setmockTestSectionData] = useState<any>([]);
  const { access_token } = useStateContext();

  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
      // "Abp-TenantId": "1",
      // "Access-Control-Allow-Origin": `http://192.168.18.95:19000`,
    },
  };

  const start = async (data: any) => {
    const { id, isView } = data;
    setTestRefresh(new Date().getTime());
    if (isView) {
      Alert.alert(
        "Do you want to Resume the  mocktest...!!",
        "If you select Yes It will resume the test otherwise If you select Cancel it will start again",
        [
          {
            text: "Resume",
            onPress: () => {
              (currrentCourseData.isDeleted = "changedTheValue"),
                navigation.navigate("Test", {
                  data: currrentCourseData,
                } as never);
            },
            style: "cancel",
          },
          { text: "Cancel", onPress: () => reattempt(currrentCourseData) },
        ]
      );
    } else {
      createUserMockTestAllSection();
      MarkIsView(id);
      // navigation.dispatch(StackActions.replace("Root"));
      navigation.navigate("Test", {
        data: currrentCourseData,
      } as never);
    }
  };

  const reattempt = (data: any) => {
    const { id, isSubmitted } = data;
    // const uniqueKeySection = new Map();
    // currrentCourseData.isReattempt = "changedTheValue";
    if (isSubmitted == true) {
      MarkIsSubmitted(id);
    }
    mockTestSectionData?.forEach((element: any) => {
      element.creationTime = moment();
    });
    updateUserMockTestSection(mockTestSectionData[0]);
    (currrentCourseData.isReattempt = "changedTheValue"),
      navigation.dispatch(
        StackActions.replace("Test", { data: currrentCourseData })
      );
  };
  const headers: any = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
    "Abp-TenantId": "1",
  };

  const GetUserMockTestSection = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/services/app/MockTestUserAns/GetUserMockTestSection?mocktestId=${mockTestId}&userId=${studentId}`,
        config
      );
      if (mockTestSectionData.length < 1)
        setmockTestSectionData(res.data.result);

      console.log("GetUserMockTestSection APi HIT SUCCESS", res);
    } catch (error) {
      console.log(error, "GetUserMockTestSection");
    }
  };
  const createUserMockTestAllSection = async () => {
    try {
      var config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": " application/json",
          "Abp-TenantId": "1",
          // "Access-Control-Allow-Origin": `http://192.168.18.95:19000`,
        },
      };

      const data = JSON.stringify(mockTestSectionData);
      const res = await axios.post(
        "http://13.126.218.96/api/services/app/MockTestUserAns/CreateUserMockTestAllSection",
        data,
        config
      );
      console.log("createUserMockTestAllSection API hit true", res);
    } catch (error) {
      console.log("createUserMockTestAllSection", error);
    }
  };

  const MarkIsView = async (id: any) => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/services/app/EnrollMockTest/MarkIsView?id=${currrentCourseData.id}`,
        config
      );
      console.log("isView API hit Success");
    } catch (error) {
      console.log("MarkView Api", error);
    }
  };
  const MarkIsSubmitted = async (id: any) => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/services/app/EnrollMockTest/MarkIsSubmitted?id=${id}`,
        config
      );
      console.log("MarkIsSubmitted Api Hit Sucees", res);
    } catch (error) {
      console.log("MarkIsSubmitted", error);
    }
  };

  const updateUserMockTestSection = async (element: any) => {
    var config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": " application/json",
        "Abp-TenantId": "1",
        // "Access-Control-Allow-Origin": `http://192.168.18.95:19000`,
      },
    };
    const data = JSON.stringify(element);
    try {
      const res = await axios.put(
        `http://13.126.218.96/api/services/app/MockTestUserAns/UpdateUserMockTestSection`,
        data,
        config
      );
      console.log("UpdateUserMockTestSection Api HIT Suceess");
    } catch (error) {
      console.log("UpdateUserMockTestSection", error);
    }
  };
  return (
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
          {title}
        </Text>
      </View>

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
          <AntDesign name="clockcircleo" size={22} color="black" />
          <Text
            allowFontScaling={false}
            style={[styles.fontColor, { marginLeft: wid / 64 }]}
          >
            {!mockTest.duration ? 60 : mockTest.duration} min
          </Text>
        </View>
        {isSubmitted == true && (
          <View style={{}}>
            <TouchableOpacity
              style={{
                marginRight: -wid / 10,
                paddingRight: -wid / 10,
                backgroundColor: "#319EAE",
                width: wid / 4,
                justifyContent: "center",
                alignContent: "center",
                height: high / 25.5,
                borderRadius: 4,
              }}
              onPress={() => {
                navigation.navigate("TestResult", {
                  id: mockTestId,
                } as never);
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
                View Result
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {!isSubmitted && (
          <View style={{}}>
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
                start(currrentCourseData);
                // reattempt(currrentCourseData);
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
                {isView == true ? "Resume" : "Start"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {isSubmitted == true && (
          <View style={{}}>
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
                reattempt(currrentCourseData);
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
                Re Attempt
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default TestCardCoponent;

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
