import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { View, Text } from "./Themed";
import { FontAwesome } from "@expo/vector-icons";
import ResultModal from "./modal/Modal";
import { useStateContext } from "../screens/Context/ContextProvider";

function TestCountDownTimer({ duration, quesIndexArray }) {
  const { questionLength, setIndex, index } = useStateContext();
  const [time, setTime] = useState(duration);

  const changeColor = () => {
    let newArr = JSON.parse(JSON.stringify(arr));
    const foundEl = newArr.find((_arr, idx) => idx == index);
    if (foundEl) {
      newArr[idx].color = "Green";
    }
    setArr(newArr);
  };
  useEffect(() => {
    setTimeout(() => {
      setTime((prevtime) => prevtime - 1000);
    }, 1000);
  }, [time]);
  function getFormattedTime(milliseconds) {
    let totalSeconds = parseInt(Math.floor(milliseconds / 1000));
    let totalMinute = parseInt(Math.floor(totalSeconds / 60));
    let totalHours = parseInt(Math.floor(totalMinute / 60));
    let seconds = parseInt(totalSeconds % 60);
    let minute = parseInt(totalMinute % 60);
    let hours = parseInt(totalHours % 24);
    return ` ${hours}hr ${minute}min ${seconds}sec  `;
  }

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
          >
            {getFormattedTime(time)}
          </Text>
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
            <ResultModal quesIndexArray={quesIndexArray} />
          </TouchableOpacity>
        </View>
      </View>
      <View></View>
    </View>
  );
}
export default React.memo(TestCountDownTimer);
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
