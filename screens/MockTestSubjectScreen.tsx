import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  FlatList,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import AnswerOption from "../components/AnswerOption";
import HeaderNav from "../components/HeaderNav";
import TestCountDownTimer from "../components/TestCountDownTimer";
import { Text } from "../components/Themed";
import { Dimensions } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import { useStateContext } from "./Context/ContextProvider";
const high = Dimensions.get("window").height;
const wid = Dimensions.get("window").width;
export default function MockTestSubjectTest(props: any) {
  const { index, setIndex } = useStateContext();
  const [length, setLength] = useState<number>(0);
  const [studentId, setStutendId] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isSkip, setIsSkip] = useState(false);
  const [currentSection, setCurrentSection] = useState("");
  const [currentQuestionId, setCurrentQuestionsId] = useState("");

  const [quesId, setQuesId] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [testSections, setTestSections] = useState<any>([]);
  const [quesData, setQuestionData] = useState<any>([]);
  const [isSection, setSectionsTrue] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isValue, setValue] = useState("");
  const [user, setUser] = useState("");
  const [valueButton, setValueButton] = useState("Next");
  const mockid = props.route.params.id;
  // console.log(props.route.params.id);

  useEffect(() => {
    SecureStore.getItemAsync("userId1").then((userId) => {
      if (userId != null) {
        setUser(userId);
      }
    });
  }, []);
  useEffect(() => {
    const backbuttonHander = () => {
      props.navigation.navigate("MockTestScreen");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });
  useEffect(() => {
    checkButton(index);
  }, [index]);
  var token = "";
  useEffect(() => {
    SecureStore.getItemAsync("access_token").then((value: any) => {
      if (value != null) {
        token = value;
      }
    });
  }, []);
  const updateUserAnswer = (token: any) => {
    var axios = require("axios");
    var data = JSON.stringify({
      // id: 1,
      mockTestId: mockid,
      isDeleted: false,
      questionId: quesId,
      userAnswer: answer,
      skip: false,
      isMarkUp: false,
      tenantId: 1,
    });

    var config = {
      method: "put",
      url: "http://lmsapi-dev.ap-south-1.elasticbeanstalk.com/api/services/app/MockTestUserAns/UpdateMockUserAns",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response: any) {})
      .catch(function (error: any) {
        console.log(config.data);
      });
  };
  const checkButton = (index: number) => {
    if (index == length - 1) {
      setValueButton("Submit");
    } else {
      setValueButton("Next");
    }
  };
  const getResult = () => {
    var data = JSON.stringify([
      {
        mockTestId: mockid,
        questionId: quesId,
        question: {
          answer: correctAnswer,
        },
        userAnswer: answer,
        tenantId: 1,
        skip: false,
        isMarkUp: false,
      },
    ]);
    console.log(token);

    var config = {
      method: "post",
      url: "http://lmsapi-dev.ap-south-1.elasticbeanstalk.com/api/services/app/MockTestUserAns/SaveResult",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response: any) {})
      .catch(function (error: any) {
        console.log("Sorry", config);
      });
  };

  const checkIndex = (value: string, id: string) => {
    if (value == "increment") {
      // if(id == currentQuestionId){

      // }
      var str = quesData.result[index].answer;
      var sliced = str.slice(1, 2);
      setCorrectAnswer(sliced);
      updateUserAnswer(token);
      setQuesId(quesData.result[index].id);
      setIsSkip(false);
      setAnswer("");
      if (index < length - 1) {
        setIndex(index + 1);
      } else if (valueButton == "Submit") {
        getResult();
      }
    } else if (value == "skip") {
      // updateUserAnswer(token);
      if (index < length - 1) {
        setIndex(index + 1);
        setIsSkip(true);
      } else if (valueButton == "Submit") {
      }
    } else {
      if (index > 0) setIndex(index - 1);
    }
  };
  const getQuestions = async () => {
    setLoading(true);
    try {
      const data: any = await axios.get(
        `http://lmsapi-dev.ap-south-1.elasticbeanstalk.com/api/services/app/MockTest/getMockTestQuestions?mockTestId=${props.route.params.id}`
      );
      if (data.data.result != null) {
        setQuestionData(data.data);
        console.log(
          "-----------------------------------------------",
          data.data.result,
          "----------------------------------------------"
        );
        setLength(data.data.result.length);
        setLoading(false);
        setIndex(0);
      }
    } catch (error: any) {}
  };

  const getSections = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Abp-TenantId": "1",
          // "Access-Control-Allow-Origin": `http://192.168.18.95:19000`,
        },
      };
      const res = await axios.get(
        // `http://lmsapi-dev.ap-south-1.elasticbeanstalk.com/api/services/app/MockTestUserAns/GetUserMockTestSection?mocktestId=${mockid}&userId=${studentId}`,
        `http://lmsapi-dev.ap-south-1.elasticbeanstalk.com/api/services/app/MockTest/GetMockTestSection?mockTestId=8`,
        config
      );
      if (res.data.result != null) {
        setTestSections(res.data.result);
        setCurrentSection(res.data.result[0].subject.subjectName);
        setCurrentQuestionsId(res.data.result[0].subjectId);
        setSectionsTrue(true);
      } else {
        setLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setSection: any = async (name: any, id: any) => {
    setValue(name);
    setCurrentSection(name);
    setCurrentQuestionsId(id);
    console.log(currentQuestionId);
  };
  useEffect(() => {
    getSections();
  }, [quesData]);
  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      {loading == false ? (
        <>
          {quesData && isSection ? (
            <>
              <View
                style={{
                  backgroundColor: "#FAFAFB",
                  height: "100%",
                  marginBottom: 50,
                }}
              >
                <>
                  <View style={{ backgroundColor: "#F7F7F7" }}>
                    <HeaderNav name="Test" navigation={props.navigation} />
                  </View>
                  <View style={{ backgroundColor: "#FAFAFB" }}>
                    <TestCountDownTimer questions={length} />
                  </View>
                  {/* <FlatList
                    key={Math.random() * 100}
                    showsHorizontalScrollIndicator={false}
                    data={testSections}
                    style={{
                      width: wid,
                      height: high / 10,
                      backgroundColor: "pink",
                    }}
                    renderItem={(item: any) => (
                      <TouchableOpacity>
                        <Text>{item.subject.subjectName}</Text>
                      </TouchableOpacity>
                    )}
                  /> */}
                  <ScrollView
                    horizontal
                    style={{
                      width: wid,
                      position: "absolute",
                      height: high / 20,
                      left: 10,
                      marginTop: high / 4.5,
                      backgroundColor: "#FAFAFB",
                    }}
                    contentContainerStyle={{
                      alignContent: "flex-start",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {testSections?.map((data: any) => {
                      // console.log(
                      //   data.subjectId,
                      //   "---------------------------+++++++++++++++"
                      // );
                      return (
                        <>
                          <TouchableOpacity
                            onPress={() =>
                              setSection(
                                data.subject.subjectName,
                                data.subjectId
                              )
                            }
                            style={{
                              width: wid / 3.5,
                              marginHorizontal: 10,
                              backgroundColor:
                                currentSection === data.subject.subjectName
                                  ? "#498BEA"
                                  : "lightgrey",
                              flexDirection: "row",
                              height: "100%",
                              borderRadius: 15,
                              justifyContent: "center",
                              alignItems: "center",
                              alignContent: "center",
                            }}
                          >
                            <Text
                              style={{
                                color:
                                  currentSection === data.subject.subjectName
                                    ? "white"
                                    : "black",
                                alignSelf: "center",
                                height: "100%",
                                fontFamily: "Poppins-Medium",
                                fontSize: 14,
                                textAlignVertical: "center",
                                // width: wid,
                              }}
                            >
                              {data.subject.subjectName}
                            </Text>
                          </TouchableOpacity>
                        </>
                      );
                    })}
                  </ScrollView>
                  {quesData.result[index].subjectId === currentQuestionId && (
                    <ScrollView
                      style={{
                        backgroundColor: "#FAFAFB",
                        marginBottom: 20,
                        position: "absolute",
                        marginTop: high / 3.5,
                      }}
                    >
                      <View
                        style={{
                          marginVertical: high / 29,
                          paddingHorizontal: wid / 19.2,
                          backgroundColor: "#FAFAFB",
                        }}
                      >
                        <Text
                          allowFontScaling={false}
                          style={{ fontSize: 13, fontFamily: "Poppins-Bold" }}
                        >
                          {index + 1}. {quesData.result[index].questions}
                        </Text>
                      </View>
                      <View style={{ backgroundColor: "#FAFAFB" }}>
                        <View
                          style={{
                            marginVertical: high / 71.166,
                            backgroundColor: "#FAFAFB",
                          }}
                        >
                          <TouchableOpacity onPress={() => setAnswer("a")}>
                            {answer == "a" ? (
                              <AnswerOption
                                key={1}
                                title={"A"}
                                text={quesData.result[index].option1}
                                isSelected={"isSelected"}
                              />
                            ) : (
                              <AnswerOption
                                key={1}
                                title={"A"}
                                text={quesData.result[index].option1}
                              />
                            )}
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => setAnswer("b")}>
                            {answer == "b" ? (
                              <AnswerOption
                                key={2}
                                title={"B"}
                                text={quesData.result[index].option2}
                                isSelected={"isSelected"}
                              />
                            ) : (
                              <AnswerOption
                                key={2}
                                title={"B"}
                                text={quesData.result[index].option2}
                              />
                            )}
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => setAnswer("c")}>
                            {answer == "c" ? (
                              <AnswerOption
                                key={3}
                                title={"C"}
                                text={quesData.result[index].option3}
                                isSelected={"isSelected"}
                              />
                            ) : (
                              <AnswerOption
                                key={3}
                                title={"C"}
                                text={quesData.result[index].option3}
                              />
                            )}
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => setAnswer("d")}>
                            {answer == "d" ? (
                              <AnswerOption
                                key={4}
                                title={"D"}
                                text={quesData.result[index].option4}
                                isSelected={"isSelected"}
                              />
                            ) : (
                              <AnswerOption
                                key={4}
                                title={"D"}
                                text={quesData.result[index].option4}
                              />
                            )}
                          </TouchableOpacity>
                          {quesData.result[index].option5 && (
                            <TouchableOpacity onPress={() => setAnswer("e")}>
                              {/* {option5= quesData.result[index].option5 ? (  */}
                              {answer == "e" ? (
                                <AnswerOption
                                  key={5}
                                  title={"E"}
                                  text={quesData.result[index].option5}
                                  isSelected={"isSelected"}
                                />
                              ) : (
                                <AnswerOption
                                  key={5}
                                  title={"E"}
                                  text={quesData.result[index].option5}
                                />
                              )}
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>

                      <View
                        style={{
                          width: wid,
                          height: high / 7.16,
                          // display: "flex",
                          backgroundColor: "#FAFAFB",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "flex-start",
                          paddingHorizontal: wid / 19.2,
                          // marginTop: "10%",
                        }}
                      >
                        <View
                          style={{
                            top: "5%",
                            width: "18%",
                            height: high / 21.35,
                            margin: 7,
                            marginRight: "2%",
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                              width: "100%",
                              height: "110%",
                              backgroundColor: "white",
                              borderStyle: "solid",
                              borderColor: "lightgrey",
                              borderWidth: 1,
                              borderRadius: 6,
                            }}
                            onPress={() => checkIndex("decrement", index)}
                          >
                            <Text
                              style={{
                                color: "grey",
                              }}
                            >
                              Previous
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            top: "5%",
                            width: "18%",
                            height: high / 21.35,
                            margin: 7,
                            marginRight: "10%",
                            alignSelf: "flex-start",
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                              width: "100%",
                              height: "110%",
                              backgroundColor: "white",
                              borderStyle: "solid",
                              borderColor: "lightgrey",
                              borderWidth: 1,
                              borderRadius: 6,
                            }}
                            onPress={() => checkIndex("skip", index)}
                          >
                            <Text
                              style={{
                                color: "grey",
                              }}
                            >
                              Skip
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            top: "5%",
                            width: "18%",
                            height: high / 21.35,
                            margin: 7,
                            // marginRight: "28%",
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                              width: "100%",
                              height: "110%",
                              backgroundColor: "#319EAE",
                              borderStyle: "solid",
                              borderColor: "#E9E9E9",
                              borderRadius: 6,
                            }}
                          >
                            <Text
                              style={{
                                color: "white",
                              }}
                            >
                              Markup
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            top: "5%",
                            width: "18%",
                            height: high / 21.35,
                            margin: 7,
                            // marginRight: "28%",
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                              width: "100%",
                              height: "110%",
                              backgroundColor: "#319EAE",
                              borderStyle: "solid",
                              borderColor: "#E9E9E9",
                              borderRadius: 6,
                            }}
                            onPress={() => {
                              checkIndex(
                                "increment",
                                quesData.result[index].subjectId
                              );
                            }}
                          >
                            <Text
                              style={{
                                color: "white",
                              }}
                            >
                              {valueButton}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ScrollView>
                  )}
                </>
              </View>
            </>
          ) : (
            <>
              <View
                style={{ width: wid, height: high, justifyContent: "center" }}
              >
                <Text>No Data</Text>
              </View>
            </>
          )}
        </>
      ) : (
        <View style={{ alignSelf: "center", top: high / 4.5 }}>
          <ActivityIndicator size="large" color="#319EAE" />
        </View>
      )}
    </>
  );
}
