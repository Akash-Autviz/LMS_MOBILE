import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import HeaderNav from "../components/HeaderNav";
import TestCountDownTimer from "../components/TestCountDownTimer";
import TestTypeButton from "../components/TestTypeButton";
const high = Dimensions.get("window").height;
const wid = Dimensions.get("window").width;
const MockTestTypeTest = (props: any) => {
  return (
    <View style={{ height: high, width: wid, paddingBottom: 10 }}>
      <View style={{ backgroundColor: "#F7F7F7" }}>
        <HeaderNav name="Mock Test" navigation={props.navigation} />
      </View>
      <View style={{ backgroundColor: "#FAFAFB" }}>
        <TestCountDownTimer />
      </View>
      <View
        style={{
          alignSelf: "center",
          justifyContent: "space-around",
        }}
      >
        <TestTypeButton title={"Physics"} />
        <TestTypeButton title={"English"} />
        <TestTypeButton title={"Math"} />
        <TestTypeButton title={"Math"} />
        <TestTypeButton title={"Math"} />
      </View>
    </View>
  );
};

export default MockTestTypeTest;

const styles = StyleSheet.create({});
