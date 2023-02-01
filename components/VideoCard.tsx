import { AntDesign } from "@expo/vector-icons";

import React from "react";

import {
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";

import { View, Text } from "../components/Themed";

const wid = Dimensions.get("window").width;

const high = Dimensions.get("window").height;

const VideoCard = (props: any) => {
  const { startTime, videoUrl, title, videoId, courseVideo } = props;

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("Videos", {
          source: videoId,
        })
      }
      style={{
        marginBottom: 15,
        marginRight: wid / 50,
        height: high / 5.53,
        width: wid / 1.35,
        borderColor: "#C9C17F",
        borderRadius: 11,
        backgroundColor: "#FAFAFB",
        borderWidth: 1,
      }}
    >
      <ImageBackground
        style={{
          height: high / 5.53,
          width: wid / 1.35,
          padding: 6,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        imageStyle={{ borderRadius: 10 }}
        source={{
          uri: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        }}
      >
        <View
          style={{
            paddingVertical: 2,

            paddingHorizontal: 6,

            backgroundColor: "#000000",

            opacity: 0.6,

            borderRadius: 10,
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: "Poppins-Regular",

              fontSize: 12,

              color: "white",
            }}
          >
            {title}
          </Text>
        </View>

        {/* <AntDesign
          style={{ alignSelf: "center", opacity: 0.7 }}
          name="youtube"
          size={60}
          color="red"
        /> */}

        {startTime && (
          <View
            style={{
              backgroundColor: "#000000",

              opacity: 0.6,

              alignContent: "center",

              width: wid / 8,

              padding: 6,

              alignItems: "center",

              justifyContent: "center",

              borderRadius: 10,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: "Poppins-Regular",

                fontSize: 12,

                color: "white",
              }}
            >
              {startTime}
            </Text>
          </View>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default VideoCard;
