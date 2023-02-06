import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import WebView from "react-native-webview";

import { Text } from "../components/Themed";
import { trimTextName } from "../utils/Logics";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function CurrentAffairs(props: any) {
  console.log(props.item);
  const { title, description, image } = props.item;

  return (
    <ScrollView
      style={{
        backgroundColor: "#FAFAFB",
      }}
      contentContainerStyle={{ justifyContent: "flex-start" }}
    >
      {image ? (
        <TouchableOpacity
          style={styles.topicCntr}
          onPress={() =>
            props.navigation.navigate("Affairs", {
              item: props.item,
            })
          }
        >
          <View
            style={{
              height: "30%",
              width: "20%",
              backgroundColor: "#FAFAFB",
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                resizeMode: "contain",
                backgroundColor: "#FAFAFB",
                width: wid / 6.4,
                height: wid / 6.4,
              }}
              source={{ uri: `${image}` }}
            ></Image>
          </View>
          <View
            style={{
              paddingVertical: high / 180,
              alignSelf: "flex-start",
              width: wid / 2,
              flexDirection: "column",
              backgroundColor: "transparent",
            }}
          >
            <Text
              style={{
                backgroundColor: "transparent",
                marginVertical: 2,
                fontFamily: "Poppins-Bold",
                fontSize: 18,
              }}
            >
              {title}
            </Text>
            {trimTextName(description).charAt(0) != "<" ? (
              <Text
                style={{
                  backgroundColor: "transparent",
                  marginVertical: 2,
                  fontFamily: "Poppins-Regular",
                  fontSize: 12,
                }}
              >
                {trimTextName(description)}
              </Text>
            ) : (
              <View>
                <WebView
                  style={{
                    backgroundColor: "transparent",
                    width: wid / 1.8,
                    height: high / 28,
                  }}
                  originWhitelist={["*"]}
                  source={{
                    html: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=0.3"></head><style>
    body { font-size: 12%; word-wrap: break-word; overflow-wrap: break-word; }
</style><body>${description}</body></html>`,
                  }}
                />
              </View>
            )}
          </View>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
}
//   <Text
//     allowFontScaling={false}
//     style={{
//       fontFamily: "Poppins-Regular",
//       fontSize: 15,
//       // marginBottom: 5,

//       // right: wid / 5.1,
//       // alignSelf: "flex-start",
//       // right: wid / .2,
//       fontWeight: "700",
//     }}
//   >
//     {props.item.subjectName}
//   </Text>
//   <Text
//     allowFontScaling={false}
//     style={{
//       fontFamily: "Poppins-Regular",
//       fontSize: 9,
//       top: 10,
//       // right: wid / 5.1,
//       // alignSelf: "flex-start",
//       // right: wid / .2,
//       fontWeight: "700",
//     }}
//   >
//     {props.item.description}
//   </Text>
//   {/* <View
//       style={{
//         flexDirection: "row",
//         alignContent: "flex-end",
//         alignItems: "flex-start",
//         backgroundColor: "#FAFAFB",
//         right: wid / 20,
//       }}
//     >
//       <FontAwesome
//         name="eye"
//         size={10}
//         style={{ top: high / 186.75, color: "#8A8A8A" }}
//       />
//       <Text allowFontScaling={false} style={styles.number}>
//         {props.numTopics} Topic
//       </Text>
//     </View> */}
// </View>
// <Image
//   source={require("../assets/images/arow.png")}
//   style={{ left: 30 }}
// />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontFamily: "Poppins-Regular",
    left: wid / 50,
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  topicCntr: {
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    marginHorizontal: "5%",
    flexDirection: "row",
    borderRadius: 11,
    marginVertical: 10,
    justifyContent: "space-between",
    // top: 100,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "#F1F1F1",
    width: "90%",
    backgroundColor: "#FAFAFB",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
