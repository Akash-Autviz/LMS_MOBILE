import axios from "axios";
import * as SecureStore from "expo-secure-store";

import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CurrentAffairs from "../components/CurrentAffairs";
import HeaderNav from "../components/HeaderNav";
import Quiz from "../components/Quiz";
import { Text, View } from "../components/Themed";
import Video from "../components/Video";
import { baseUrl } from "../utils";

const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function FeedScreen(props: any) {
  const [currentState, setCurrentState] = useState("Quiz");
  const [color, setColor] = useState(true);
  const [color1, setColor1] = useState(false);
  const [color2, setColor2] = useState(false);
  const [color3, setColor3] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const onPress = (text: string) => {
    setCurrentState(text);
    if (text == "Quiz") {
      setCurrentState("Quiz");
      setColor(true);
      setColor1(false);
      setColor2(false);
      setColor3(false);
    } else if (text == "Current Affairs") {
      setColor(false);
      setCurrentState("Current Affairs");
      setColor1(true);
      setColor2(false);
      setColor3(false);
    } else {
      setColor(false);
      setCurrentState("Video");
      setColor1(false);
      setColor2(false);
      setColor3(true);
    }
  };
  const [data, SetData] = useState<any>([]);
  const [feedData, setFeedData] = useState<any>([]);
  const [quizData, setQuizDate] = useState<any>([]);
  const getQuizQuestion = async (value: any) => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer  ${value}`,
        },
      };
      const res = await axios.get(
        `${baseUrl}/api/services/app/QuestionBlogAppSevice/GetAllBlogsQuestions?subjectId=0`
      );

      setQuizDate(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    SecureStore.getItemAsync("access_token").then((value: any) => {
      if (value != null) {
        Jobnotification(value);
        getQuizQuestion(value);
      }
    });
  }, []);

  const Jobnotification = async (token: any) => {
    var axios = require("axios");
    var data = "";
    var config = {
      method: "get",
      url: `${baseUrl}/api/services/app/BlogAppServices/GetAllBlogs?subjectId=0&courseId=0`,
      headers: {
        Authorization: `Bearer  ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response: any) {
        SetData(response.data.result);
      })
      .catch(function (error: any) {
        console.log(error);
      });
    setIsLoading(false);
  };
  const filterData = (state: any) => {
    data.map((d: any) => {
      if (d.type && d.type.toLowerCase() == state.toLowerCase()) {
        setFeedData(d);
      }
    });
  };
  useEffect(() => {
    filterData(currentState);
  }, [currentState]);

  return (
    <View
      style={{
        backgroundColor: "#F7F7F7",
        height: high,
        flex: 1,
      }}
    >
      <HeaderNav name="My Feed" navigation={props.navigation} />
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          marginTop: high / 28,
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
          onPress={() => onPress("Quiz")}
          style={{
            backgroundColor: color ? "#319EAE" : "#FAFAFB",
            height: high / 17,
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
              fontSize: 13,
            }}
          >
            Quiz
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress("Current Affairs")}
          style={{
            backgroundColor: color1 ? "#319EAE" : "#FAFAFB",
            borderRadius: 116,
            height: high / 17,
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
              fontSize: 13,
            }}
          >
            Current Affairs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress("Video")}
          style={{
            backgroundColor: color3 ? "#319EAE" : "#FAFAFB",
            height: high / 17,
            width: "33%",
            justifyContent: "center",
            borderRadius: 116,
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              color: color3 ? "white" : "black",
              alignSelf: "center",
              fontFamily: "Poppins-Regular",
              fontSize: 13,
            }}
          >
            Video
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ backgroundColor: "#FAFAFB", marginTop: high / 50 }}>
        {currentState == "Current Affairs" ? (
          <ScrollView>
            {data.map((data1: any) => {
              if (data1.type == "Current Affairs") {
                return (
                  <CurrentAffairs
                    item={data1}
                    navigation={props.navigation}
                    key={Math.random() * 100}
                  />
                )
              }
            })}
          </ScrollView>
        ) : currentState == "Video" ? (
          <ScrollView
            style={{ marginBottom: 90, backgroundColor: "transparent" }}
          >
            {data.map((data1: any) => {
              if (data1.type == "Video") {
                return <Video item={data1} key={Math.random() * 100} />;
              }
            })}
          </ScrollView>
        ) : currentState == "Quiz" ? (
          <ScrollView style={{ marginBottom: 90 }}>
            {quizData.map((data1: any, idx: any) => {
              return (
                <Quiz
                  key={Math.random() * 100}
                  data={data1}
                  index={idx}
                  navigation={props.navigation}
                />
              );
            })}
          </ScrollView>
        ) : (
          <></>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: high / 28.466,
    height: 1,
    width: "80%",
  },
  image: {
    width: wid / 1.2,
    height: wid / 2.4,
    borderRadius: 10,
    alignSelf: "center",
  },
  cardDesc: {
    width: "90%",
    alignSelf: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  number: {
    fontFamily: "Poppins-Regular",
    left: wid / 50,
    fontSize: 16,
  },
  cardText: {
    fontFamily: "Poppins-Bold",
    fontSize: 17,
    fontWeight: "700",
    width: "80%",
    left: wid / 19.2,
  },
  topicCntr: {
    height: high / 7.87,
    flexDirection: "row",
    marginBottom: high / 75.4,
    borderRadius: 11,
    justifyContent: "center",
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    borderColor: "#F1F1F1",
    width: "90%",
    backgroundColor: "#FAFAFB",
  },
  searchBar: {
    width: "85%",
    height: high / 21.35,
    alignSelf: "center",
    paddingLeft: wid / 42.66,
    paddingBottom: high / 106.75,
    paddingTop: high / 122,
    backgroundColor: "#DCDCDC",
    borderRadius: 16,
    marginBottom: high / 142.33,
  },
  placeholder1: {
    fontFamily: "Poppins-Medium",
    fontStyle: "normal",
    fontSize: 13,
  },

  clearIcon: {
    position: "absolute",
    marginTop: high / 113.866,
    right: "11%",
    justifyContent: "center",
    alignSelf: "center",
    width: wid / 19.2,
    height: high / 42.7,
  },
});
