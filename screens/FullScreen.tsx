// import { StatusBar } from 'expo-status-bar';
import {
  Platform,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";
import { Dimensions } from "react-native";
import { useState } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import * as React from "react";
import { IframeHTMLAttributes } from "react";
import { FontAwesome } from "@expo/vector-icons";
import navigation from "../navigation";
import WebView from "react-native-webview";

export default function FullScreen({ route, navigation }: any) {
  React.useEffect(() => {
    const backbuttonHander = () => {
      navigation.goBack();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });
  const wid = Dimensions.get("window").width;
  const high = Dimensions.get("window").height;
  const [playing, setPlaying] = useState(true);
  const togglePlaying = () => {
    setPlaying((prev) => !prev);
    setShouldShow((prev) => !prev);
  };
  const video = React.useRef(null);
  const [shouldShow, setShouldShow] = useState(true);
  return (
    <View
      style={{
        alignSelf: "center",
        top: high / 3.25,
        left: wid / 10.5,
        height: wid,
        width: high,
        transform: [{ rotate: "90deg" }],
      }}
    >
      <View
        style={{
          height: "120%",
          position: "absolute",
          width: "120%",
          alignSelf: "center",
          left: high / 40,
          right: wid / 2,
          // backgroundColor:"pink"
        }}
      >
        <WebView
          style={{ height: "90%", width: "80%", position: "absolute" }}
          scrollEnabled={false}
          javaScriptEnabled={true}
          nestedScrollEnabled={false}
          overScrollMode="never"
          domStorageEnabled={true}
          allowsFullscreenVideo={true}
          source={{
            uri: "https://www.youtube.com/watch?v=T0f2ahOj1eA&ab_channel=BoxofficeMovieScenes&vq=480",
          }}
        />

        {/* <TouchableOpacity style={{ top: wid / 1.3, right: high / 21, backgroundColor: "pink" }} onPress={() => togglePlaying()}> 
        {shouldShow ? (
         <><FontAwesome name="play-circle-o" size={40} color="black" />
          </> ) : null} */}
        {/* </TouchableOpacity> */}
        {/* <TouchableOpacity
              style={{
                height: wid / 6.4,
                top: 1,
                width: '100%',
                // backgroundColor:"red",
                position: 'absolute',
              }} />
            <TouchableOpacity
              style={{
                height: wid / 4.26,
                top: wid / 2.648,
                width: '50%',
                // backgroundColor:"pink",
                position: 'absolute',
              }} />
            <TouchableOpacity
              style={{
                height: wid / 2.16,
                top: wid / 2.394,
                width: '50%',
                // backgroundColor:"pink",
                position: 'absolute',
              }} />
               <TouchableOpacity
              style={{
                height: wid / 20.16,
                top: wid / 1.05,
                width: '100%',
                // backgroundColor:"pink",
                position: 'absolute',
              }} />
              <TouchableOpacity
              style={{
                height: wid / 10.16,
                top: wid / 1.15,
                width: '5%',
                // backgroundColor:"pink",
                position: 'absolute',
              }} /> */}
        <TouchableOpacity
          // onPress={()=> navigation.goBack()}
          style={{
            height: wid / 6.4,
            top: wid / 40.194,
            width: "100%",
            justifyContent: "flex-start",
            // backgroundColor:"red",
            // alignItems:"center",
            position: "absolute",
          }}
        >
          {!shouldShow ? (
            <FontAwesome
              name="arrow-left"
              style={{ color: "black" }}
              allowFontScaling={false}
              size={25}
            ></FontAwesome>
          ) : null}
        </TouchableOpacity>
        {/* <TouchableOpacity
              style={{
                height: wid / 10.16,
                top: wid / 1.15,
                left : high/1.18,
                width: '10%',
                alignSelf:"center",
                backgroundColor:"red",
                position: 'absolute',
              }} /> */}
        {/* <TouchableOpacity
              onPress={()=> togglePlaying()}
              style={{
                height: wid / 6.4,
                top: wid / 2.194,
                width: '10%',
                left : high/2.5,
                justifyContent:"center",
                // backgroundColor:"red",
                alignItems:"center",
                position: 'absolute',
              }}>
                {!shouldShow ? (
              <FontAwesome name='youtube-play' style={{color  : "red"}} allowFontScaling={false} size={50}></FontAwesome> 
                ):null}
              </TouchableOpacity> */}
        {/* <TouchableOpacity
              style={{
                height: wid / 4.26,
                top: wid / 5.907,
                width: '100%',
                backgroundColor:"red",
                position: 'absolute',
              }} /> */}
      </View>
      <View
        style={{
          backgroundColor: "pink",
          width: high / 2,
          height: wid / 2,
          top: wid / 1,
        }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
