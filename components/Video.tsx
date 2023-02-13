import React, { useState, useCallback } from "react";
import { StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";

import { Text, View } from "../components/Themed";
import { Alert } from "react-native";
import { trimDate, getVideoId } from "../utils/Logics";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function VideoComponent(props: any) {
  const [isVideoResume, setisVideoResume] = useState<boolean>(false);
  const { description, image, title, fileName, creationTime } = props.item;
  let detail = description + "";
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);
  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const [readMore, setReadMore] = useState(detail.length > 50 ? true : false);
  console.log(readMore, "ReadMore");
  return (
    <View>
      <TouchableOpacity
        onPress={() => togglePlaying}
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

        <YoutubeIframe
          height={high / 4}
          controls={true}
          play={playing}
          videoId={getVideoId(fileName)}
          onChangeState={onStateChange}
        />
        <Text allowFontScaling={false} style={styles.cardDesc}>
          {description && readMore === true ? detail.slice(0, 180) : detail}
        </Text>
        {detail.length < 179 && (
          <TouchableOpacity
            style={{}}
            onPress={() => {
              setReadMore(!readMore);
            }}
          >
            <Text
              style={{
                color: "#319EAE",
                fontSize: 14,
              }}
            >
              {readMore === true ? "... Read More" : "Read Less"}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{}}
          onPress={() => {
            setReadMore(!readMore);
          }}
        >
          <Text
            style={{
              color: "#319EAE",
              fontSize: 14,
            }}
          >
            {readMore === true ? "... Read More" : "Read Less"}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
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
