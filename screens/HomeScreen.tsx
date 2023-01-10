import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  BackHandler,
  StyleSheet,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { apps } from "../data/AppData";
import { View, Text } from "../components/Themed";
import * as SecureStore from "expo-secure-store";
import HeaderNav from "../components/HeaderNav";
import EnrolledCourse from "../components/EnrolledCourse";
import axios from "axios";
import VideoCard from "../components/VideoCard";
import { useStateContext } from "./Context/ContextProvider";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function HomeScreen({ route, navigation }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [enrData, SetEnrData] = useState<any>([]);
  const [freeVideoData, SetFreeVideoData] = useState<any>([]);
  const { userDetail, setUserDetail } = useStateContext();

  const getUserData = async (token: any) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Abp-TenantId": "1",
    };
    let data = "";
    const config = {
      method: "GET",
      url: `http://lmsapi-dev.ap-south-1.elasticbeanstalk.com/api/services/app/Session/GetCurrentLoginInformations`,
      headers,
      data: data,
    };
    await axios(config)
      .then(function async(response: any) {
        if (response.data.result.user != null) {
          setUserDetail(response.data.result.user);
        }
        console.log(userDetail, "userDETAIL fafa");
      })
      .catch(function (error: any) {
        console.log(userDetail, "userDETAIL fafa");
      });
  };
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
    SecureStore.getItemAsync("access_token").then((value: any) => {
      getUserData(value);
      SecureStore.getItemAsync("userId1").then((userId: any) => {
        if (value != null) {
          GetEnrolledCourseInformation(value, userId);
          getVideoContent(value);
        }
      });
    });
  }, []);
  useEffect(() => {
    const backbuttonHander = () => {
      navigation.navigate("Home");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });

  const getVideoContent = async (access_token: any) => {
    // setIsLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer  ${access_token}`,
        },
      };
      const res = await axios.get(
        "http://lmsapi-dev.ap-south-1.elasticbeanstalk.com/api/services/app/ContentManagementService/getAllContentVideos",
        config
      );
      SetFreeVideoData(res.data.result);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const GetEnrolledCourseInformation = async (
    access_token: any,
    userId: any
  ) => {
    // setIsLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer  ${access_token}`,
        },
      };
      const res = await axios.get(
        `http://lmsapi-dev.ap-south-1.elasticbeanstalk.com/api/services/app/EnrollCourses/GetAllEnrollCourses?studentId=${userId}`,
        config
      );
      SetEnrData(res.data.result);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <View style={{ width: wid, flex: 1, height: high }}>
      {isLoading === true ? (
        <View style={{ alignSelf: "center", top: high / 4.5 }}>
          <ActivityIndicator size="large" color="#319EAE" />
        </View>
      ) : (
        <>
          <HeaderNav name={"DashBoard"} />
          <ScrollView style={{ backgroundColor: "#FAFAFB" }}>
            <View
              style={{
                top: high / 85.4,
                backgroundColor: "#FAFAFB",
                width: wid / 0.45,
              }}
            >
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={apps}
                renderItem={({ item }) => (
                  <>
                    <View
                      style={{
                        height: high / 5.53,
                        width: wid / 1.76,
                        marginRight: wid / 15.8,
                        left: wid / 12.8,
                        borderColor: "#C9C17F",
                        borderRadius: 11,
                        backgroundColor: "#FAFAFB",
                        borderWidth: 1,
                        marginBottom: high / 42.7,
                      }}
                    >
                      <ImageBackground
                        style={{ width: "100%", height: "100%" }}
                        imageStyle={{ borderRadius: 10 }}
                        source={require("../assets/images/ongoing.png")}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            backgroundColor: "transparent",
                            top: high / 42.7,
                            alignContent: "center",
                          }}
                        >
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontFamily: "Poppins-Regular",
                              fontSize: 14,
                              left: 10,
                            }}
                          >
                            {item.dashDetail}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            top: high / 9,
                            backgroundColor: "transparent",
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              width: wid / 5.48,
                              height: high / 28.4,
                              left: wid / 48,
                              backgroundColor: "#EDDB49",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 14,
                            }}
                            onPress={() =>
                              navigation.navigate("TabTwoScreen", {
                                source: item.source,
                                name: item.name,
                                desc: item.details,
                                price: item.price,
                                valid: item.valid,
                                duration: item.duration,
                              } as never)
                            }
                          >
                            <Text
                              allowFontScaling={false}
                              style={{
                                fontFamily: "Poppins-Regular",
                                fontSize: 12,
                              }}
                            >
                              Get Now
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </ImageBackground>
                    </View>
                  </>
                )}
              />
            </View>
            <View
              style={{
                backgroundColor: "#FAFAFB",
                width: wid,
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 19,
                  left: wid / 12.8,
                  color: "#212121",
                  marginBottom: high / 85.4,
                }}
              >
                Ongoing Courses
              </Text>
              {enrData[0] != null ? (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{
                    paddingVertical: 0,
                    paddingLeft: wid / 12.8,
                    // backgroundColor: "pink",
                    flexDirection: "row",
                    // height: high / 3.3,
                  }}
                >
                  {enrData.map((enr: any) => {
                    return (
                      <EnrolledCourse
                        key={Math.random() * 100}
                        item={enr}
                        navigation={navigation}
                      />
                    );
                  })}
                </ScrollView>
              ) : (
                <View
                  style={{
                    // paddingLeft: wid / 12.8,
                    backgroundColor: "#FAFAFB",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    height: high / 5.3,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-Medium",
                      width: "100%",
                      fontSize: 13,
                      alignSelf: "center",
                      backgroundColor: "#FAFAFB",
                    }}
                  >
                    No Course has been purchased
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#FAFAFB",
                marginTop: high / 65,
                width: wid / 0.45,
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 19,
                  left: wid / 12.8,
                  color: "#212121",
                }}
              >
                Free Videos
              </Text>
              <View style={{ backgroundColor: "#FAFAFB" }}>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  contentContainerStyle={{ justifyContent: "space-evenly" }}
                  style={{
                    backgroundColor: "#FAFAFB",
                    marginTop: high / 65,
                    width: wid,
                    marginRight: 30,
                    height: high / 5.4,
                    paddingLeft: wid / 12.8,
                  }}
                >
                  {freeVideoData?.map((video: any) => {
                    return (
                      <VideoCard
                        horizontal={true}
                        key={video.id}
                        startTime={video.startTime}
                        videoUrl={video.videoUrl}
                        title={video.title}
                        videoId={getVideoId(video.videoUrl)}
                        navigation={navigation}
                      />
                    );
                  })}
                </ScrollView>
              </View>
              {!freeVideoData && (
                <View
                  style={{
                    backgroundColor: "#FAFAFB",
                    width: wid,
                    alignItems: "flex-start",
                    justifyContent: "center",
                    alignSelf: "flex-start",
                    alignContent: "center",
                    marginTop: 20,
                    height: high / 5.3,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-Medium",
                      width: "100%",
                      alignContent: "center",
                      fontSize: 13,
                      left: wid / 3.5,
                      alignSelf: "center",
                      backgroundColor: "#FAFAFB",
                    }}
                  >
                    No Free Videos Available
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    top: high / 2,
    left: wid / 2.1,
  },
});
