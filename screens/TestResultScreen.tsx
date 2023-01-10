import React, { useEffect } from "react";
import { View, Text } from "../components/Themed";
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Dimensions,
} from "react-native";
import { SafeAreaFrameContext } from "react-native-safe-area-context";
import ResultScreenCard from "../components/ResultScreenCard";
import { TestResultData } from "../data/TestResultData";
import FinishButtonTest from "../components/FinishTestButton";
import { CurrentRenderContext } from "@react-navigation/native";
import QuestionNoContainer from "../components/QuestionNoContainer";
import navigation from "../navigation";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
const TestResultScreen = (props: any) => {
  useEffect(() => {
    const backbuttonHander = () => {
      props.navigation.goBack();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });
  return (
    <View
      style={{
        top: high / 12,
        width: "90%",
        height: "75%",
        display: "flex",
        alignSelf: "center",
        borderRadius: 22,
        padding: "2%",
      }}
    >
      <View
        style={{
          display: "flex",
          height: "6%",
          alignItems: "flex-end",
          marginRight: "6%",
          marginTop: "4%",
          borderRadius: 25,
        }}
      >
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            style={{ height: "70%", padding: 15 }}
            resizeMode="cover"
            source={require("../assets/images/close.png")}
          ></Image>
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ margin: 10 }}
          resizeMode="cover"
          source={require("../assets/images/Trophy.png")}
        ></Image>
        <Text
          style={{ fontSize: 25, marginTop: "1%", fontFamily: "Poppins-Bold" }}
        >
          SSC CGL Mock Test 1
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          marginTop: "6%",
        }}
      >
        {TestResultData.map((res) => {
          return (
            <ResultScreenCard
              key={Math.random() * 100}
              fullMarks={res?.fullMarks}
              marks={res?.marks}
              name={res?.type}
              icon_url={res?.icon_url}
            />
          );
        })}
      </View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <View
          style={{
            width: "55%",
            height: 40,
            margin: 7,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "110%",
              backgroundColor: "#319EAE",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Poppins-Regular",
                fontSize: 17,
              }}
            >
              View Explanation
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TestResultScreen;
