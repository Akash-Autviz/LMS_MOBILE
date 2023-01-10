import React from "react";
import { View, Text } from "./Themed";
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const wid = Dimensions.get("screen").width;
const high = Dimensions.get("screen").height;
const FinishButtonTest = (props: any) => {
  const navigation = useNavigation();
  const {
    text,
    borderWidth,
    borderStyle,
    borderColor,
    borderRadius,
    textColor,
    backgroudColor,
    marginRight,
  } = props;
  return (
    <View
      style={{
        width: "100%",
        height: high / 21.35,
        margin: 7,

        marginRight: marginRight,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("MockTest");
        }}
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
          allowFontScaling={false}
          style={{
            fontFamily: "Poppins-Regular",
            color: "white",
          }}
        >
          Finish Test
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FinishButtonTest;
