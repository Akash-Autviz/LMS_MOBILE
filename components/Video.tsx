import React, { useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";

import { Linking } from "react-native";

import { Text, View } from "../components/Themed";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function VideoComponent(props: any) {
  const { description, image, title, fileName, creationTime } = props.item;
  let detail = description;

  const [readMore, setReadMore] = useState(
    detail.length < 50 ? "Read more..." : "Read less"
  );
  useEffect(() => {
    if (readMore == "Read more...") {
      detail = props.description;
    } else {
      detail = detail.substring(0, 200);
    }
  }, [readMore]);

  const trimDate = (num: any) => {
    var str = `${num}`;
    var sliced = str.slice(0, 10);

    return sliced;
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => Linking.openURL(fileName)}
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
          {trimDate(creationTime)}
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
        {/* <Image source={{ uri: `${image}` }} style={styles.image} /> */}
        <Text allowFontScaling={false} style={styles.cardDesc}>
          {description && detail}
          <TouchableOpacity onPress={() => setReadMore("Read less")}>
            <Text style={{ color: "skyblue" }}>{readMore}</Text>
          </TouchableOpacity>
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
