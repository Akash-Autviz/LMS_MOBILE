import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Text, View } from "../components/Themed";
import { useStateContext } from "../screens/Context/ContextProvider";
import { baseUrl } from "../utils";
import AnswerOption from "./AnswerOption";

const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function Quiz(props: any) {
  const { access_token } = useStateContext();
  const navigate = useNavigation();
  const { title, data } = props;
  const [result, setResult] = useState(false);
  const [resultData, setResutlData] = useState({});

  const headers: any = {
    "Abp-TenantId": "1",
    Authorization: `Bearer ${access_token}`,
  };
  const getResult = async () => {
    try {
      var config = {
        method: "get",
        url: `${baseUrl}/api/services/app/BlogResult/GetBlogResult?id=${data.id}`,
        headers: headers,
      };

      const res = await axios(config);
      setResult(res.data.result != null);
      setResutlData(resultData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getResult();
  }, []);

  return (
    <View
      style={{
        alignSelf: "center",
        width: "92%",
        borderStyle: "dashed",
        borderColor: "#C9C17F",
        borderWidth: 1,
        borderRadius: 11,
        marginVertical: "2%",
      }}
    >
      <View
        style={[
          styles.paddingInContainer,
          styles.MockTestCard,
          {
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: high / 80,
            marginBottom: high / 50,
          },
        ]}
      >
        <View
          style={[
            styles.MockTestCard,
            {
              justifyContent: "space-between",
              marginTop: high / 71.16,
            },
          ]}
        >
          <Text
            allowFontScaling={false}
            style={{ fontSize: 14, fontFamily: "Poppins-Bold" }}
          >
            {title}
          </Text>
        </View>

        <View style={{}}>
          <TouchableOpacity
            style={{
              backgroundColor: "#319EAE",

              width: wid / 5,
              justifyContent: "center",
              alignContent: "center",
              height: high / 25.5,
              borderRadius: 4,
            }}
            onPress={() => {
              navigate.navigate("QuizTest", { id: data.id } as never);
              // reattempt(currrentCourseData);
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: "white",
                fontFamily: "Poppins-Regular",
                fontSize: 12,
                alignSelf: "center",
              }}
            >
              Take Test
            </Text>
          </TouchableOpacity>
        </View>
        {result && (
          <View style={{}}>
            <TouchableOpacity
              style={{
                backgroundColor: "#319EAE",
                width: wid / 4,
                justifyContent: "center",
                alignContent: "center",
                height: high / 25.5,
                borderRadius: 4,
              }}
              onPress={() => {
                navigate.navigate("TestResult", {
                  id: data.id,
                  type: "quiz",
                } as never);
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  color: "white",
                  fontFamily: "Poppins-Regular",
                  fontSize: 12,
                  alignSelf: "center",
                }}
              >
                View Result
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MockTestCard: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paddingInContainer: {
    paddingHorizontal: wid / 19.2,
  },
  fontColor: {
    color: "#8A8A8A",
    fontFamily: "Poppins-Regular",
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
