import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, BackHandler, View } from "react-native";
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
const high = Dimensions.get("window").height;
const wid = Dimensions.get("window").width;
export default function MockTestSubjectTest(props: any) {
  const [quesIndexArray, setquesIndexArray] = useState<any>();
  const [duration, setDuration] = useState<any>();
  const { index, setIndex, access_token, questionLength } = useStateContext();
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState("");
  const [CurrentSectionId, setCurrentSectionId] = useState("");
  const [testSections, setTestSections] = useState<any>([]);
  const [quesData, setQuestionData] = useState<any>([]);
  const [isSection, setSectionsTrue] = useState(false);
  const [sectionLength, setSectionLength] = useState<number>();
  const [allQuestionlength, setAllQuestionLength] = useState<number>();

  const [sectionIdx, setSectionIdx] = useState<any>(0);
  useEffect(() => {
    let Arr: any = [];
    for (let i = 0; i < questionLength; i++) {
      if (i == 0) Arr.push({ color: "green" });
      else Arr.push({ color: null });
    }
    setquesIndexArray(Arr);
  }, [questionLength]);
  const mockid = props.route.params.id;
  useEffect(() => {
    getTestSections();
    const otherDate = moment(new Date());
    const currentDate = moment("2023-12-22T12:23:34Z");
    var duration = currentDate.diff(otherDate, "milliseconds");
    setDuration(duration);
    setIndex(0);
  }, []);

  useEffect(() => {
    const backbuttonHander = () => {
      props.navigation.navigate("MockTestScreen");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });
  const getQuestions = async () => {
    setLoading(true);
    try {
      const data: any = await axios.get(
        `${baseUrl}/api/services/app/MockTest/getMockTestQuestions?mockTestId=${props.route.params.id}`
      );
      if (data.data.result != null) {
        await setQuestionData(data.data);
        setAllQuestionLength(data.data.result.length);
        setLoading(false);
      }
    } catch (error: any) {}
  };

  const getTestSections = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          // "Abp-TenantId": "1",
          // "Access-Control-Allow-Origin": `http://192.168.18.95:19000`,
        },
      };
      const res = await axios.get(
        `${baseUrl}/api/services/app/MockTest/GetMockTestSection?mockTestId=${props.route.params.id}`,
        config
      );
      if (res.data.result != null) {
        setTestSections(res.data.result);
        setSectionLength(res.data.result.length);
        setCurrentSection(res.data.result[sectionIdx].subject.subjectName);
        setCurrentSectionId(res.data.result[sectionIdx].subjectId);
        setSectionsTrue(true);
        getQuestions();
      } else {
        setLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    changeColor;
  }, [index]);
  const changeColor = (color: string) => {
    let newArr = JSON.parse(JSON.stringify(quesIndexArray));
    const foundEl = newArr.find((_arr: any, idx: number) => index == idx);
    if (foundEl) {
      newArr[index].color = "Green";
    }
    setquesIndexArray(newArr);
  };
  console.log(quesIndexArray);
  const setSection: any = async (idx: any) => {
    setSectionIdx(idx);
    setCurrentSection(testSections[idx].subject.subjectName);
    setCurrentSectionId(testSections[idx].subjectId);
  };

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
                    <TestCountDownTimer
                      quesIndexArray={quesIndexArray}
                      duration={duration}
                    />
                    <ScrollView
                      horizontal
                      style={{
                        width: wid,
                        height: high / 20,
                        left: 10,
                        backgroundColor: "#FAFAFB",
                      }}
                      contentContainerStyle={{
                        alignContent: "flex-start",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {testSections?.map((data: any, idx: number) => {
                        return (
                          <>
                            <TouchableOpacity
                              onPress={() => setSection(idx)}
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
                                }}
                              >
                                {data.subject.subjectName}
                              </Text>
                            </TouchableOpacity>
                          </>
                        );
                      })}
                    </ScrollView>
                  </View>
                  <Text></Text>

                  <CurrentSubject
                    setCurrentSection={setCurrentSection}
                    setCurrentSectionId={setCurrentSectionId}
                    CurrentSectionId={CurrentSectionId}
                    quesData={quesData}
                    mockid={mockid}
                    testSections={testSections}
                    setSectionIdx={setSectionIdx}
                    sectionLength={sectionLength}
                    sectionIdx={sectionIdx}
                  />
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
