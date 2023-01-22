import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Text, View } from "../components/Themed";
import AnswerOption from "./AnswerOption";

const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function Quiz(props: any) {
  // const { title, subjectName, description, fileName } = props.item;
  const [like, setLike] = useState<boolean>(false);
  const [answer, setAnswer] = useState("");
  const { data, index } = props;
  console.log(data, index);
  // const shareQuiz = async () => {
  //   try {
  //     const result = await Share.share({
  //       message:
  //         "React Native | A framework for building native apps using React",
  //     });
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error: any) {
  //     alert(error.message);
  //   }
  // };
  return (
    <View>
      <ScrollView
        style={{
          backgroundColor: "#FAFAFB",
          marginBottom: 20,
        }}
      >
        <View
          style={{
            marginVertical: high / 100,
            paddingHorizontal: wid / 19.2,
            backgroundColor: "#FAFAFB",
          }}
        >
          <Text
            allowFontScaling={false}
            style={{ fontSize: 13, fontFamily: "Poppins-Bold" }}
          >
            {index + 1} {data.question.questions}
          </Text>
        </View>
        <View style={{ backgroundColor: "#FAFAFB" }}>
          <View
            style={{
              marginVertical: high / 71.166,
              backgroundColor: "#FAFAFB",
            }}
          >
            <TouchableOpacity onPress={() => setAnswer("a")}>
              {answer == "a" ? (
                <AnswerOption
                  key={1}
                  title={"A"}
                  text={data.question.option1}
                  isSelected={"isSelected"}
                />
              ) : (
                <AnswerOption
                  key={2}
                  title={"A"}
                  text={data.question.option1}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAnswer("b")}>
              {answer == "b" ? (
                <AnswerOption
                  key={3}
                  title={"B"}
                  text={data.question.option2}
                  isSelected={"isSelected"}
                />
              ) : (
                <AnswerOption
                  key={4}
                  title={"B"}
                  text={data.question.option2}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAnswer("c")}>
              {answer == "c" ? (
                <AnswerOption
                  key={5}
                  title={"C"}
                  text={data.question.option3}
                  isSelected={"isSelected"}
                />
              ) : (
                <AnswerOption
                  key={6}
                  title={"C"}
                  text={data.question.option3}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAnswer("d")}>
              {answer == "d" ? (
                <AnswerOption
                  key={8}
                  title={"D"}
                  text={data.question.option4}
                  isSelected={"isSelected"}
                />
              ) : (
                <AnswerOption
                  key={9}
                  title={"D"}
                  text={data.question.option4}
                />
              )}
            </TouchableOpacity>
          </View>
          {answer ? (
            <>
              {answer != data.question.answer ? (
                <View style={{ alignSelf: "center" }}>
                  <Text style={{ color: "red", fontSize: 18 }}>
                    Wrong Answer The correct Answer is{" "}
                    {data.question.answer.toUpperCase()}
                  </Text>
                </View>
              ) : (
                <View style={{ alignSelf: "center" }}>
                  <Text style={{ color: "green", fontSize: 18 }}>
                    Correct Answer
                  </Text>
                </View>
              )}
            </>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: wid / 1.2,
    height: wid / 2.4,
    borderRadius: 10,
    alignSelf: "center",
  },
  cardDesc: {
    alignSelf: "center",
    fontFamily: "Poppins-Medium",
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardText: {
    fontFamily: "Poppins-Bold",
    fontSize: 17,
    fontWeight: "700",
    width: "80%",
    paddingHorizontal: 4,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
// {/* <TouchableOpacity style={styles.topicCntr}>
//   <View
//     style={{
//       width: wid / 5.4,
//       height: wid / 5.4,
//       borderRadius: 10,
//       alignSelf: "center",
//       right: wid / 9.6,
//     }}
//   >
//     {/* <Image
//             source={props.item.course.imagePath}
//             style={{
//               width: wid / 5.4,
//               height: wid / 5.4,
//               borderRadius: 10,
//             }}
//           /> */}
//   </View>
//   <View
//     style={{
//       flexDirection: "column",
//       backgroundColor: "#FAFAFB",
//       width: wid / 3,
//       height: high / 15,
//     }}
//   >
//     <Text
//       allowFontScaling={false}
//       style={{
//         fontFamily: "Poppins-Regular",
//         fontSize: 17,
//         right: wid / 19.2,
//         fontWeight: "700",
//       }}
//     >
//       {/* {props.item.course.name} */}
//     </Text>
//     <View
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
//         {/* {props.item.course.numTopics} Topic */}
//       </Text>
//     </View>
//   </View>
//   <Image
//     source={require("../assets/images/arow.png")}
//     style={{ left: wid / 12.8 }}
//   />
// </TouchableOpacity>;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   number: {
//     fontFamily: "Poppins-Regular",
//     left: wid / 50,
//     fontSize: 16,
//   },
//   topicCntr: {
//     height: high / 7.87,
//     flexDirection: "row",
//     marginBottom: high / 75.4,
//     borderRadius: 11,
//     justifyContent: "center",
//     borderWidth: 1,
//     alignSelf: "center",
//     alignItems: "center",
//     borderColor: "#F1F1F1",
//     width: "90%",
//     backgroundColor: "#FAFAFB",
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: "80%",
//   },
// }); */}
