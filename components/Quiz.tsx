import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Share,
} from "react-native";
import { Linking } from "react-native";
import { Text, View } from "../components/Themed";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function Quiz(props: any) {
  const { title, subjectName, description, fileName } = props.item;
  const [like, setLike] = useState<boolean>(false);
  const shareQuiz = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => {}}
        style={{
          width: "90%",
          padding: 16,
          marginBottom: high / 42.7,
          borderRadius: 20,
          borderWidth: 1.5,
          borderColor: "#E8E8E8",
          backgroundColor: "#FAFAFB",
          alignSelf: "center",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#FAFAFB",
            borderRadius: 20,
            justifyContent: "space-between",
            borderWidth: 0,
            alignSelf: "center",
            width: "100%",
          }}
        >
          <Text allowFontScaling={false} style={styles.cardText}>
            {title}
          </Text>
          <Image
            source={require("../assets/images/dots.png")}
            style={{ alignSelf: "center" }}
          />
        </View>
        <Text
          allowFontScaling={false}
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 10,
            color: "#92A1B8",
            paddingHorizontal: 4,
          }}
        >
          {subjectName}
        </Text>
        <Image
          style={{
            width: "100%",
            alignSelf: "center",
            height: high / 6.569,
            resizeMode: "cover",
            borderRadius: 5,
            marginVertical: high / 80,
          }}
          source={require("../assets/images/bigEnglish.png")}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: high / 70,
            marginBottom: high / 90,
            backgroundColor: "transparent",
          }}
        >
          <TouchableOpacity onPress={() => setLike(!like)}>
            {like ? (
              <FontAwesome
                style={{ marginLeft: wid / 60 }}
                name="heart"
                size={28}
                color="#319EAE"
              />
            ) : (
              <FontAwesome5
                style={{ marginLeft: wid / 60 }}
                name="heart"
                size={28}
                color="black"
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => shareQuiz()}>
            <FontAwesome
              style={{ marginLeft: wid / 20 }}
              name="share-square-o"
              size={28}
              color="black"
            />
          </TouchableOpacity>
        </View>
        {/* <Image source={{ uri: `${image}` }} style={styles.image} /> */}
        <Text allowFontScaling={false} style={styles.cardDesc}>
          {description}
        </Text>
      </TouchableOpacity>
    </>
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
