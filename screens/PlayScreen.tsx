import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { View, Text } from "../components/Themed";
import useColorScheme from "../hooks/useColorScheme";
import navigation from "../navigation";
import useDebounce from "../shared/Debounce";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { apps } from "../data/AppData";
import HeaderNav from "../components/HeaderNav";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function PlayScreen(props: any) {
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [color, setIsActive] = useState(false);
  const [color1, setIsActive1] = useState(false);
  const [color2, setIsActive2] = useState(false);
  const [resultFound, setResultFound] = useState(false);
  const [searchedData, setSearchData] = useState<any[]>([]);
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const handleChangeText = async (text: string) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery("");
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
    const unsubscribe = props.navigation.addListener("focus", () => {
      onClear();
    });
  }, [props.navigation]);
  const filterData = async () => {
    let filterRes = await apps.filter((result: any) => {
      if (result.Keyword == true) {
        for (let i = 0; i < result.keywords.length; i++) {
          if (searchQuery.length < 1) {
            if (searchQuery.toLowerCase() == result.keywords[i]) {
              return result;
            }
          } else {
            if (result.keywords[i].includes(searchQuery.toLowerCase())) {
              return result;
            }
          }
        }
      }
    });
    if (filterRes.length) {
      await setSearchData([...filterRes]);
    }
    setResultFound(true);
  };
  const handleClick = () => {
    setIsActive((current) => !current);
    if (color1 == true || color2 == true) {
      setIsActive1(false);
      setIsActive2(false);
    }
  };
  const handleClick1 = () => {
    if (color == true || color2 == true) {
      setIsActive(false);
      setIsActive2(false);
    }
    setIsActive1((current) => !current);
  };
  const handleClick2 = () => {
    setIsActive2((current) => !current);
    if (color == true || color1 == true) {
      setIsActive(false);
      setIsActive1(false);
    }
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: "#FAFAFB", flex: 1, bottom: high / 28.46 }}
    >
      <HeaderNav navigation={props.navigation} name="Videos" />
      <View style={styles.searchBarContainer}>
        <TextInput
          allowFontScaling={false}
          value={searchQuery}
          onChangeText={handleChangeText}
          style={[styles.searchBar, styles.placeholder1]}
          placeholder="Try out a course.."
          placeholderTextColor={colorScheme === "dark" ? "#D1D0D0" : "black"}
        />
        {searchQuery ? (
          <AntDesign
            name="close"
            size={20}
            color={colorScheme === "dark" ? "white" : "black"}
            onPress={onClear}
            style={styles.clearIcon}
          />
        ) : (
          <FontAwesome name="search" size={20} style={styles.clearIcon2} />
        )}
        <View
          style={{
            alignSelf: "center",
            left: wid / 15,
            backgroundColor: "#ECECEC",
            width: high / 21.35,
            height: high / 21.35,
            justifyContent: "center",
            alignContent: "center",
            borderRadius: 60,
          }}
        >
          <Image
            style={{ alignSelf: "center", width: 15, height: 15 }}
            source={require("../assets/images/filter.png")}
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#FAFAFB",
          height: high / 17.08,
          alignContent: "center",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            left: wid / 12.8,
            fontSize: 20,
            fontFamily: "Poppins-Medium",
            fontWeight: "600",
            top: 10,
          }}
        >
          Subject-Wise
        </Text>
      </View>
      {searchedData.length > 0 ? (
        <>
          <SafeAreaView
            style={{
              flex: 1,
              bottom: high / 85.4,
              alignSelf: "center",
              width: wid,
              backgroundColor: "#FAFAFB",
            }}
          >
            <FlatList
              data={searchedData}
              style={{ width: wid }}
              renderItem={({ item }) => (
                <>
                  <TouchableOpacity style={styles.topicCntr}>
                    <View style={styles.image}>
                      <Image
                        source={item.source}
                        style={{
                          width: wid / 5.4,
                          height: wid / 5.4,
                          borderRadius: 10,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        backgroundColor: "#FAFAFB",
                        width: wid / 3,
                        height: high / 15,
                        alignItems: "flex-start",
                        right: wid / 10,
                      }}
                    >
                      <Text allowFontScaling={false} style={styles.cardText}>
                        {item.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignContent: "flex-end",
                          alignItems: "flex-start",
                          backgroundColor: "#FAFAFB",
                        }}
                      >
                        <FontAwesome
                          name="eye"
                          size={10}
                          style={{ top: high / 186.75, color: "#8A8A8A" }}
                        />
                        <Text allowFontScaling={false} style={styles.number}>
                          {item.numTopics} Topic
                        </Text>
                      </View>
                    </View>
                    <Image
                      source={require("../assets/images/arow.png")}
                      style={{ left: high / 12.8 }}
                    />
                  </TouchableOpacity>
                </>
              )}
            />
          </SafeAreaView>
        </>
      ) : (
        <>
          <SafeAreaView
            style={{
              flex: 1,
              bottom: high / 85.4,
              alignSelf: "center",
              width: wid,
              backgroundColor: "#FAFAFB",
            }}
          >
            <FlatList
              data={apps}
              style={{ width: wid }}
              renderItem={({ item }) => (
                <>
                  <TouchableOpacity
                    style={styles.topicCntr}
                    onPress={() =>
                      props.navigation.navigate("Videos", {
                        source: item.videoId,
                      })
                    }
                  >
                    <View style={styles.image}>
                      <Image
                        source={item.source}
                        style={{
                          width: wid / 5.4,
                          height: wid / 5.4,
                          borderRadius: 10,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        backgroundColor: "#FAFAFB",
                        width: wid / 3,
                        height: high / 15,
                        right: wid / 12,
                      }}
                    >
                      <Text allowFontScaling={false} style={styles.cardText}>
                        {item.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignContent: "flex-end",
                          alignItems: "flex-start",
                          backgroundColor: "#FAFAFB",
                        }}
                      >
                        <FontAwesome
                          name="eye"
                          size={10}
                          style={{ top: high / 186.75, color: "#8A8A8A" }}
                        />
                        <Text allowFontScaling={false} style={styles.number}>
                          {item.numTopics} Topic
                        </Text>
                      </View>
                    </View>
                    <Image
                      source={require("../assets/images/arow.png")}
                      style={{ left: wid / 12.8 }}
                    />
                  </TouchableOpacity>
                </>
              )}
            />
          </SafeAreaView>
        </>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  searchBarContainer: {
    marginTop: high / 56.933,
    backgroundColor: "#FAFAFB",
    flexDirection: "row",
  },
  image: {
    width: wid / 5.4,
    height: wid / 5.4,
    borderRadius: 10,
    alignSelf: "center",
    right: wid / 6.8,
    // bottom: 15
  },
  number: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    left: wid / 75,
  },
  cardText: {
    fontFamily: "Poppins-Medium",
    fontSize: 17,
  },
  topicCntr: {
    height: high / 7.87,
    flexDirection: "row",
    marginBottom: high / 85.4,
    borderRadius: 11,
    justifyContent: "center",
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    borderColor: "#F1F1F1",
    width: "90%",
    backgroundColor: "#FAFAFB",
  },
  searchBar: {
    width: "70%",
    height: high / 21.35,
    alignSelf: "flex-start",
    marginLeft: wid / 15,
    paddingLeft: wid / 42.66,
    paddingBottom: high / 106.75,
    paddingTop: high / 122,
    backgroundColor: "#ECECEC",
    flexDirection: "row",
    borderRadius: 16,
    marginBottom: high / 142.33,
  },
  placeholder1: {
    fontFamily: "Poppins-Medium",
    fontStyle: "normal",
    fontSize: 13,
  },

  clearIcon: {
    position: "absolute",
    // marginTop: high/113.86,
    right: "28%",
    bottom: 13,
    color: "#8A8A8A",
    justifyContent: "center",
    alignSelf: "center",
    width: wid / 19.2,
    height: high / 42.7,
  },
  clearIcon2: {
    position: "absolute",
    // marginTop: high/200.86,
    bottom: 13,
    color: "#8A8A8A",
    right: "27%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
});
