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
import moment from "moment";
import { ActivityIndicator } from "react-native-paper";
import AnswerOption from "../components/AnswerOption";
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
  const [duration, setDuration] = useState<any>();
  const { index, setIndex, access_token, questionLength, setQuestionLength } =
    useStateContext();

  const [loading, setLoading] = useState(true);
  const [isSkip, setIsSkip] = useState(false);
  const [currentSection, setCurrentSection] = useState("");
  const [CurrentSectionId, setCurrentSectionId] = useState("");
  const [testSections, setTestSections] = useState<any>([]);
  const [quesData, setQuestionData] = useState<any>([]);
  const [isSection, setSectionsTrue] = useState(false);

  const [isValue, setValue] = useState("");

  const [valueButton, setValueButton] = useState("Next");
  const [currQuestionOnTyep, setcurrQuestionOnTyep] = useState();
  const mockid = props.route.params.id;

  useEffect(() => {
    getTestSections();
    const otherDate = moment(new Date());
    const currentDate = moment("2023-12-22T12:23:34Z");
    var duration = currentDate.diff(otherDate, "milliseconds");
    setDuration(duration);
  }, []);

  useEffect(() => {
    const backbuttonHander = () => {
      props.navigation.navigate("MockTestScreen");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });
  // useEffect(() => {
  //   checkButton(index);
  // }, [index]);

  const getQuestions = async () => {
    setLoading(true);
    try {
      const data: any = await axios.get(
        `${baseUrl}/api/services/app/MockTest/getMockTestQuestions?mockTestId=${props.route.params.id}`
      );

      if (data.data.result != null) {
        await setQuestionData(data.data);
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
        setTestSections(
          new Set(
            res.data.result.map((e: any) => {
              return e.subject;
            })
          )
        );
        setTestSections(res.data.result);
        setCurrentSection(res.data.result[0].subject.subjectName);
        setCurrentSectionId(res.data.result[0].subjectId);
        setSectionsTrue(true);
        getQuestions();
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
    setCurrentSectionId(id);
  };

  console.log("testSction", testSections);
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
                    <TestCountDownTimer duration={duration} />
                  </View>
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

                  <CurrentSubject
                    CurrentSectionId={CurrentSectionId}
                    quesData={quesData}
                    setValueButton={setValueButton}
                    setIsSkip={setIsSkip}
                    valueButton={valueButton}
                    mockid={mockid}
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
