import * as React from "react";
import { Checkbox } from "react-native-paper";
import { TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import { View, Text } from "../components/Themed";
import { Item } from "react-native-paper/lib/typescript/components/List/List";
const wid = Dimensions.get("screen").width;
const high = Dimensions.get("screen").height;
export default function AnswerOption(props: any) {
  let currColor = props.isSelected ? "#81DBDB" : "#FAFAFB";

  return (
    <View
      style={{
        paddingHorizontal: wid / 19.2,
        display: "flex",
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FAFAFB",
      }}
    >
      <View
        style={{
          backgroundColor: "#FAFAFB",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={{ marginRight: wid / 38.4, backgroundColor: "#FAFAFB" }}
          resizeMode="cover"
          source={require("../assets/images/OptionDots.png")}
        ></Image>
        <Text style={{ fontFamily: "Poppins-Bold", fontSize: 20 }}>
          {props.title ? props.title : "No Option"}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "86%",
          height: high / 16,
          backgroundColor:
            props.isSelected === "isSelected" ? "#319EAE" : "#FAFAFB",
          borderStyle: "dashed",
          borderColor:
            props.isSelected === "isSelected" ? "#319EAE" : "#C9C17F",
          borderWidth: 1.5,
          borderRadius: 25,
          marginHorizontal: "3%",
          paddingHorizontal: wid / 19.2,
          paddingVertical: 0.6,
        }}
      >
        <View style={{ backgroundColor: "transparent" }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 12,
              color: props.isSelected === "isSelected" ? "#FFFFFF" : "black",
              fontFamily: "Poppins-Medium",
              backgroundColor: "transparent",
            }}
          >
            {props.text}
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});
