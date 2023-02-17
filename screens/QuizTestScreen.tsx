import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  BackHandler,
  View,
} from "react-native";
import moment from "moment";
import { ActivityIndicator } from "react-native-paper";
import HeaderNav from "../components/HeaderNav";
import TestCountDownTimer from "../components/TestCountDownTimer";
import { Text } from "../components/Themed";
import { Dimensions } from "react-native";
import axios from "axios";
import { useStateContext } from "./Context/ContextProvider";
import CurrentSubject from "../components/CurrentSubject";
import { baseUrl } from "../utils";
import { StackActions, useNavigation } from "@react-navigation/native";
import QuizTimer from "../components/QuizTimer";
import AnswerOption from "../components/AnswerOption";
import Toast from "react-native-toast-message";
const high = Dimensions.get("window").height;
const wid = Dimensions.get("window").width;
export default function MockTestSubjectTest(props: any) {
  useEffect(() => {});
  const { id } = props.route.params;
  const navigation = useNavigation();
  const [quesIndexArray, setquesIndexArray] = useState<any>([]);
  const [mockTestSectionData, setmockTestSectionData] = useState<any>();
  const [duration, setDuration] = useState<any>();

  const { access_token, userDetail, index, setIndex, questionLength } =
    useStateContext();
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  const [buttonValue, setButtonValue] = useState("Next");
  let headers = {
    "Abp-TenantId": "1",
    Authorization: `Bearer ${access_token}`,
  };

  const currentQuizDetails = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/services/app/BlogAppServices/Get?Id=${id}`
      );
      await setDuration(res.data.result.duration);
      console.log("timer", res);
    } catch (error) {
      console.log("GetResultById API Hit Failed", error);
    }
  };
  const submitMockTest = () => {
    updateUserAnswer(access_token, "");
    SaveResult();
  };
  const changeValue = (value: any) => {
    quesIndexArray[index].userAnswer = value ? "" : answer;
    quesIndexArray[index].skip = value == "skip" ? true : false;
    quesIndexArray[index].isMarkUp = value == "markup" ? true : false;
  };
  const checkButton = () => {
    if (index === quesIndexArray.length - 1) {
      setButtonValue("Submit");
    } else {
      setButtonValue("Next");
    }
  };
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => navigation.navigate("Feed") },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const GetQuestionsById = async () => {
    try {
      var config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${baseUrl}/api/services/app/BlogUserAns/GetBlogTestById?Id=${id}`,
        headers: headers,
      };

      const res = await axios(config);
      setIndex(0);
      setquesIndexArray(res.data.result);
      setLoading(false);
    } catch (error) {
      console.log("GetResultById API Hit Failed", error);
    }
  };
  const SaveResult = async () => {
    var data = JSON.stringify(quesIndexArray);
    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/BlogUserAns/SaveResult`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        "Abp-TenantId": "1",
      },
      data: data,
    };

    await axios(config)
      .then(function (response: any) {
        Alert.alert("", "Your Test is Submitted", [
          {
            text: "Ok",
            onPress: () => {
              navigation.dispatch(
                StackActions.replace("Feed", { user: "jane" })
              );
            },
          },
        ]);
        console.log("getResult", response);
        Toast.show({
          type: "success",
          text1: "Saved",
          position: "top",
        });
      })

      .catch(function (error: any) {
        console.log("grtResultApi Failed", error);
      });
  };
  useEffect(() => {
    checkButton();
  }, [index]);
  const checkIndex = (value: string, id: number) => {
    if (value == "increment") {
      if (index < quesIndexArray.length - 1) {
        updateUserAnswer(access_token, "");
        setIndex(index + 1);
      }
    } else if (value == "skip") {
      setAnswer("");
      updateUserAnswer(access_token, "skip");
      if (index < quesIndexArray.length - 1) {
        setIndex(index + 1);
      }
    } else if (value == "markup") {
      updateUserAnswer(access_token, "markup");
      if (index < quesIndexArray.length - 1) {
        setIndex(index + 1);
      }
    } else {
      if (index > 0) setIndex(index - 1);
    }
  };
  const updateUserAnswer = (token: any, type: string) => {
    changeValue(type);
    let data = JSON.stringify({
      creationTime: moment(),
      mockTest: quesIndexArray[index].mockTest,
      question: quesIndexArray[index].question,
      id: quesIndexArray[index].id,
      mockTestId: quesIndexArray[index].mockTestId,
      isDeleted: quesIndexArray[index].question.isDeleted,
      userAnswer: type ? "" : answer,
      quesId: quesIndexArray[index].questionId,
      creatorUserId: quesIndexArray[index].creatorUserId,
      skip: type == "skip" ? true : false,
      isMarkUp: type == "markup" ? true : false,
      tenantId: 1,
    });
    console.log(data);
    var config = {
      method: "put",
      url: `${baseUrl}/api/services/app/BlogUserAns/Update`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response: any) {
        console.log("update UserAnser", response);
        setAnswer("");
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };
  useEffect(() => {
    currentQuizDetails();
    GetQuestionsById();
  }, []);

  return (
    <>
      {loading && (
        <View style={{ alignSelf: "center", top: high / 4.5 }}>
          <ActivityIndicator size="large" color="#319EAE" />
        </View>
      )}
      <Toast position="top" topOffset={20} />
      {Array.isArray(quesIndexArray) && !loading && (
        <View
          style={{
            backgroundColor: "#FAFAFB",
            height: "100%",
            marginBottom: 50,
          }}
        >
          <>
            <View style={{ backgroundColor: "#F7F7F7" }}>
              <HeaderNav name="Daily Quiz" navigation={props.navigation} />
            </View>
            <View style={{ backgroundColor: "#FAFAFB" }}>
              <QuizTimer
                duration={duration * 60000}
                quesIndexArray={quesIndexArray}
                setquesIndexArray={setquesIndexArray}
                SumbitTest={SaveResult}
              />

              <ScrollView
                style={{
                  backgroundColor: "#FAFAFB",
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    marginVertical: high / 100,
                    paddingHorizontal: wid / 19.2,
                    backgroundColor: "#FAFAFB",
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{ fontSize: 13, fontFamily: "Poppins-Bold" }}
                  >
                    {index + 1}. {quesIndexArray[index].question.questions}
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
                          text={quesIndexArray[index].question.option1}
                          isSelected={"isSelected"}
                        />
                      ) : (
                        <AnswerOption
                          key={2}
                          title={"A"}
                          text={quesIndexArray[index].question.option1}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setAnswer("b")}>
                      {answer == "b" ? (
                        <AnswerOption
                          key={3}
                          title={"B"}
                          text={quesIndexArray[index].question.option2}
                          isSelected={"isSelected"}
                        />
                      ) : (
                        <AnswerOption
                          key={4}
                          title={"B"}
                          text={quesIndexArray[index].question.option2}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setAnswer("c")}>
                      {answer == "c" ? (
                        <AnswerOption
                          key={5}
                          title={"C"}
                          text={quesIndexArray[index].question.option3}
                          isSelected={"isSelected"}
                        />
                      ) : (
                        <AnswerOption
                          key={6}
                          title={"C"}
                          text={quesIndexArray[index].question.option3}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setAnswer("d")}>
                      {answer == "d" ? (
                        <AnswerOption
                          key={8}
                          title={"D"}
                          text={quesIndexArray[index].question.option4}
                          isSelected={"isSelected"}
                        />
                      ) : (
                        <AnswerOption
                          key={9}
                          title={"D"}
                          text={quesIndexArray[index].question.option4}
                        />
                      )}
                    </TouchableOpacity>
                    {quesIndexArray[index].question.option5 && (
                      <TouchableOpacity onPress={() => setAnswer("e")}>
                        {answer == "e" ? (
                          <AnswerOption
                            key={10}
                            title={"E"}
                            text={quesIndexArray[index].question.option5}
                            isSelected={"isSelected"}
                          />
                        ) : (
                          <AnswerOption
                            key={11}
                            title={"E"}
                            text={quesIndexArray[index].question.option5}
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
                    backgroundColor: "#FAFAFB",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "flex-start",
                    paddingHorizontal: wid / 19.2,
                  }}
                >
                  <View
                    style={{
                      top: "5%",
                      width: "18%",
                      height: high / 21.35,
                      margin: 7,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        justifyContent: "center",

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
                      marginRight: wid / 19,
                      alignSelf: "flex-start",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: "110%",
                        backgroundColor: "white",
                        borderStyle: "solid",
                        borderColor: "lightgrey",
                        borderWidth: 1,
                        borderRadius: 6,
                      }}
                      onPress={() => {
                        checkIndex("skip", index);
                      }}
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
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => checkIndex("markup", index)}
                      style={{
                        alignItems: "center",
                        justifyContent: "center",

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
                    }}
                  >
                    {buttonValue == "Submit" ? (
                      <TouchableOpacity
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          width: wid / 4,
                          height: "110%",
                          backgroundColor: "#319EAE",
                          borderStyle: "solid",
                          borderColor: "#E9E9E9",
                          borderRadius: 6,
                        }}
                        onPress={() => submitMockTest()}
                      >
                        <Text
                          style={{
                            color: "white",
                          }}
                        >
                          {buttonValue}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          width: wid / 4,
                          height: "110%",
                          backgroundColor: "#319EAE",
                          borderStyle: "solid",
                          borderColor: "#E9E9E9",
                          borderRadius: 6,
                        }}
                        onPress={() => {
                          checkIndex(
                            "increment",
                            quesIndexArray[index].question.subjectId
                          );
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                          }}
                        >
                          {buttonValue}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </ScrollView>
            </View>
          </>
        </View>
      )}
    </>
  );
}
