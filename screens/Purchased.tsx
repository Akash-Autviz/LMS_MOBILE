import { useEffect, useState } from "react";
import React from "react";
import { StyleSheet, ScrollView, Linking } from "react-native";

import { ActivityIndicator } from "react-native-paper";
import axios from "axios";
import { TouchableOpacity, Image, Dimensions } from "react-native";
import { View, Text } from "../components/Themed";

import VideoCard from "../components/VideoCard";
import { getVideoId } from "../utils/Logics";
import TestCard from "../components/TestCard";
import { useStateContext } from "./Context/ContextProvider";
import { baseUrl } from "../utils";
import TestCardCoponent from "../components/TestCardCoponent";

const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;

export default function Purchased(props: any) {
  const [courseData, setCourseData] = useState<any>([]);
  const { access_token } = useStateContext();
  const Courseid = props.route.params.id;

  useEffect(() => {
    getCourseDetails(access_token, Courseid);
  }, []);
  const [isTrue, setIsTrue] = useState(false);
  const getCourseDetails = async (token: any, id: any) => {
    var data = "";
    var config = {
      method: "get",
      url: `${baseUrl}/api/services/app/CourseManagementAppServices/GetStudentCourse?id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response: any) {
        if (response.data.name !== null) {
          setCourseData(response.data.result);
          setIsTrue(true);
        }
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };
  const val = "Start";
  const [res, setRes] = useState("Mock Tests");
  const [color, setColor] = useState(true);
  const [color1, setColor1] = useState(false);
  const [color2, setColor2] = useState(false);
  const [color3, setColor3] = useState(false);

  const onPress = (text: string) => {
    setRes(text);
    if (text == "Mock Tests") {
      setColor(true);
      setColor1(false);
      setColor2(false);
      setColor3(false);
    } else if (text == "Notes") {
      setColor(false);
      setColor1(true);
      setColor2(false);
      setColor3(false);
    } else if (text == "Videos") {
      setColor(false);
      setColor1(false);
      setColor2(true);
      setColor3(false);
    }
    console.log(res);
  };

  return isTrue ? (
    <ScrollView style={{ backgroundColor: "#FAFAFB", flex: 1, height: high }}>
      <ScrollView
        style={{
          backgroundColor: "#FAFAFB",
        }}
      >
        <View
          style={{
            width: wid,
            justifyContent: "center",
            alignContent: "center",
            alignSelf: "center",
            flexDirection: "column",
            alignItems: "flex-start",
            backgroundColor: "#FAFAFB",
          }}
        >
          {courseData.imagePath ? (
            <Image
              source={{ uri: `${courseData.imagePath}` }}
              style={{
                width: "80%",
                top: 10,
                height: high / 3.27,
                borderRadius: 10,
                alignSelf: "center",
                resizeMode: "contain",
              }}
            ></Image>
          ) : (
            <Image
              style={{
                width: "80%",
                top: 10,
                height: high / 3.27,
                borderRadius: 10,
                alignSelf: "center",
                resizeMode: "contain",
              }}
              source={require("../assets/images/bigEnglish.png")}
            />
          )}
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: "Poppins-Bold",
              fontSize: 20,
              alignSelf: "flex-start",
              left: wid / 12.8,
              top: high / 50.46,
            }}
          >
            {courseData.name}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              top: high / 45.46,
              alignSelf: "flex-start",
              left: wid / 12.8,
              width: "90%",
              fontSize: 13,
              fontFamily: "Poppins-Regular",
              backgroundColor: "#FAFAFB",
            }}
          >
            {courseData.detail}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#FAFAFB",
            height: "100%",
            marginTop: 30,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              height: high / 17,
              alignSelf: "center",
              alignItems: "center",
              borderRadius: 116,
              borderWidth: 0.5,
              borderColor: "#EEEEEE",
              backgroundColor: "#FAFAFB",
            }}
          >
            <TouchableOpacity
              onPress={() => onPress("Mock Tests")}
              style={{
                backgroundColor: color ? "#319EAE" : "#FAFAFB",
                height: "100%",
                width: "33.4%",
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
                Mock Tests
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPress("Notes")}
              style={{
                backgroundColor: color1 ? "#319EAE" : "#FAFAFB",
                borderRadius: 116,
                height: "100%",
                width: "33.4%",
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
                Notes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPress("Videos")}
              style={{
                backgroundColor: color2 ? "#319EAE" : "#FAFAFB",
                height: "100%",
                borderRadius: 116,
                width: "33.4%",
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
                Videos
              </Text>
            </TouchableOpacity>
          </View>

          {res == "Mock Tests" ? (
            <ScrollView style={{ marginTop: 20, marginBottom: 20 }}>
              {courseData.mockTests?.map((item: any, idx: any) => {
                return (
                  <TestCardCoponent
                    key={idx}
                    id={item.id}
                    name={item.title}
                    details={item.detail}
                    date={item.creationTime}
                    button={val}
                    isMockTest={true}
                  />
                );
              })}
            </ScrollView>
          ) : null}
          {res == "Notes" ? (
            <ScrollView>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Web", {
                    url: `${courseData.notes.notesUrl}`,
                  })
                }
                style={styles.topicCntr}
              >
                <Text style={{ fontFamily: "Poppins-Medium", fontSize: 16 }}>
                  Follow to link
                </Text>
              </TouchableOpacity>
            </ScrollView>
          ) : (
            <></>
          )}
          {res == "Videos" ? (
            <ScrollView
              style={{
                marginTop: 20,
                marginBottom: high / 2,

                width: wid,
              }}
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {courseData ? (
                courseData.videos?.map((video: any) => {
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
                })
              ) : (
                <>
                  <View
                    style={{
                      justifyContent: "center",
                      alignSelf: "center",
                      backgroundColor: "#FAFAFB",

                      height: high / 4.27,
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontFamily: "Poppins-Regular",
                        alignSelf: "center",
                        fontSize: 20,
                      }}
                    >
                      No Videos Available
                    </Text>
                  </View>
                </>
              )}
            </ScrollView>
          ) : (
            <></>
          )}
          {/* </View> */}
          {/* )} */}
        </View>
      </ScrollView>
    </ScrollView>
  ) : (
    <>
      <ActivityIndicator color="#319EAE" size={"large"} style={styles.loader} />
    </>
  );
}
const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    top: high / 2,
    left: wid / 2.1,
  },
  topicCntr: {
    flexDirection: "row",
    marginTop: wid / 18.4,
    borderRadius: 11,
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    borderStyle: "dotted",
    justifyContent: "space-between",
    borderColor: "#C9C17F",
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: wid / 1.1,
    backgroundColor: "#FAFAFB",
  },
});
