import React, { useEffect, useState } from "react";

import { BackHandler, ScrollView } from "react-native";
import { Image, Dimensions } from "react-native";
import { View, Text } from "../components/Themed";

const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;

export default function AffairsView(props: any) {
  const prop = props.route.params.item;
  useEffect(() => {
    const backbuttonHander = () => {
      props.navigation.goBack();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });
  return (
    <ScrollView
      style={{
        backgroundColor: "#FAFAFB",
        marginBottom: high / 150,
      }}
    >
      <ScrollView
        scrollEnabled
        style={{
          // height: high / 0.7,
          backgroundColor: "pink",
        }}
        contentContainerStyle={{ justifyContent: "center" }}
      >
        <View
          style={{
            width: wid,
            // height: high / 1.7,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "#FAFAFB",
          }}
        >
          <Image
            source={{ uri: `${prop.image}` }}
            style={{
              width: "80%",
              height: high / 4.27,
              borderRadius: 10,
              marginTop: 20,
              resizeMode: "contain",
            }}
          ></Image>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: "Poppins-Bold",
              fontSize: 22,
              alignSelf: "flex-start",
              left: wid / 12.8,
              marginTop: high / 28.46,
            }}
          >
            {prop.title}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              marginTop: high / 22.7,
              // alignSelf: "center",
              width: "85%",
              height: "auto",
            }}
          >
            {prop.description}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#FAFAFB",
          }}
        ></View>
      </ScrollView>
    </ScrollView>
  );
}
