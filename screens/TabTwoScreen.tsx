import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { View, Text } from "../components/Themed";
import useColorScheme from "../hooks/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import EnrolledCourse from "../components/EnrolledCourse";
import useDebounce from "../shared/Debounce";
import HeaderNav from "../components/HeaderNav";
import { ActivityIndicator } from "react-native-paper";
import { useStateContext } from "./Context/ContextProvider";
import { baseUrl } from "../utils";
import { checkArrayIsEmpty } from "../utils/Logics";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function TabTwoScreen({ routes, navigation }: any) {
  const { access_token, refresh } = useStateContext();
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [color, setIsActive] = useState(false);
  const [color1, setIsActive1] = useState(false);
  const [color2, setIsActive2] = useState(false);
  const [resultFound, setResultFound] = useState(false);
  const [searchedData, setSearchData] = useState<any[]>([]);
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const [resData, SetResData] = useState<any>([]);
  const [nameData, setNameData] = useState<any>([]);
  const [enrData, SetEnrData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userDetail } = useStateContext();
  const handleChangeText = async (text: string) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery("");
    }
  };
  useEffect(() => {
    SecureStore.getItemAsync("access_token").then((value) => {
      if (value != null) {
        GetEnrolledCourseInformation(value, userDetail.id);
        GetCourseInformation();
      }
    });
  }, [refresh]);

  const GetEnrolledCourseInformation = async (
    access_token: any,
    user_id: any
  ) => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer  ${access_token}`,
        },
      };
      const res = await axios.get(
        `${baseUrl}/api/services/app/EnrollCourses/GetAllEnrollCourses?studentId=${user_id}`,
        config
      );
      SetEnrData(res.data.result);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  const GetCourseInformation = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer  ${access_token}`,
          "Abp-TenantId": "1",
        },
      };
      const res = await axios.get(
        `${baseUrl}/api/services/app/CourseManagementAppServices/GetAllDataBasedOnCategory?courseType=Hybrid`,
        config
      );

      SetResData(res.data.result);
      setNameData(res.data.result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const onClear = async () => {
    setSearchQuery("");
    setResultFound(false);
    setSearchData([]);
  };
  useEffect(() => {
    if (debouncedSearchTerm) {
      filterData();
      setResultFound(true);
    } else {
      setSearchData([]);
      setResultFound(false);
    }
  }, [debouncedSearchTerm]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      onClear();
    });
  }, [navigation]);
  const filterData = async () => {
    let filterRes = await nameData.filter((result: any) => {
      if (result.isDeleted == false) {
        if (result.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return result.name;
        } else {
          console.log("HII");
        }
      }
    });
    if (filterRes.length) {
      setSearchData([...filterRes]);
    }
    setResultFound(true);
  };

  return (
    <View style={{ backgroundColor: "#F7F7F7", flex: 1 }}>
      <HeaderNav name="My Courses" navigation={navigation} />
      {isLoading == false ? (
        <View>
          <View style={styles.searchBarContainer}>
            <TextInput
              allowFontScaling={false}
              value={searchQuery}
              onChangeText={handleChangeText}
              style={[styles.searchBar, styles.placeholder1]}
              placeholder="Try out a course.."
              placeholderTextColor={
                colorScheme === "dark" ? "#D1D0D0" : "black"
              }
            />
            {searchQuery ? (
              <AntDesign
                name="close"
                size={20}
                color={colorScheme === "dark" ? "white" : "black"}
                onPress={onClear}
                style={styles.clearIcon2}
              />
            ) : (
              <FontAwesome name="search" size={20} style={styles.clearIcon2} />
            )}
            <View
              style={{
                alignSelf: "center",
                // left: wid / 15,
                marginTop: -4,
                backgroundColor: "#ECECEC",
                width: high / 21.35,
                height: high / 20.35,
                justifyContent: "center",
                alignContent: "center",
                borderRadius: 12,
              }}
            >
              <Image
                style={{ alignSelf: "center", width: 15, height: 15 }}
                source={require("../assets/images/filter.png")}
              />
            </View>
          </View>
          {searchQuery && searchedData.length > 0 && (
            <FlatList
              key={Math.random() * 100}
              showsHorizontalScrollIndicator={false}
              data={searchedData}
              style={{
                width: wid,
                height: high / 1,
                marginVertical: high / 60,
              }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("CourseDetails", {
                      data: item,
                    })
                  }
                  style={styles.topicCntr}
                >
                  <View style={{}}>
                    {!item.imagePath ? (
                      <Image
                        source={require("../assets/images/bigEnglish.png")}
                        style={{
                          resizeMode: "center",
                          width: wid / 5.4,
                          height: wid / 5.4,
                          borderRadius: 10,
                        }}
                      />
                    ) : (
                      <Image
                        source={{ uri: `${item.imagePath}` }}
                        style={{
                          resizeMode: "center",
                          width: wid / 5.4,
                          height: wid / 5.4,
                          borderRadius: 10,
                        }}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      paddingVertical: high / 180,
                      alignSelf: "center",
                      width: wid / 2,
                      flexDirection: "column",
                      backgroundColor: "transparent",
                    }}
                  >
                    <Text allowFontScaling={false} style={styles.cardText}>
                      {item.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "transparent",
                      }}
                    >
                      <FontAwesome
                        name="eye"
                        size={10}
                        style={{
                          color: "#8A8A8A",
                          backgroundColor: "transparent",
                        }}
                      />
                      <Text allowFontScaling={false} style={styles.number}>
                        6 Topic
                      </Text>
                    </View>
                  </View>
                  <AntDesign name="right" size={24} color="black" />
                </TouchableOpacity>
              )}
            />
          )}
          {searchQuery && !searchedData.length && (
            <View
              style={{
                backgroundColor: "transparent",
                justifyContent: "center",
                alignItems: "center",
                height: high,
              }}
            >
              <Text
                style={{
                  marginBottom: high / 1.2,
                  textAlign: "center",
                  fontFamily: "Poppins-Medium",
                  fontSize: 16,
                }}
              >
                No Course Found
              </Text>
            </View>
          )}
          {!searchQuery && !checkArrayIsEmpty(enrData) ? (
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  marginTop: high / 65,
                  height: high / 3,
                  paddingLeft: wid / 12.8,
                }}
              >
                {enrData.map((enr: any) => {
                  return (
                    <EnrolledCourse
                      key={Math.random() * 100}
                      item={enr}
                      navigation={navigation}
                    />
                  );
                })}
              </ScrollView>
              <View>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 20,
                    fontFamily: "Poppins-Bold",
                    backgroundColor: "#FFFFFF",
                    paddingLeft: wid / 11.2,
                    marginVertical: high / 60,
                  }}
                >
                  Popular Courses
                </Text>
              </View>
              <FlatList
                key={Math.random() * 100}
                showsHorizontalScrollIndicator={false}
                data={resData}
                style={{ width: wid, height: high / 2.8 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("CourseDetails", {
                        data: item,
                      })
                    }
                    style={styles.topicCntr}
                  >
                    <View style={{}}>
                      {!item.imagePath ? (
                        <Image
                          source={require("../assets/images/bigEnglish.png")}
                          accessibilityLabel={"Error in Image Loading"}
                          style={{
                            resizeMode: "center",
                            width: wid / 5.4,
                            height: wid / 5.4,
                            borderRadius: 10,
                          }}
                        />
                      ) : (
                        <Image
                          source={{ uri: `${item.imagePath}` }}
                          accessibilityLabel={"Error in Image Loading"}
                          style={{
                            resizeMode: "center",
                            width: wid / 5.4,
                            height: wid / 5.4,
                            borderRadius: 10,
                          }}
                        />
                      )}
                    </View>
                    <View
                      style={{
                        paddingVertical: high / 180,
                        alignSelf: "center",
                        width: wid / 2,
                        flexDirection: "column",
                        backgroundColor: "transparent",
                      }}
                    >
                      <Text allowFontScaling={false} style={styles.cardText}>
                        {item.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          backgroundColor: "transparent",
                        }}
                      >
                        <FontAwesome
                          name="eye"
                          size={10}
                          style={{
                            color: "#8A8A8A",
                            backgroundColor: "transparent",
                          }}
                        />
                        <Text allowFontScaling={false} style={styles.number}>
                          6 Topic
                        </Text>
                      </View>
                    </View>
                    <AntDesign name="right" size={24} color="black" />
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : (
            <View>
              <ScrollView
                horizontal
                contentContainerStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
                showsHorizontalScrollIndicator={false}
                style={{
                  width: wid,
                  height: high / 6,
                  paddingLeft: wid / 5,
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 20,
                    fontFamily: "Poppins-Bold",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  No Purchased Course
                </Text>
              </ScrollView>
              <View>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 20,
                    fontFamily: "Poppins-Bold",
                    backgroundColor: "#FFFFFF",
                    paddingLeft: wid / 11.2,
                    marginVertical: high / 60,
                  }}
                >
                  Popular Courses
                </Text>
              </View>
              <FlatList
                key={Math.random() * 100}
                showsHorizontalScrollIndicator={false}
                data={resData}
                style={{ width: wid, height: high / 1.8 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("CourseDetails", {
                        data: item,
                      })
                    }
                    style={styles.topicCntr}
                  >
                    <View style={{}}>
                      {!item.imagePath ? (
                        <Image
                          source={require("../assets/images/bigEnglish.png")}
                          accessibilityLabel={"Error in Image Loading"}
                          style={{
                            resizeMode: "center",
                            width: wid / 5.4,
                            height: wid / 5.4,
                            borderRadius: 10,
                          }}
                        />
                      ) : (
                        <Image
                          source={{ uri: `${item.imagePath}` }}
                          accessibilityLabel={"Error in Image Loading"}
                          style={{
                            resizeMode: "center",
                            width: wid / 5.4,
                            height: wid / 5.4,
                            borderRadius: 10,
                          }}
                        />
                      )}
                    </View>
                    <View
                      style={{
                        paddingVertical: high / 180,
                        alignSelf: "center",
                        width: wid / 2,
                        flexDirection: "column",
                        backgroundColor: "transparent",
                      }}
                    >
                      <Text allowFontScaling={false} style={styles.cardText}>
                        {item.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          backgroundColor: "transparent",
                        }}
                      >
                        <FontAwesome
                          name="eye"
                          size={10}
                          style={{
                            color: "#8A8A8A",
                            backgroundColor: "transparent",
                          }}
                        />
                        <Text allowFontScaling={false} style={styles.number}>
                          6 Topic
                        </Text>
                      </View>
                    </View>
                    <AntDesign name="right" size={24} color="black" />
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
      ) : (
        <View
          style={{
            height: high / 1.5,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",

            backgroundColor: "transparent",
          }}
        >
          <ActivityIndicator size="large" color="#319EAE" />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  searchBarContainer: {
    marginHorizontal: wid / 14,
    // width: wid,
    marginTop: 15,
    padding: 2,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  number: {
    fontFamily: "Poppins-Regular",
    left: wid / 70,
    fontSize: 14,
    color: "#8A8A8A",
    backgroundColor: "transparent",
  },
  cardText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  topicCntr: {
    flexDirection: "row",
    marginBottom: 10,
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 11,
    borderColor: "#F1F1F1",
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: wid / 1.15,
    backgroundColor: "#FAFAFB",
  },
  searchBar: {
    width: wid / 1.45,
    height: high / 20.35,
    // alignSelf: "flex-start",
    // marginLeft: wid / 15,/
    paddingLeft: wid / 32.66,
    // paddingBottom: high / 106.75,
    // paddingTop: high / 122,
    backgroundColor: "#ECECEC",
    flexDirection: "row",
    borderRadius: 8,
    marginBottom: high / 142.33,
  },
  placeholder1: {
    fontFamily: "Poppins-Medium",
    fontStyle: "normal",
    fontSize: 13,
  },

  clearIcon: {
    // right: "28%",
    bottom: 13,
    color: "#8A8A8A",
    justifyContent: "center",
    alignSelf: "center",
    width: wid / 19.2,
    height: high / 42.7,
  },
  clearIcon2: {
    position: "absolute",
    bottom: 17,
    color: "#8A8A8A",
    right: wid / 5,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
});
