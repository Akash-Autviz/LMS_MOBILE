import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import {
  ActivityIndicator,
  Dimensions,
  View,
  Linking,
  StyleSheet,
} from "react-native";
import { BackHandler, Text } from "react-native";
import axios from "axios";
import { useStateContext } from "./Context/ContextProvider";

const { width, height } = Dimensions.get("window");
export default function Webview(props: any) {
  const [uri, setUri] = useState();
  const { access_token } = useStateContext();
  const header: any = {
    Authorization: `Bearer ${access_token}`,
    "Abp-TenantId": 1,
  };

  const getPdfLink = async () => {
    try {
      const res = await axios.get(
        `http://13.126.218.96/api/services/app/ContentManagementService/getContentNotesData?id=${props.route.params.id}`,
        header
      );
      setUri(res.data.result.notesUrl);
      // openLink(res.data.result.notesUrl);
      console.log(res, "pdf Viewer");
    } catch (error) {
      console.log(error);
    }
  };
  // function openLink(url: string) {Linking.canOpenURL(url)
  //     .then((supported) => {
  //       if (!supported) {
  //         console.log("Can't handle url: " + url);
  //         console.log("Not supported in your device");
  //       } else {
  //         return Linking.openURL(url);
  //       }
  //     })
  //     .catch((err) => console.error("An error occurred", err));
  // }

  useEffect(() => {
    getPdfLink();
  }, []);

  // return (
  //   <View>
  //     <Text>This is PDF VIEWER PAGE</Text>
  //   </View>
  // );
  const [showPdf, setShowPdf] = useState(false);

  const handlePress = async () => {
    setShowPdf(true);
  };

  return (
    <View style={styles.container}>
      {showPdf ? (
        <PDFView
          style={styles.pdf}
          onError={(error) => console.log(error)}
          resource={uri}
          resourceType="url"
        />
      ) : (
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.button} />
        </TouchableOpacity>
      )}
    </View>
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pdf: {
    flex: 1,
  },
  button: {
    width: 200,
    height: 200,
    backgroundColor: "gray",
  },
});
