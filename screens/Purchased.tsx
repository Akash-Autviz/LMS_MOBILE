import { useEffect, useState } from "react";
import React from "react";
import { StyleSheet, ScrollView, Linking } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import axios from "axios";
import { TouchableOpacity, Image, Dimensions } from "react-native";
import { View, Text } from "../components/Themed";
import VideoCard from "../components/VideoCard";
import { checkArrayIsEmpty, getVideoId } from "../utils/Logics";
import { useStateContext } from "./Context/ContextProvider";
import { baseUrl } from "../utils";
import TestCardCoponent from "../components/TestCardCoponent";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function Purchased(props: any) {
  const [courseData, setCourseData] = useState<any>([]);
  const [courseType, setCourseType] = useState<any>();
  const { access_token, userDetail } = useStateContext();
  const Courseid = props.route.params.id;
  const [currrentCourseData, SetCurrrentCourseData] = useState<any>([]);
  const [TestRefresh, setTestRefresh] = useState<string>("");
  const [res, setRes] = useState("Notes");
  var Video = (
    <View
      style={{
        flexDirection: "row",
        width: wid / 1.2,
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
        onPress={() => setRes("Notes")}
        style={{
          backgroundColor: res == "Notes" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: wid / 2.42,
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: res == "Notes" ? "white" : "black",
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 15,
          }}
        >
          Notes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setRes("Videos")}
        style={{
          backgroundColor: res == "Videos" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: wid / 2.42,
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: res == "Videos" ? "white" : "black",
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 15,
          }}
        >
          Videos
        </Text>
      </TouchableOpacity>
    </View>
  );
  var Mock = (
    <View
      style={{
        flexDirection: "row",
        width: wid / 1.2,
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
        onPress={() => setRes("Notes")}
        style={{
          backgroundColor: res == "Notes" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: wid / 2.42,
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: res == "Notes" ? "white" : "black",
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 15,
          }}
        >
          Notes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setRes("Mock Tests")}
        style={{
          backgroundColor: res == "Mock Tests" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: wid / 2.42,
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: res == "Mock Tests" ? "white" : "black",
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 15,
          }}
        >
          Mock Tests
        </Text>
      </TouchableOpacity>
    </View>
  );
  var hrbrid = (
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
        onPress={() => setRes("Notes")}
        style={{
          backgroundColor: res == "Notes" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: "33.4%",
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: res == "Notes" ? "white" : "black",
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 15,
          }}
        >
          Notes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setRes("Videos")}
        style={{
          backgroundColor: res == "Videos" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: "33.4%",
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: res == "Videos" ? "white" : "black",
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 15,
          }}
        >
          Videos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setRes("Mock Tests")}
        style={{
          backgroundColor: res == "Mock Tests" ? "#319EAE" : "#FAFAFB",
          borderRadius: 116,
          height: "100%",
          width: "33.4%",
          justifyContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: res == "Mock Tests" ? "white" : "black",
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            fontSize: 15,
          }}
        >
          Mock Tests
        </Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    getCourseDetails(access_token, Courseid);
  }, [props]);
  useEffect(() => {
    getEnrollMockTestByUserIdAndCouresId();
  }, [TestRefresh]);
  const [isTrue, setIsTrue] = useState(true);
  const CreateCourseMockTest = async (token: any) => {
    let data = JSON.stringify({
      studentId: userDetail.id,
      // mockTestId: 22,
      courseManagementId: "Courseid",
    });
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
        }
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };
  const getCourseDetails = async (token: any, id: any) => {
    let data = "";
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
        console.log(response);
        setCourseType(response.data.result.type);
        setCourseData(response.data.result);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };

  useEffect(() => {}, []);
  const headers: any = {
    Authorization: `Bearer ${access_token}`,
    "Abp-TenantId": "1",
  };
  const getEnrollMockTestByUserIdAndCouresId = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/services/app/EnrollMockTest/GetEnrolledMockTestByUserIdAndCourseId?userId=${userDetail.id}&courseId=${Courseid}`,
        headers
      );
      console.log("GetEnrolledMockTestByUserIdAndCourseId", res);
      SetCurrrentCourseData(res.data.result);
    } catch (error) {
      console.log("GetEnrolledMockTestByUserIdAndMockTestId", error);
    }
    setIsTrue(false);
  };

  return !isTrue ? (
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
              source={{ uri: courseData.imagePath }}
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
          <View>
            {/* select-Option Container */}
            {/* {hrbrid} */}
            {courseType == "Mock"
              ? Mock
              : courseType == "Hybrid"
              ? hrbrid
              : Video}
          </View>

          {res == "Mock Tests" ? (
            <ScrollView style={{ marginTop: 20, marginBottom: 60 }}>
              {currrentCourseData?.map((item: any, idx: any) => {
                return (
                  <TestCardCoponent
                    key={idx}
                    title={item.mockTest.title}
                    data={item}
                    setTestRefresh={setTestRefresh}
                  />
                );
              })}
              {!currrentCourseData && (
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Poppins-Medium",
                    fontSize: 16,
                    marginTop: high / 20,
                  }}
                >
                  No MockTest Available
                </Text>
              )}
            </ScrollView>
          ) : null}
          {res == "Notes" ? (
            <ScrollView>
              {courseData.notes?.map((e: any, idx: number) => {
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() =>
                      props.navigation.navigate("Web", {
                        id: `${e.id}`,
                      })
                    }
                    style={styles.topicCntr}
                  >
                    <Text
                      style={{ fontFamily: "Poppins-Medium", fontSize: 16 }}
                    >
                      {e.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {checkArrayIsEmpty(courseData.notes) && (
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Poppins-Medium",
                    fontSize: 16,
                    marginTop: high / 20,
                  }}
                >
                  No Notes Available
                </Text>
              )}
            </ScrollView>
          ) : (
            <></>
          )}
          {res == "Videos" ? (
            <ScrollView
              style={{
                marginTop: 20,
                marginBottom: 60,
                width: wid,
              }}
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {courseData.videos?.map((video: any) => {
                console.log(courseData);
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
              {checkArrayIsEmpty(courseData.videos) && (
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Poppins-Medium",
                    fontSize: 16,
                    marginTop: high / 20,
                  }}
                >
                  No Videos Available
                </Text>
              )}
            </ScrollView>
          ) : (
            <></>
          )}
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
