import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Dimensions } from "react-native";
import { Image } from "react-native-paper/lib/typescript/components/Avatar/Avatar";
import { SafeAreaView } from "react-native-safe-area-context";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function Vocabulary() {
  return <></>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

Vocabulary;
