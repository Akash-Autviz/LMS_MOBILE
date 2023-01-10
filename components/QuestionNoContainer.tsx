import React from "react";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";
import { useStateContext } from "../screens/Context/ContextProvider";
const wid = Dimensions.get("screen").width;
const high = Dimensions.get("screen").height;
const QuestionNoContainer = (props: any) => {
  const { index, setIndex } = useStateContext();
  
  const navigation = useNavigation();

  const { quesno } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(quesno);

        setIndex(quesno - 1),
          props.setModalVisible(false),
          navigation.navigate("Test", (quesno - 1) as never);
      }}
      style={{
        // backgroundColor?
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        // flexDirection: "row",
        alignSelf: "center",
        backgroundColor: props.color ? props.color : "#FAFAFB",
        width: wid / 7,
        margin: 8,
        height: "2.5%",
        padding: 5,
      }}
      //     : {
      //         display: "flex",

      //         alignItems: "center",
      //         borderRadius: 8,

      //         borderColor: "#EFEFEF",
      //         width: "14%",
      //         margin: 8,
      //         borderWidth: 2,
      //         height: "7%",
      //         padding: 5,
      //       }
      // }
    >
      <Text
        allowFontScaling={false}
        style={
          // backgroundColor
          // ? { fontSize: 23,fontFamily:"Poppins-Medium", color: "white" }
          { fontSize: 23, fontFamily: "Poppins-Medium" }
        }
      >
        {quesno}
      </Text>
    </TouchableOpacity>
  );
};

export default QuestionNoContainer;
