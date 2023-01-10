import React, { useEffect } from "react";
import { WebView } from "react-native-webview";
import { ActivityIndicator, Dimensions, View, StyleSheet } from "react-native";
import { BackHandler, Text } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Webview(props: any) {
  console.log(props.route.params.url);

  const url = props.route.params.url;
  useEffect(() => {
    const backbuttonHander = () => {
      props.navigation.goBack();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });
  useEffect(() => {
    setTimeout(() => {
      props.navigation.goBack();
    }, 2000);
  });
  return (
    <WebView
      style={{ marginTop: 40 }}
      source={{ uri: url }}
      startInLoadingState={true}
      renderError={(errorDomain, errorCode, errorDesc) => {
        return (
          <View style={styles.loadingOrErrorView}>
            <ActivityIndicator
              color={"black"}
              size={"small"}
              style={styles.loader}
            />
            <Text
              style={{
                alignSelf: "center",
                color: "black",
              }}
            >
              Downloading.....
            </Text>
          </View>
        );
      }}
      //   renderLoading={() =>
      //     name != "Feedback form" ? (
      //       <ActivityIndicator
      //         color={"red"}
      //         size={"large"}
      //         style={styles.loader}
      //       />
      //     ) : (
      //       <></>
      //     )
      //   }
    />
  );
}
const styles = StyleSheet.create({
  loadingOrErrorView: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  loader: {
    // position: "absolute",
    // top: height / 2,
    left: width / 3.1,
  },
});
