import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useStateContext } from "../screens/Context/ContextProvider";
import AnswerOption from "./AnswerOption";
import axios from "axios";
import { baseUrl } from "../utils";
const high = Dimensions.get("window").height;
const wid = Dimensions.get("window").width;
export default function CurrentSubject(props: any) {
  const { index, setIndex, access_token, questionLength, setQuestionLength } =
    useStateContext();

  const [answer, setAnswer] = useState("");
  const [correct, setCorrectAnswer] = useState("");
  const [quesId, setQuesId] = useState("");

  const {
    valueButton,
    quesData,
    currentQuestionId,
    CurrentSectionId,
    mockid,
    setValueButton,
    setIsSkip,
  } = props;
  const [currentSectionTypeQuestoion, SetCurrentSectionTypeQuestoion] =
    useState(
      quesData.result.map((e: any) => {
        if (e.subjectId == CurrentSectionId) return e;
      })
    );

  setQuestionLength(currentSectionTypeQuestoion.length);
  const getResult = () => {
    var data = JSON.stringify([
      {
        mockTestId: mockid,
        questionId: quesId,
        // question: {
        //   answer: correctAnswer,
        // },
        userAnswer: answer,
        tenantId: 1,
        skip: false,
        isMarkUp: false,
      },
    ]);
    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/MockTestUserAns/SaveResult`,
      headers: {
        Authorization: `Bearer ${access_token}`,
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

  const updateUserAnswer = (token: any) => {
    var data = JSON.stringify({
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
      url: `${baseUrl}/api/services/app/MockTestUserAns/UpdateMockUserAns`,
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
    if (index == questionLength - 1) {
      setValueButton("Submit");
    } else {
      setValueButton("Next");
    }
  };
  const checkIndex = (value: string, id: number) => {
    if (value == "increment") {
      var str = currentSectionTypeQuestoion[index].answer;
      var sliced = str.slice(1, 2);
      setCorrectAnswer(sliced);
      // updateUserAnswer(access_token);
      setQuesId(currentSectionTypeQuestoion[index].id);
      setIsSkip(false);
      setAnswer("");
      alert("comedHere");
      if (index < questionLength - 1) {
        setIndex(index + 1);
      } else if (valueButton == "Submit") {
        getResult();
      }
    } else if (value == "skip") {
      // updateUserAnswer(token);
      if (index < questionLength - 1) {
        setIndex(index + 1);
        setIsSkip(true);
      } else if (valueButton == "Submit") {
      }
    } else {
      if (index > 0) setIndex(index - 1);
    }
  };

  return (
    <>
      {currentSectionTypeQuestoion[index].subjectId === CurrentSectionId && (
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
              {index + 1}. {currentSectionTypeQuestoion[index].questions}
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
                    text={currentSectionTypeQuestoion[index].option1}
                    isSelected={"isSelected"}
                  />
                ) : (
                  <AnswerOption
                    key={1}
                    title={"A"}
                    text={currentSectionTypeQuestoion[index].option1}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setAnswer("b")}>
                {answer == "b" ? (
                  <AnswerOption
                    key={2}
                    title={"B"}
                    text={currentSectionTypeQuestoion[index].option2}
                    isSelected={"isSelected"}
                  />
                ) : (
                  <AnswerOption
                    key={2}
                    title={"B"}
                    text={currentSectionTypeQuestoion[index].option2}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setAnswer("c")}>
                {answer == "c" ? (
                  <AnswerOption
                    key={3}
                    title={"C"}
                    text={currentSectionTypeQuestoion[index].option3}
                    isSelected={"isSelected"}
                  />
                ) : (
                  <AnswerOption
                    key={3}
                    title={"C"}
                    text={currentSectionTypeQuestoion[index].option3}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setAnswer("d")}>
                {answer == "d" ? (
                  <AnswerOption
                    key={4}
                    title={"D"}
                    text={currentSectionTypeQuestoion[index].option4}
                    isSelected={"isSelected"}
                  />
                ) : (
                  <AnswerOption
                    key={4}
                    title={"D"}
                    text={currentSectionTypeQuestoion[index].option4}
                  />
                )}
              </TouchableOpacity>
              {currentSectionTypeQuestoion[index].option5 && (
                <TouchableOpacity onPress={() => setAnswer("e")}>
                  {answer == "e" ? (
                    <AnswerOption
                      key={5}
                      title={"E"}
                      text={currentSectionTypeQuestoion[index].option5}
                      isSelected={"isSelected"}
                    />
                  ) : (
                    <AnswerOption
                      key={5}
                      title={"E"}
                      text={currentSectionTypeQuestoion[index].option5}
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
                    currentSectionTypeQuestoion[index].subjectId
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
  );
}

const styles = StyleSheet.create({});
