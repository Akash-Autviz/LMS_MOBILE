import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";

import { Text } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";
import { useStateContext } from "../screens/Context/ContextProvider";
const wid = Dimensions.get("screen").width;
const high = Dimensions.get("screen").height;
const QuestionNoContainer = (props: any) => {
  const { index, setIndex } = useStateContext();

  const { quesno, color } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        setIndex(quesno - 1);
        props.setModalVisible(false);
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,

        alignSelf: "center",
        backgroundColor: color ? color : "#FAFAFB",
        width: wid / 7,
        margin: 8,
        height: "2.5%",
        padding: 5,
      }}
    >
      <Text
        allowFontScaling={false}
        style={{
          fontSize: 23,
          fontFamily: "Poppins-Medium",
          color: color ? "#FAFAFB" : "black",
        }}
      >
        {quesno}
      </Text>
    </TouchableOpacity>
  );
};

export default QuestionNoContainer;
