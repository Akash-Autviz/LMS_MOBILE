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

const high = Dimensions.get("window").height;
const wid = Dimensions.get("window").width;
export default function MockTestSubjectTest(props: any) {
  const { id, isReattempt, isDeleted, mockTestId, studentId } =
    props.route.params.data;
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
    const backbuttonHander = () => {
      navigation.goBack();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  }, []);

  const headers: any = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
    "Abp-TenantId": "1",
  };
  console.log(mockTestId);
  const getQuestions = async (sectionId: any) => {
    setLoading(true);
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": " application/json",
          "Abp-TenantId": "1",
        },
      };
      let url = `${baseUrl}/api/services/app/MockTestUserAns/GetMockTestById?Id=${mockTestId}`;
      if (isReattempt == "changedTheValue") {
        url = `${baseUrl}/api/services/app/MockTestUserAns/GetMockTestById?Id=${mockTestId}&isReattempt=true`;
      } else if (isDeleted == "changedTheValue") {
        url = `${baseUrl}/api/services/app/MockTestUserAns/GetMockTestById?Id=${mockTestId}&isResume=true`;
      }
      const res = await axios.get(url, config);

      console.log("QuetionApi", res);
      SetCurrentSectionTypeQuestoion(
        res.data.result.filter((e: any) => e.question.subjectId == sectionId)
      );

      if (res.data.result) {
        await setQuestionData(res.data.result);
      }
      setLoading(false);
    } catch (error) {
      console.log("Quetion Api", error);
    }
  };

  const GetUserMockTestSection = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/services/app/MockTestUserAns/GetUserMockTestSection?mocktestId=${mockTestId}&userId=${studentId}`,
        config
      );
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
      console.log("Called", res);
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
  const SumbitTest = () => {
    GetResultById();
    Alert.alert("", "Your Test is Submitted", [
      {
        text: "Ok",
        onPress: () => {
          navigation.dispatch(StackActions.replace("Root"));
        },
      },
    ]);
  };
  const GetResultById = async () => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": " application/json",
          "Abp-TenantId": "1",
        },
      };
      const res = await axios.get(
        `${baseUrl}/api/services/app/MockTestResultService/GetResultById?id=${mockTestId}`,
        config
      );
      console.log("GoTResult", res.data.result);
      let payload: any = [];
      res.data.result.forEach((e: any, idx: number) => {
        let payloadObject: any = {
          id: e.id,
          mockTestId: e.mockTestId,
          mockTest: e.mockTest,
          questionId: quesData[idx].questionId,
          question: quesData[idx].question,
          userAnswer: e.userAnswer ? `${e.userAnswer}` : null,
          tenantId: 1,
          skip: e.skip,
          isMarkUp: e.isMarkUp,
        };
        payload.push(payloadObject);
      });

      if (payload) SaveResult(payload);
    } catch (error) {
      console.log("GetResultById API Hit Failed", error);
    }
  };
  const SaveResult = (payload: any) => {
    console.log("payload", payload);
    var data = JSON.stringify(payload);
    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/MockTestUserAns/SaveResult`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        "Abp-TenantId": "1",
      },
      data: data,
    };

    axios(config)
      .then(function (response: any) {
        console.log(response, "getResult");
        MarkIsSubmitted(id);
      })
      .catch(function (error: any) {
        console.log("grtResultApi Failed", error);
      });
  };
  const MarkIsSubmitted = async (id: any) => {
    let config: any = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": " application/json",
        "Abp-TenantId": "1",
      },
    };
    try {
      const res = await axios.post(
        `${baseUrl}/api/services/app/EnrollMockTest/MarkIsSubmitted?id=${id}`,
        config
      );
      console.log("MarkIsSubmitted Api Hit Sucees");
    } catch (error) {
      console.log("MarkIsSubmitted", error);
    }
  };
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
                SumbitTest={SumbitTest}
                quesIndexArray={currentSectionTypeQuestoion}
                duration={
                  duration ? duration : quesData[0].mockTest.duration * 60000
                }
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
              SumbitTest={SumbitTest}
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
        <View></View>
      )}
    </>
  );
}
