import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import HeaderNav from "../components/HeaderNav";
import { Dimensions } from "react-native";
import navigation from "../navigation";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";

const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function EnrolledCourse(props: any) {
  const trimText = (desc: string) => {
    let newDesc = desc.split(" ");
    let res = "";
    for (let i = 0; i <= 9 && i < newDesc.length; i++) {
      res += newDesc[i] + " ";
    }
    if (newDesc.length <= 10) return res;
    return res + "...";
  };
  const trimTextName = (desc: string) => {
    let newDesc = desc.split(" ");
    if (newDesc.length < 3) return desc;
    let res = "";
    for (let i = 0; i <= 3 && i < newDesc.length; i++) {
      res += newDesc[i] + " ";
    }
    return res + "...";
  };
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("Purchased", {
          navigation: { navigation },
          id: props.item.courseManagement.id,
        })
      }
      style={{
        flexDirection: "column",
        width: wid / 1.7,
        marginRight: wid / 12,
        borderColor: "#C9C17F",
        borderRadius: 11,
        borderStyle: "dashed",
        backgroundColor: "#FAFAFB",
        borderTopRightRadius: 13,
        borderTopLeftRadius: 13,
        borderWidth: 1,
      }}
    >
      <View style={{ backgroundColor: "#FAFAFB" }}>
        {props.item.courseManagement.imagePath ? (
          <Image
            resizeMode="stretch"
            style={{
              width: "101%",
              alignSelf: "center",
              marginTop: -1,
              height: high / 6.269,
              opacity: 2,
              backgroundColor: "transparent",
              borderTopRightRadius: 11,
              borderTopLeftRadius: 11,
            }}
            source={{ uri: `${props.item.courseManagement.imagePath}` }}
          ></Image>
        ) : (
          <Image
            resizeMode="stretch"
            style={{
              width: "101%",
              alignSelf: "center",
              marginTop: -1,
              height: high / 6.269,
              opacity: 2,
              backgroundColor: "transparent",
              borderTopRightRadius: 11,
              borderTopLeftRadius: 11,
            }}
            source={require("../assets/images/bigEnglish.png")}
          ></Image>
        )}
      </View>
      <View
        style={{
          justifyContent: "space-between",
          paddingHorizontal: 10,
          backgroundColor: "#FAFAFB",
          paddingTop: 15,
          paddingBottom: 10,
          borderBottomRightRadius: 13,
          borderBottomLeftRadius: 13,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            height: high / 20,
            backgroundColor: "#FAFAFB",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ fontFamily: "Poppins-Bold", fontSize: 15, width: "60%" }}
          >
            {trimTextName(props.item.courseManagement.name)}
          </Text>
          <Text style={{ fontFamily: "Poppins-Regular" }}>Valid : 1Year</Text>
        </View>
        <View
          style={{
            height: high / 19,
            backgroundColor: "#FAFAFB",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontFamily: "Poppins-Regular" }}>
            {props.item.courseManagement.detail
              ? trimText(props.item.courseManagement.detail)
              : "No Details available"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#FAFAFB",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#FAFAFB",
              alignItems: "center",
              width: wid / 5.7,
            }}
          >
            <FontAwesome name="eye" size={16} color="grey" />
            <Text style={{ fontFamily: "Poppins-Regular" }}>16 Topic</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Purchased", {
                id: props.item.courseManagement.id,
              })
            }
            style={{
              backgroundColor: "#319EAE",
              borderRadius: 20,
              width: wid / 6,
              height: high / 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                color: "#FFFFFF",
              }}
            >
              View
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
