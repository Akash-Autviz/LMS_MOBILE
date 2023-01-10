import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { Dimensions } from "react-native";
import { View, Text } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import ResultModal from "./modal/Modal";
import moment from "moment";
const wid = Dimensions.get("screen").width;
const high = Dimensions.get("screen").height;

export default function TestCountDownTimer(props: any) {
  let startTime = moment();
  // console.log(moment("2022-12-27T19:31:30.399").diff(new Date()));

  //   timer = endTime.diff(startTime, 'second');

  //   config = { leftTime: this.timer };

  // .timeStart = true

  // timer = endTime.diff(startTime, "second");
  // const tick = () => {
  //   if (hrs === 0 && mins === 0 && secs === 0) reset();
  //   else if (mins === 0 && secs === 0) {
  //     setTime([hrs - 1, 59, 59]);
  //   } else if (secs === 0) {
  //     setTime([hrs, mins - 1, 59]);
  //   } else {
  //     setTime([hrs, mins, secs - 1]);
  //   }
  // };

  // const reset = () =>
  //   setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

  // React.useEffect(() => {
  //   const timerId = setInterval(() => tick(), 1000);
  //   return () => clearInterval(timerId);
  // }, []);
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <View></View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            left: 20,
            backgroundColor: "#F3FBFC",
          }}
        >
          <View
            style={{
              alignSelf: "center",
              backgroundColor: "transparent",
              marginRight: 10,
              justifyContent: "center",
            }}
          >
            <FontAwesome name="clock-o" size={30} />
          </View>

          <Text
            allowFontScaling={false}
            style={{
              fontFamily: "Poppins-Medium",
              alignSelf: "center",
              fontSize: 18,
              backgroundColor: "#F3FBFC",
            }}
          ></Text>
        </View>
        <View
          style={{
            width: 47,
            height: 47,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 11,
          }}
        >
          <TouchableOpacity
            style={{
              width: 47,
              height: 47,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 11,
            }}
          >
            <ResultModal />
          </TouchableOpacity>
        </View>
      </View>
      <View></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3FBFC",
    padding: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
  },

  profileConatiner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3FBFC",
  },
  RectangleMenuContainer: {
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    padding: 8,
  },
  RectangleImgContainer: {
    margin: 2,
  },
});
