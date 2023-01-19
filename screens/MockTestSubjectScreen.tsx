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
  const {
    id,
    courseManagementId,
    isReattempt,
    isResulted,
    isSubmitted,
    isView,
    mockTestId,
    studentId,
  } = props.route.params.data;

  const [quesIndexArray, setquesIndexArray] = useState<any>();
  const [mockTestSectionData, setmockTestSectionData] = useState<any>();
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
  const config: any = {
    headers: {
      Authorization: `Bearer ${access_token}`,
      // "Abp-TenantId": "1",
      // "Access-Control-Allow-Origin": `http://192.168.18.95:19000`,
    },
  };
  const [sectionIdx, setSectionIdx] = useState<any>(0);
  useEffect(() => {
    let Arr: any = [];
    for (let i = 0; i < questionLength; i++) {
      Arr.push({ color: null });
    }
    setquesIndexArray(Arr);
  }, [questionLength, sectionIdx]);

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
      let config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": " application/json",
          "Abp-TenantId": "1",
          // "Access-Control-Allow-Origin": `http://192.168.18.95:19000`,
        },
      };
      const res = await axios.get(
        `${baseUrl}/api/services/app/MockTestResultService/GetResultById?id=${mockTestId}`,
        config
      );
      console.log("GetResultById API Hit SUCEESS", res.data.result);
      setQuestionData(res.data);
      setAllQuestionLength(res.data.result.length);
      setLoading(false);
    } catch (error) {
      console.log("GetResultById API Hit SUCEESS", error);
    }
  };
  // const getQuestions = async () => {
  //   setLoading(true);
  //   try {
  //     const data: any = await axios.get(
  //       `${baseUrl}/api/services/app/MockTest/getMockTestQuestions?mockTestId=${mockTestId}`
  //     );
  //     if (data.data.result != null) {
  //       await setQuestionData(data.data);
  //       setAllQuestionLength(data.data.result.length);
  //       setLoading(false);
  //     }
  //   } catch (error: any) {}
  // };
  const GetUserMockTestSection = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/services/app/MockTestUserAns/GetUserMockTestSection?mocktestId=${mockTestId}&userId=${studentId}`,
        config
      );

      setmockTestSectionData(mockTestSectionData);
    } catch (error) {
      console.log(error, "GetUserMockTestSection");
    }
  };

  const getTestSections = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/services/app/MockTest/GetMockTestSection?mockTestId=${mockTestId}`,
        config
      );
      if (res.data.result != null) {
        setTestSections(res.data.result);
        setSectionLength(res.data.result.length);
        setCurrentSection(res.data.result[sectionIdx].subject.subjectName);
        setCurrentSectionId(res.data.result[sectionIdx].subjectId);
        setSectionsTrue(true);
        getQuestions();
        GetUserMockTestSection();
      } else {
        setLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // const changeColor = (color: string) => {
    //   let newArr = JSON.parse(JSON.stringify(quesIndexArray));
    //   const foundEl = newArr.find((_arr: any, idx: number) => index == idx);
    //   if (foundEl) {
    //     newArr[index].color = "#319EAE";
    //   }
    //   setquesIndexArray(newArr);
    // };
  }, [index]);
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
                      setquesIndexArray={setquesIndexArray}
                      currentSection={currentSection}
                      setCurrentSectionId={setCurrentSectionId}
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
                          <View key={idx}>
                            <TouchableOpacity
                              // onPress={() => setSection(idx)}
                              style={{
                                marginHorizontal: 6,
                                paddingHorizontal: 10,
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
                                  fontSize: 12,
                                  textAlignVertical: "center",
                                }}
                              >
                                {data.subject.subjectName}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>

                  <CurrentSubject
                    setCurrentSection={setCurrentSection}
                    setCurrentSectionId={setCurrentSectionId}
                    CurrentSectionId={CurrentSectionId}
                    quesData={quesData}
                    mockid={mockTestId}
                    testSections={testSections}
                    setSectionIdx={setSectionIdx}
                    sectionLength={sectionLength}
                    sectionIdx={sectionIdx}
                    paramsData={props.route.params.data}
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
