import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../screens/Context/ContextProvider";
import AnswerOption from "./AnswerOption";
import axios from "axios";
import { baseUrl } from "../utils";
import moment from "moment";
import RenderHtml from "react-native-render-html";

const high = Dimensions.get("window").height;
const wid = Dimensions.get("window").width;
export default function CurrentSubject(props: any) {
  const { index, setIndex, access_token } = useStateContext();
  const [answer, setAnswer] = useState("");
  const [buttonValue, setButtonValue] = useState("Next");

  const {
    currentSectionTypeQuestoion,
    setSectionIdx,
    sectionLength,
    sectionIdx,
    setCurrentSection,
    setCurrentSectionId,
    testSections,
    quesData,
    setDuration,
    SumbitTest,
  } = props;

  const changeValue = (value: any) => {
    currentSectionTypeQuestoion[index].userAnswer = value ? "" : answer;
    currentSectionTypeQuestoion[index].skip = value == "skip" ? true : false;
    currentSectionTypeQuestoion[index].isMarkUp =
      value == "markup" ? true : false;
  };
  console.log(currentSectionTypeQuestoion[index].mockTest);
  console.log(currentSectionTypeQuestoion[index].question);
  const updateUserAnswer = (token: any, trueType: string) => {
    changeValue(trueType);
    let data = JSON.stringify({
      creationTime: moment(),
      mockTest: currentSectionTypeQuestoion[index].mockTest,
      question: currentSectionTypeQuestoion[index].question,
      id: currentSectionTypeQuestoion[index].id,
      mockTestId: currentSectionTypeQuestoion[index].mockTestId,
      isDeleted: currentSectionTypeQuestoion[index].question.isDeleted,
      userAnswer: trueType ? "" : answer,
      quesId: currentSectionTypeQuestoion[index].questionId,
      creatorUserId: currentSectionTypeQuestoion[index].creatorUserId,
      skip: trueType == "skip" ? true : false,
      isMarkUp: trueType == "markup" ? true : false,
      tenantId: 1,
    });
    console.log(data);
    var config = {
      method: "put",
      url: `${baseUrl}/api/services/app/MockTestUserAns/UpdateMockUserAns`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response: any) {
        setAnswer("");
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };
  const UpdateUserMockTestSection = async () => {
    try {
      let header = JSON.stringify({});
      let config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": " application/json",
          "Abp-TenantId": "1",
        },
      };
      const res = await axios.put(
        `${baseUrl}/api/services/app/MockTestUserAns/UpdateUserMockTestSection`,
        config
      );
      console.log("UpdateUserMockTestSection Hit Sucees", res);
    } catch (error) {
      console.log("UpdateUserMockTestSection ", error);
    }
  };
  const checkButton = () => {
    if (
      index === currentSectionTypeQuestoion.length - 1 &&
      sectionIdx === sectionLength - 1
    ) {
      setButtonValue("Submit");
    } else if (index == currentSectionTypeQuestoion.length - 1) {
      setButtonValue("Next Section");
    } else {
      setButtonValue("Next");
    }
  };
  const source = {
    html: `${currentSectionTypeQuestoion[index].question.questions}`,
  };
  useEffect(() => {
    checkButton();
  }, [index, sectionIdx]);
  const checkIndex = (value: string, id: number) => {
    if (value == "increment") {
      if (answer != "") updateUserAnswer(access_token, "");
      if (buttonValue === "Next Section" && sectionIdx + 1 < sectionLength) {
        updateUserAnswer(access_token, "");
        nextSection(sectionIdx + 1);
      } else if (
        index < currentSectionTypeQuestoion.length - 1 &&
        answer != ""
      ) {
        setIndex(index + 1);
      }
    } else if (value == "skip") {
      setAnswer("");
      updateUserAnswer(access_token, "skip");
      if (index < currentSectionTypeQuestoion.length - 1) {
        setIndex(index + 1);
      }
    } else {
      if (index > 0) setIndex(index - 1);
    }
  };

  const submitMockTest = () => {
    updateUserAnswer(access_token, "");
    SumbitTest();
  };
  const nextSection = async (sectionIdx: number) => {
    setCurrentSection(testSections[sectionIdx].subject.subjectName);
    setCurrentSectionId(testSections[sectionIdx].subjectId);
    if (
      testSections[sectionIdx].duration != 0 &&
      testSections[sectionIdx].duration
    ) {
      setDuration(testSections[sectionIdx].duration * 60000);
    }
    setSectionIdx(sectionIdx);
    setIndex(0);
  };
  const onMarkUpClick = () => {
    updateUserAnswer(access_token, "markup");
    if (index < currentSectionTypeQuestoion.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <>
      {Array.isArray(currentSectionTypeQuestoion) &&
        currentSectionTypeQuestoion?.length > 0 && (
          <ScrollView
            style={{
              backgroundColor: "#FAFAFB",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                marginTop: 10,
                paddingHorizontal: wid / 14.2,
                flexDirection: "row",
                backgroundColor: "#FAFAFB",
              }}
            >
              <Text
                allowFontScaling={false}
                style={{ fontSize: 13, fontFamily: "Poppins-Bold" }}
              >
                {index + 1 + " "}.
              </Text>
              <RenderHtml contentWidth={wid} source={source} />
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
                      text={currentSectionTypeQuestoion[index].question.option1}
                      isSelected={"isSelected"}
                    />
                  ) : (
                    <AnswerOption
                      key={2}
                      title={"A"}
                      text={currentSectionTypeQuestoion[index].question.option1}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAnswer("b")}>
                  {answer == "b" ? (
                    <AnswerOption
                      key={3}
                      title={"B"}
                      text={currentSectionTypeQuestoion[index].question.option2}
                      isSelected={"isSelected"}
                    />
                  ) : (
                    <AnswerOption
                      key={4}
                      title={"B"}
                      text={currentSectionTypeQuestoion[index].question.option2}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAnswer("c")}>
                  {answer == "c" ? (
                    <AnswerOption
                      key={5}
                      title={"C"}
                      text={currentSectionTypeQuestoion[index].question.option3}
                      isSelected={"isSelected"}
                    />
                  ) : (
                    <AnswerOption
                      key={6}
                      title={"C"}
                      text={currentSectionTypeQuestoion[index].question.option3}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAnswer("d")}>
                  {answer == "d" ? (
                    <AnswerOption
                      key={8}
                      title={"D"}
                      text={currentSectionTypeQuestoion[index].question.option4}
                      isSelected={"isSelected"}
                    />
                  ) : (
                    <AnswerOption
                      key={9}
                      title={"D"}
                      text={currentSectionTypeQuestoion[index].question.option4}
                    />
                  )}
                </TouchableOpacity>
                {currentSectionTypeQuestoion[index].question.option5 && (
                  <TouchableOpacity onPress={() => setAnswer("e")}>
                    {answer == "e" ? (
                      <AnswerOption
                        key={10}
                        title={"E"}
                        text={
                          currentSectionTypeQuestoion[index].question.option5
                        }
                        isSelected={"isSelected"}
                      />
                    ) : (
                      <AnswerOption
                        key={11}
                        title={"E"}
                        text={
                          currentSectionTypeQuestoion[index].question.option5
                        }
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
                  onPress={() => onMarkUpClick()}
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
                        currentSectionTypeQuestoion[index].question.subjectId
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
        )}
    </>
  );
}

const styles = StyleSheet.create({});
