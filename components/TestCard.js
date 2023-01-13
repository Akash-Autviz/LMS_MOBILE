import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../screens/Context/ContextProvider";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { trimDate, trimName, trimText } from "../utils/Logics";
import { baseUrl } from "../utils";
const high = Dimensions.get("window").height;
const wid = Dimensions.get("window").width;
const TestCard = (props) => {
  const { name, startTime, id, price } = props;
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [currrentCourseData, SetCurrrentCourseData] = useState({});

  const { userDetail, access_token } = useStateContext();
  useEffect(() => {
    getEnrollMockTestByUserIdAndCouresId();
  }, []);

  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
    "Abp-TenantId": "1",
  };
  const getEnrollMockTestByUserIdAndCouresId = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/services/app/EnrollMockTest/GetEnrolledMockTestByUserIdAndMockTestId?userId=${userDetail.id}&mockTestId=${id} `,
        headers
      );
      if (res.data.result != null) {
        SetCurrrentCourseData(res.data.result);
      }
      setLoading(false);
    } catch (error) {}
  };

  return (
    <>
      {loading == false && (
        <View
          style={{
            alignSelf: "center",
            width: "92%",
            borderStyle: "dashed",
            borderColor: "#C9C17F",
            borderWidth: 1,
            borderRadius: 11,
            marginVertical: "2%",
          }}
        >
          <View
            style={[
              styles.MockTestCard,
              styles.paddingInContainer,
              {
                justifyContent: "space-between",
                marginTop: high / 71.16,
                width: "100%",
              },
            ]}
          >
            <Text
              allowFontScaling={false}
              style={{ fontSize: 14, fontFamily: "Poppins-Bold" }}
            >
              {name}
            </Text>
          </View>

          <View
            style={[
              styles.paddingInContainer,
              styles.MockTestCard,
              {
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: high / 80,
                marginBottom: high / 50,
              },
            ]}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              {price ? (
                <>
                  <FontAwesome name="rupee" size={18} color="black" />
                  <Text
                    allowFontScaling={false}
                    style={[styles.fontColor, { marginLeft: wid / 64 }]}
                  >
                    {price}
                  </Text>
                </>
              ) : (
                <>
                  <AntDesign name="clockcircleo" size={20} color="#8A8A8A" />
                  {startTime ? (
                    <Text
                      allowFontScaling={false}
                      style={[styles.fontColor, { marginLeft: wid / 64 }]}
                    >
                      {trimDate(startTime)}
                    </Text>
                  ) : (
                    <Text
                      allowFontScaling={false}
                      style={[styles.fontColor, { marginLeft: wid / 64 }]}
                    >
                      1 Hour
                    </Text>
                  )}
                </>
              )}
            </View>
            {currrentCourseData.isSubmitted == true && (
              <View style={{}}>
                <TouchableOpacity
                  style={{
                    marginRight: -wid / 10,
                    paddingRight: -wid / 10,
                    backgroundColor: "#319EAE",
                    width: wid / 4,
                    justifyContent: "center",
                    alignContent: "center",
                    height: high / 25.5,
                    borderRadius: 4,
                  }}
                  onPress={() => {
                    navigation.navigate("Test", {
                      id: currrentCourseData.mockTestId,
                    });
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: "white",
                      fontFamily: "Poppins-Regular",
                      fontSize: 12,
                      alignSelf: "center",
                    }}
                  >
                    View Result
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {!currrentCourseData.isSubmitted && (
              <View style={{}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#319EAE",

                    width: wid / 4,
                    justifyContent: "center",
                    alignContent: "center",
                    height: high / 25.5,
                    borderRadius: 4,
                  }}
                  onPress={() => {
                    navigation.navigate("Test", {
                      id: currrentCourseData.mockTestId,
                    });
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: "white",
                      fontFamily: "Poppins-Regular",
                      fontSize: 12,
                      alignSelf: "center",
                    }}
                  >
                    {currrentCourseData.isView == false ? "Start" : "Resume"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {currrentCourseData.isSubmitted == true && (
              <View style={{}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#319EAE",
                    width: wid / 4,
                    justifyContent: "center",
                    alignContent: "center",
                    height: high / 25.5,
                    borderRadius: 4,
                  }}
                  onPress={() => {
                    navigation.navigate("Test", {
                      id: currrentCourseData.mockTestId,
                    });
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: "white",
                      fontFamily: "Poppins-Regular",
                      fontSize: 12,
                      alignSelf: "center",
                    }}
                  >
                    Re Attempt
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default TestCard;

const styles = StyleSheet.create({
  MockTestCard: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paddingInContainer: {
    paddingHorizontal: wid / 19.2,
  },
  fontColor: {
    color: "#8A8A8A",
    fontFamily: "Poppins-Regular",
  },
});
