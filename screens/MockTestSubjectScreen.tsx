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
import { useNavigation } from "@react-navigation/native";
import { isLoading } from "expo-font";

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
  const navigation = useNavigation();
  const [quesIndexArray, setquesIndexArray] = useState<any>();
  const [mockTestSectionData, setmockTestSectionData] = useState<any>();
  const [duration, setDuration] = useState<any>();
  const { index, setIndex, access_token, userDetail, questionLength } =
    useStateContext();
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState("");
  const [CurrentSectionId, setCurrentSectionId] = useState("");
  const [testSections, setTestSections] = useState<any>([]);
  const [quesData, setQuestionData] = useState<any>([]);
  const [isSection, setSectionsTrue] = useState(false);
  const [currrentCourseData, SetCurrrentCourseData] = useState<any>({});
  const [sectionLength, setSectionLength] = useState<number>();
  const [currentSectionTypeQuestoion, SetCurrentSectionTypeQuestoion] =
    useState<any>([]);
  console.log("Parenet Renderd");
  const config: any = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const [sectionIdx, setSectionIdx] = useState<any>(0);
  const getEnrollMockTestByUserIdAndCouresId = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/services/app/EnrollMockTest/GetEnrolledMockTestByUserIdAndMockTestId?userId=${userDetail.id}&mockTestId=${id} `,
        headers
      );
      if (res.data.result != null) {
        SetCurrrentCourseData(res.data.result);
        console.log("User MOCKFDLSFJSLJFlTEST SECTION", res.data.result);
      }
      setLoading(false);
    } catch (error) {
      console.log("GetEnrolledMockTestByUserIdAndMockTestId", error);
    }
  };

  useEffect(() => {
    getTestSections();
  }, []);

  const filterQuestion = (currArrr: any) => {
    SetCurrentSectionTypeQuestoion(
      currArrr.filter((e: any) => e.question.subjectId == CurrentSectionId)
    );
    
  };

  useEffect(() => {
    filterQuestion(quesData);
  }, [CurrentSectionId, sectionIdx]);

  useEffect(() => {
    console.log("use effect 3");
    const backbuttonHander = () => {
      navigation.goBack();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  }, []);
  console.log(testSections);
  const headers: any = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
    "Abp-TenantId": "1",
  };

  const getQuestions = async (sectionId: any) => {
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
        `${baseUrl}/api/services/app/MockTestUserAns/GetMockTestById?Id=${mockTestId}&isReattempt=${
          isReattempt == "changedTheValue" ? true : false
        }&isResume=false`,
        config
      );
      // filterQuestion(res.data.result);

      SetCurrentSectionTypeQuestoion(
        res.data.result.filter((e: any) => e.question.subjectId == sectionId)
      );
      console.log("QuetionApi", res);
      if (res.data.result) {
        await setQuestionData(res.data.result);
      }
      setLoading(false);
    } catch (error) {
      console.log("Quetion Api", error);
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
      console.log("Called");
      if (res.data.result != null && testSections.length < 1) {
        setTestSections(res.data.result);
        setSectionLength(res.data.result.length);
        setCurrentSection(res.data.result[sectionIdx].subject.subjectName);
        setCurrentSectionId(res.data.result[sectionIdx].subjectId);
        setSectionsTrue(true);
        setIndex(0);

        setDuration(res.data.result[sectionIdx]?.duration * 60000);
        getQuestions(res.data.result[sectionIdx].subjectId);
      }
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  // const setSection: any = async (idx: any) => {
  //   setSectionIdx(idx);
  //   setCurrentSection(testSections[idx].subject.subjectName);
  //   setCurrentSectionId(testSections[idx].subjectId);
  // };
  console.log(loading, quesData, isSection, "end results");
  return (
    <>
      {loading ? (
        <View style={{ alignSelf: "center", top: high / 4.5 }}>
          <ActivityIndicator size="large" color="#319EAE" />
        </View>
      ) : currentSectionTypeQuestoion && isSection ? (
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
                quesIndexArray={currentSectionTypeQuestoion}
                duration={duration}
                setquesIndexArray={setquesIndexArray}
                currentSection={currentSection}
                CurrentSectionId={CurrentSectionId}
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
              setquesIndexArray={setquesIndexArray}
              CurrentSectionId={CurrentSectionId}
              quesData={quesData}
              mockid={mockTestId}
              currentSectionTypeQuestoion={currentSectionTypeQuestoion}
              testSections={testSections}
              setSectionIdx={setSectionIdx}
              sectionLength={sectionLength}
              setDuration={setDuration}
              sectionIdx={sectionIdx}
              paramsData={props.route.params.data}
            />
          </>
        </View>
      ) : (
        <View>
          <Text>ierytuiertert</Text>
        </View>
      )}
      {/* {loading == false ? (
        <>
          {quesData && isSection ? (
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
                    quesIndexArray={currentSectionTypeQuestoion}
                    duration={duration}
                    setquesIndexArray={setquesIndexArray}
                    currentSection={currentSection}
                    CurrentSectionId={CurrentSectionId}
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
                  setquesIndexArray={setquesIndexArray}
                  CurrentSectionId={CurrentSectionId}
                  quesData={quesData}
                  mockid={mockTestId}
                  currentSectionTypeQuestoion={currentSectionTypeQuestoion}
                  testSections={testSections}
                  setSectionIdx={setSectionIdx}
                  sectionLength={sectionLength}
                  sectionIdx={sectionIdx}
                  paramsData={props.route.params.data}
                />
              </>
            </View>
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
      )} */}
    </>
  );
}
