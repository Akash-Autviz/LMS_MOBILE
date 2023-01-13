// import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  BackHandler,
  Platform,
  ScrollView,
} from "react-native";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import * as React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { apps } from "../data/AppData";
import HeaderNav from "../components/HeaderNav";
import * as SecureStore from "expo-secure-store";
import WebView from "react-native-webview";
import VideoCard from "../components/VideoCard";
import axios from "axios";
import { baseUrl } from "../utils";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function VideosScreen(props: any) {
  const [res, setRes] = useState("All");
  const [color, setColor] = useState(true);
  const [color1, setColor1] = useState(false);
  const [color2, setColor2] = useState(false);
  const [freeVideoData, SetFreeVideoData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const getVideoId = (url: any) => {
    var id = "";
    if (url != undefined) {
      if (url) {
        id = url.split("v=")[1];
        if (id != null) {
          if (id.includes("&")) {
            return id.split("&")[0];
          } else {
            return id;
          }
        }
      }
    }
  };
  useEffect(() => {
    const backbuttonHander = () => {
      props.navigation.navigate("PlayScreen");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });
  useEffect(() => {
    SecureStore.getItemAsync("access_token").then((value: any) => {
      if (value != null) {
        getVideoContent(value);
      }
    });
  }, []);

  const getVideoContent = async (access_token: any) => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer  ${access_token}`,
        },
      };
      const res = await axios.get(
        `${baseUrl}/api/services/app/ContentManagementService/getAllContentVideos`,
        config
      );
      console.log(res.data.result, "^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

      SetFreeVideoData(res.data.result);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  const onPress = (text: string) => {
    setRes(text);
    if (text == "All") {
      setColor(true);
      setColor1(false);
      setColor2(false);
    } else if (text == "Latest") {
      setColor(false);
      setColor1(true);
      setColor2(false);
    } else {
      setColor(false);
      setColor1(false);
      setColor2(true);
    }
  };

  const [shouldShow, setShouldShow] = useState(true);
  const [playing, setPlaying] = useState(true);
  const togglePlaying = () => {
    console.log(props.route.params.source);
    setPlaying((prev) => !prev);
    setShouldShow((prev) => !prev);
  };
  return (
    <View
      style={{
        justifyContent: "center",
        top: high / 85.4,
        backgroundColor: "#FAFAFB",
        flex: 1,
      }}
    >
      <HeaderNav name="Videos List" navigation={props.navigation} />
      {/* <View style={{height: high/3,position:'absolute',top:high/8.386,
       width:wid/0.95, left: 1, alignSelf:"center", justifyContent:"center", backgroundColor:"#FAFAFB"
}} >  */}
      <View
        style={{
          height: high / 2,
          position: "absolute",
          top: high / 8.386,
          width: wid,
          left: 1,
          alignSelf: "center",
          justifyContent: "center",
          backgroundColor: "#FAFAFB",
        }}
      >
        {/* webViewProps={{source : require("https://www.youtube.com/watch?v=T0f2ahOj1eA&ab_channel=BoxofficeMovieScenes&vq=large")}}  */}
        {/* <YoutubePlayer height={high/3} width={wid} play={playing} initialPlayerParams={{rel:false,showClosedCaptions:false, 
        preventFullScreen: true , modestbranding : true, }} videoId={'T0f2ahOj1eA'}    onPlaybackQualityChange={q => console.log(q)} 
        contentScale={1} 
/> */}
        <WebView
          // style={ {  marginTop: (Platform.OS == 'ios') ? 10 : 10,} }
          javaScriptEnabled={true}
          scrollEnabled={false}
          domStorageEnabled={true}
          cacheMode="LOAD_NO_CACHE"
          allowsFullscreenVideo={true}
          onPlaybackQualityChange={(q: any) => console.log(q)}
          source={{
            uri: `https://www.youtube.com/watch?v=${props.route.params.source}&ab_channel=BoxofficeMovieScenes&vq=large`,
          }}
        />

        <TouchableOpacity
          style={{
            height: high / 14.233,
            top: 1,
            width: "100%",
            // backgroundColor:"red",
            position: "absolute",
          }}
        />
        {/* <TouchableOpacity
    style={{
      height: high/10.116,
      top : high/4.494,
      width: '100%',
      alignSelf: "flex-start",
      backgroundColor:"red",
      position: 'absolute',
    }}
    /> */}
        <TouchableOpacity
          style={{
            height: high / 19.488,
            top: high / 13.138,
            width: "14%",
            left: wid / 1.4,
            // backgroundColor:"red",
            position: "absolute",
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
          height: high / 6.21,
          backgroundColor: "#FAFAFB",
          marginTop: high / 2.95,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "81%",
            height: high / 17,
            marginBottom: high / 62.7,
            alignSelf: "center",
            alignItems: "center",
            borderRadius: 116,
            borderWidth: 1,
            borderColor: "#EEEEEE",
            backgroundColor: "#FAFAFB",
          }}
        >
          <TouchableOpacity
            onPress={() => onPress("All")}
            style={{
              backgroundColor: color ? "#319EAE" : "#FAFAFB",
              height: "100%",
              width: "33%",
              justifyContent: "center",
              borderRadius: 116,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: color ? "white" : "black",
                alignSelf: "center",
                fontFamily: "Poppins-Regular",
                fontSize: 15,
              }}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPress("Latest")}
            style={{
              backgroundColor: color1 ? "#319EAE" : "#FAFAFB",
              borderRadius: 116,
              height: "100%",
              width: "33%",
              justifyContent: "center",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: color1 ? "white" : "black",
                alignSelf: "center",
                fontFamily: "Poppins-Regular",
                fontSize: 15,
              }}
            >
              Latest
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPress("Favourite")}
            style={{
              backgroundColor: color2 ? "#319EAE" : "#FAFAFB",
              height: "100%",
              borderRadius: 116,
              left: 3,
              width: "33%",
              justifyContent: "center",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: color2 ? "white" : "black",
                alignSelf: "center",
                fontFamily: "Poppins-Regular",
                fontSize: 15,
              }}
            >
              Favourite
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {res == "All" ? (
        <>
          {/* <View style={{ backgroundColor: "#FAFAFB" }}> */}
          <ScrollView
            style={{
              backgroundColor: "#FAFAFB",
              // marginTop: high / 95,
              width: wid,
              // height: high / 6,
              // paddingLeft: wid / 12.8,
              alignSelf: "center",
              marginBottom: high / 8.24,
              alignContent: "center",
            }}
            contentContainerStyle={{ alignItems: "center" }}
          >
            {freeVideoData?.map((video: any) => {
              return (
                <VideoCard
                  key={video.id}
                  startTime={video.startTime}
                  videoUrl={video.videoUrl}
                  title={video.title}
                  videoId={getVideoId(video.videoUrl)}
                  navigation={props.navigation}
                />
              );
            })}
          </ScrollView>
          {/* </View> */}
        </>
      ) : (
        <></>
      )}
      {res == "Latest" ? (
        <>
          {/* <View style={{ backgroundColor: "#FAFAFB" }}> */}
          <ScrollView
            style={{
              backgroundColor: "#FAFAFB",
              // marginTop: high / 65,
              marginBottom: high / 8.24,
              width: wid,
              // height: high / 6,
              // paddingLeft: wid / 12.8,
              alignSelf: "center",
              alignContent: "center",
            }}
            contentContainerStyle={{ alignItems: "center" }}
          >
            {freeVideoData?.map((video: any) => {
              return (
                <VideoCard
                  key={video.id}
                  startTime={video.startTime}
                  videoUrl={video.videoUrl}
                  title={video.title}
                  videoId={getVideoId(video.videoUrl)}
                  navigation={props.navigation}
                />
              );
            })}
          </ScrollView>
          {/* </View> */}
        </>
      ) : (
        <></>
      )}
      {res == "Favourite" ? (
        <>
          {freeVideoData ? (
            // <View style={{ backgroundColor: "#FAFAFB" }}>
            <ScrollView
              style={{
                backgroundColor: "#FAFAFB",
                // marginTop: high / 65,
                marginBottom: high / 8.24,
                width: wid,
                // height: high / 6,
                // paddingLeft: wid / 12.8,
                alignSelf: "center",
                alignContent: "center",
              }}
              contentContainerStyle={{ alignItems: "center" }}
            >
              {freeVideoData.map((video: any) => {
                return (
                  <VideoCard
                    key={video.id}
                    startTime={video.startTime}
                    videoUrl={video.videoUrl}
                    title={video.title}
                    videoId={getVideoId(video.videoUrl)}
                    navigation={props.navigation}
                  />
                );
              })}
            </ScrollView>
          ) : (
            // </View>
            <View>
              <Text>No Video Available</Text>
            </View>
          )}
        </>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  topicCntr: {
    height: high / 4.47,
    flexDirection: "row",
    marginBottom: high / 190.4,
    borderRadius: 11,
    justifyContent: "center",
    // borderWidth : 1,
    alignSelf: "center",
    alignItems: "center",
    borderColor: "#F1F1F1",
    width: "95%",
    backgroundColor: "#FAFAFB",
  },
});
