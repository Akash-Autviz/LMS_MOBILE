import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  BackHandler,
} from "react-native";
import { Dimensions } from "react-native";
import HeaderNav from "../components/HeaderNav";
import axios from "axios";
import { View, Text } from "../components/Themed";
import * as SecureStore from "expo-secure-store";
import MockTestCard from "../components/MockTestCard";
import { ActivityIndicator } from "react-native-paper";
import { useStateContext } from "./Context/ContextProvider";
import { baseUrl } from "../utils";
export default function MockTest(props: any) {
  const [studentId, setStutendId] = useState("");
  const [mockData, setMockData] = useState<any>([]);
  const [myMockData, setMyMockData] = useState<any>([]);
  const { access_token, userDetail } = useStateContext();
  const [isLoading, setisLoading] = useState<boolean>(false);
  useEffect(() => {
    const backbuttonHander = () => {
      props.navigation.navigate("Home");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  }, []);
  const wid = Dimensions.get("window").width;
  const high = Dimensions.get("window").height;
  const [res, setRes] = useState("Upcoming");
  const [val, setValue] = useState("Buy");
  const [color, setColor] = useState(true);
  const [color1, setColor1] = useState(false);
  useEffect(() => {
    SecureStore.getItemAsync("user_id").then((user_id: any) => {
      setStutendId(user_id);
    });
    upComingData();
  }, []);

  const upComingData = async () => {
    try {
      setisLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
          "Abp-TenantId": "1",
        },
      };
      const { data } = await axios.get(
        `${baseUrl}/api/services/app/CourseManagementAppServices/GetAllDataBasedOnCategory?categoryId=-1&courseType=Mock`,
        config
      );
      console.log(data, "upcomingDataResonse");
      setMockData(data.result);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  };

  const GetEnrolloedMockTest = async () => {
    try {
      setisLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer  ${access_token}`,
          "Content-Type": "application/json",
          "Abp-TenantId": "1",
        },
      };
      const res = await axios.get(
        `${baseUrl}/api/services/app/EnrollCourses/GetAllEnrollCourses?studentId=${userDetail.id}`,
        config
      );
      setMyMockData(res.data.result);
      console.log(res.data.result, "My MockTab buy repsonse");
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onPress = (text: string) => {
    setRes(text);
    setValue("Buy");
    if (text === "My Mock") {
      GetEnrolloedMockTest();
    }
    if (text == "Upcoming") {
      setColor(true);
      setColor1(false);
    } else {
      setValue("Start");
      setColor(false);
      setColor1(true);
    }
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: "#F7F7F7" }}>
          <HeaderNav name="Mock Test" navigation={props.navigation} />
        </View>
        <View></View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: high / 42.7,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "80%",
              top: high / 42.7,
              height: high / 17,
              marginBottom: high / 42.7,
              alignSelf: "center",
              alignItems: "center",
              borderRadius: 116,
              borderWidth: 0.5,
              borderColor: "#EEEEEE",
              backgroundColor: "#FAFAFB",
            }}
          >
            <TouchableOpacity
              onPress={() => onPress("Upcoming")}
              style={{
                backgroundColor: color ? "#319EAE" : "#FAFAFB",
                height: "100%",
                width: "50%",
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
                  fontSize: 15,
                }}
              >
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPress("My Mock")}
              style={{
                backgroundColor: color1 ? "#319EAE" : "#FAFAFB",
                height: "100%",
                width: "50%",
                justifyContent: "center",
                borderRadius: 116,
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  color: color1 ? "white" : "black",
                  alignSelf: "center",
                  fontFamily: "Poppins-Regular",
                  fontSize: 15,
                }}
              >
                My Mock
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {isLoading == true ? (
          <View style={{ alignSelf: "center", top: high / 4.5 }}>
            <ActivityIndicator size="large" color="#319EAE" />
          </View>
        ) : (
          <View>
            {res == "Upcoming" && (
              <ScrollView style={{ height: high / 1.33 }}>
                {mockData.map((item: any) => {
                  return (
                    <MockTestCard
                      key={Math.random() * 100}
                      id={item.id}
                      name={item.name}
                      details={
                        item.detail ? item.detail : "No Details Available"
                      }
                      price={item.price}
                      date={item.creationTime}
                      isBuy={item.isBuy == false ? "Buy" : "View"}
                    />
                  );
                })}
              </ScrollView>
            )}
            {res == "My Mock" && (
              <ScrollView style={{ height: high / 1.33 }}>
                {React.Children.toArray(
                  myMockData?.map((item: any) => {
                    if (item.courseManagement.type == "Mock") {
                      console.log(item.courseManagement.isBuy, "isBuy");

                      item.courseManagement.type;
                      return (
                        <MockTestCard
                          id={item.courseManagement.id}
                          name={item.courseManagement.name}
                          details={
                            item.courseManagement.detail
                              ? item.courseManagement.detail
                              : "No Details Available"
                          }
                          date={item.courseManagement.creationTime}
                          price={item.courseManagement.price}
                          // endTime={item.endTime}
                          isBuy={"View"}
                        />
                      );
                    }
                  })
                )}
              </ScrollView>
            )}
          </View>
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({});
