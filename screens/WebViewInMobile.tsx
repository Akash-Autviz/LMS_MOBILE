import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import WebView from "react-native-webview";
// import asdf from "../assets/asdf.pdf"
const WebViewInMobile = () => {
  return (
    <ScrollView style={styles.container}>
      {/* <WebView
        style={styles.webView}
        source={{ uri: "https://www.javatpoint.com" }}
      /> */}
      {/* <WebView
        style={styles.webView}
        // source={{
        //   uri: "http://www.africau.edu/images/default/sample.pdf",
        // }}
        source={require("../assets/WithSmall.pdf")}
        bounces={true}
        useWebKit={true}
        scrollEnabled={true}
      /> */}
      <WebView
        style={styles.webView}
        originWhitelist={["*"]}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        source={{
          uri: "http://www.africau.edu/images/default/sample.pdf",
        }}
        // source={require("../assets/WithSmall.pdf")}
        // bounces={true}
        // useWebKit={true}
        // scrollEnabled={true}
      />
      <WebView
        style={styles.webView}
        originWhitelist={["*"]}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        source={{
          uri: "https://docs.google.com/gview?embedded=true&url=http://www.africau.edu/images/default/sample.pdf",
        }}
        // source={require("../assets/WithSmall.pdf")}
        // bounces={true}
        // useWebKit={true}
        // scrollEnabled={true}
      />
    </ScrollView>
  );
};

export default WebViewInMobile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    width: "100%",
    height: "50%",
  },
});
