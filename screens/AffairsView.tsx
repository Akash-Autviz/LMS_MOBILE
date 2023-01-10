import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackHandler, ScrollView } from "react-native";
import { TouchableOpacity, Image, Dimensions } from "react-native";
import { View, Text } from "../components/Themed";
import { McqData } from "../data/McqData";
import AnswerOption from "../components/AnswerOption";
import ButtonComponent from "../components/ButtonComponent";
import { Buttontypes } from "../data/ButtonProps";
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
            {prop.subjectName}
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
        >
          <View
            style={{
              marginTop: high / 18.35,
              bottom: high / 42.7,
              paddingHorizontal: wid / 19.2,
              backgroundColor: "#FAFAFB",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 18,
                fontFamily: "Poppins-Bold",
                alignSelf: "flex-start",
              }}
            >
              Q.1 : Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Sit eaque aliquam facilis id voluptas.
            </Text>
          </View>
          <View
            style={{ backgroundColor: "#FAFAFB", marginBottom: high / 14.23 }}
          >
            {McqData.map((e: any) => {
              return (
                <View
                  style={{
                    marginVertical: high / 71.16,
                    backgroundColor: "#FAFAFB",
                  }}
                >
                  <AnswerOption text={e.content} />
                </View>
              );
            })}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              bottom: high / 21.35,
              marginBottom: high / 15,
              backgroundColor: "#FAFAFB",
            }}
          >
            {Buttontypes.map((type) => {
              return (
                <ButtonComponent
                  key={type.key}
                  text={type.buttonText}
                  borderColor={type.borderColor}
                  borderWidth={type.borderWidth}
                  borderStyle={type.borderStyle}
                  borderRadius={type.borderRadius}
                  backgroudColor={type.backgroudColor}
                  textColor={type.textColor}
                  marginRight={type.marginRight}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
}
