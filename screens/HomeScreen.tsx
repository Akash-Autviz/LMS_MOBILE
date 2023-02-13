import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
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
import { getVideoId } from "../utils/Logics";
import { baseUrl } from "../utils";
import OnGoinVideoCard from "../components/OnGoinVideoCard";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function HomeScreen({ route, navigation }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [enrData, SetEnrData] = useState<any>([]);
  const [freeVideoData, SetFreeVideoData] = useState<any>([]);
  const [onGoingVideoCourse, setonGoingVideoCourse] = useState<any>([]);
  const {
    setAccess_token,
    access_token,
    setUserDetail,
    userDetail,
    setuserImage,
    refresh,
  } = useStateContext();

  const getUserImage = async (access_token: string, userId: string) => {
    const config = {
      headers: {
        Authorization: `Bearer  ${access_token}`,
        "Abp-TenantId": "1",
      },
    };
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/services/app/User/Get?Id=${userId}`,
        config
      );

      setuserImage(data.result.pofileImage);
    } catch (error) {
      console.log("headerNave", error);
    }
  };
  const getUserData = async (token: any) => {
    let data = "";
    const config = {
      method: "GET",
      url: `${baseUrl}/api/services/app/Session/GetCurrentLoginInformations`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Abp-TenantId": "1",
      },
      data: data,
    };
    await axios(config)
      .then(function async(response: any) {
        if (response.data.result.user != null) {
          setUserDetail(response.data.result.user);
        }
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };
  useEffect(() => {
    SecureStore.getItemAsync("access_token").then((value: any) => {
      SecureStore.getItemAsync("userId1").then((userId: any) => {
        getUserData(value);
        setAccess_token(value);
        getUserImage(value, userId);
        // getOngoingVideoCourses(value);
        getVideoContent(value);
        GetEnrolledCourseInformation(value, userId);
      });
    });
  }, [refresh]);
  const getOngoingVideoCourses = async (token: any) => {
    const config = {
      headers: {
        Authorization: `Bearer  ${token}`,
        "Abp-TenantId": "1",
      },
    };
    try {
      const res = await axios.get(
        `${baseUrl}/api/services/app/CourseManagementAppServices/GetAllDataBasedOnCategory?courseType=Hybrid`,
        config
      );
      setonGoingVideoCourse(res.data.result);
    } catch (error) {
      console.log(
        "app/CourseManagementAppServices/GetAllDataBasedOnCategory?courseType=Hybrid",
        error
      );
    }
  };
  const getVideoContent = async (access_token: any) => {
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

      SetFreeVideoData(res.data.result);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const GetEnrolledCourseInformation = async (
    access_token: any,
    user_id: any
  ) => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer  ${access_token}`,
        },
      };
      const res = await axios.get(
        `${baseUrl}/api/services/app/EnrollCourses/GetAllEnrollCourses?studentId=${user_id}`,
        config
      );
      console.log("Enroolled Api Called");

      SetEnrData(res.data.result);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <ScrollView
      style={{ width: wid, flex: 1, height: high, backgroundColor: "#FAFAFB" }}
    >
      {isLoading === true ? (
        <View
          style={{
            alignSelf: "center",
            justifyContent: "center",
            height: high,
            backgroundColor: "transparent",
          }}
        >
          <ActivityIndicator size="large" color="#319EAE" />
        </View>
      ) : (
        <>
          <HeaderNav setIsLoading={setIsLoading} name={"DashBoard"} />
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
                            top: high / 9.5,
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
                    height: high / 14.3,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-Medium",
                      width: "100%",
                      alignContent: "center",
                      fontSize: 16,
                      textAlign: "center",
                      alignSelf: "center",
                      backgroundColor: "#FAFAFB",
                    }}
                  >
                    No Course has been purchased
                  </Text>
                </View>
              )}
            </View>
            {/* <View
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
                Ongoing Video Courses
              </Text>
              {onGoingVideoCourse ? (
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
                  {onGoingVideoCourse.map((enr: any, idx: number) => {
                    return (
                      <OnGoinVideoCard
                        key={idx}
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
                    height: high / 14.3,
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
            </View> */}
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
                {freeVideoData.length > 0 ? (
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
                ) : (
                  <View
                    style={{
                      backgroundColor: "#FAFAFB",
                      width: wid,
                      alignItems: "flex-start",
                      justifyContent: "center",
                      alignSelf: "flex-start",
                      alignContent: "center",
                      marginTop: 20,
                      height: high / 14.3,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins-Medium",
                        width: "100%",
                        alignContent: "center",
                        fontSize: 16,
                        textAlign: "center",
                        alignSelf: "center",
                        backgroundColor: "#FAFAFB",
                      }}
                    >
                      No Free Videos Available Right Now
                    </Text>
                  </View>
                )}
              </View>
              {/* {!freeVideoData && (
                
              )} */}
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    top: high / 2,
    left: wid / 2.1,
  },
});
