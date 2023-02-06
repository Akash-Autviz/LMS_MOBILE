import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { StackActions, useNavigation } from "@react-navigation/native";
import {
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  BackHandler,
  Share,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { View, Text } from "../components/Themed";
import { useStateContext } from "./Context/ContextProvider";
import axios from "axios";
import { baseUrl } from "../utils";
import { options_ } from "../utils/Logics";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function EditProfile(props: any) {
  const { userDetail, userImage, access_token, setAccess_token } =
    useStateContext();
  const navigation = useNavigation();
  const [currUserDetail, setcurrUserDetail] = useState<any>();
  const [surName, setSurName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hasGalleryPermission, setHasGalleryPermission] =
    useState<boolean>(false);
  const [iamge, setImgae] = useState<String>("");
  let config: any = {
    "Content-Type": "application/json",
    "Abp-TenantId": "1",
  };
  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status == "granted");
    })();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImgae(result.uri);
    }
  };

  const save = async () => {
    let data = JSON.stringify({
      id: 29,
      userName: !phoneNumber ? userDetail.userName : phoneNumber,
      name: name,
      gender: null,
      phoneNumber: null,
      pofileImage: "",
      surname: surName,
      emailAddress: email,
      isActive: true,
      fullName: name + surName,
      //   normalPassword: "Sujata@123",
      creationTime: moment(),
      roleNames: ["STUDENT"],
    });
    try {
      const res = await axios.put(
        "http://13.126.218.96/api/services/app/User/Update",
        data,
        config
      );
      console.log(res);
    } catch (error) {
      console.log("User/Updata", error);
    }
  };
  useEffect(() => {
    const backbuttonHander = () => {
      navigation.navigate("ProfilePage");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });
  console.log(access_token);

  const getcurrUserDeatail = async () => {
    const header: any = {
      Authorization: `Bearer ${access_token}`,
      "Abp-TenantId": "1",
      tenantId: 1,
    };
    try {
      let data = { tenantId: 1 };
      const res = await axios.get(
        `http://13.126.218.96/api/services/app/User/Get?Id=22`,
        header
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getcurrUserDeatail();
  }, []);
  return (
    <ScrollView style={{ backgroundColor: "#FAFAFB", flex: 1 }}>
      <ImageBackground
        style={{ paddingVertical: high / 30 }}
        imageStyle={{}}
        source={require("../assets/images/bgBig.png")}
      >
        <Text
          allowFontScaling={false}
          style={{
            fontSize: 20,
            textAlign: "center",
            fontFamily: "Poppins-Bold",
            color: "white",
          }}
        >
          Edit Profile
        </Text>
        <View
          style={{
            width: wid,
            backgroundColor: "transparent",
          }}
        >
          {userImage ? (
            <Image
              source={require("../assets/images/profile.png")}
              //   source={{ uri: userImage }}
              style={{
                marginTop: high / 30,
                alignSelf: "center",
                borderRadius: 18,
                width: wid / 4.5,
                height: wid / 4.5,
              }}
            />
          ) : (
            <Image
              source={require("../assets/images/profile.png")}
              style={{
                alignSelf: "center",
                marginTop: high / 30,
                borderRadius: 18,
                width: wid / 4.5,
                height: wid / 4.5,
              }}
            />
          )}
          <Text
            allowFontScaling={false}
            style={{
              marginTop: high / 30,
              alignSelf: "center",
              color: "white",
              fontFamily: "Poppins-Regular",
              fontSize: 15,
            }}
          >
            Do not disturb, doing a study right now.
          </Text>
          <TouchableOpacity
            onPress={() => pickImage()}
            style={{
              justifyContent: "center",
              backgroundColor: "#2C384C",
              marginTop: high / 50,
              width: wid / 3,
              height: high / 21.35,
              borderRadius: 114,
              alignSelf: "center",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                alignSelf: "center",
                color: "white",
                fontFamily: "Poppins-Regular",
                fontSize: 15,
              }}
            >
              Edit Image
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <Text style={styles.textColor}>Edit Profile </Text>
          <TextInput
            value={name}
            placeholder="Enter Name"
            style={styles.textInput}
            onChangeText={(data: any) => setName(data.trim())}
          />
          <TextInput
            placeholder="Enter SurName"
            value={surName}
            style={styles.textInput}
            onChangeText={(data: any) => setSurName(data)}
          />
          <TextInput
            placeholder="Enter Phone No"
            value={phoneNumber}
            textContentType="telephoneNumber"
            keyboardType="number-pad"
            style={styles.textInput}
            onChangeText={(data: any) => setPhoneNumber(data)}
          />
          <TextInput
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            style={styles.textInput}
            onChangeText={(data: any) => setEmail(data)}
          />
          <TouchableOpacity
            onPress={() => {
              save();
            }}
            style={{
              width: wid / 2.258,
              height: high / 17.08,
              backgroundColor: "#319EAE",
              borderRadius: 26,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginTop: high / 20,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 18,
                color: "white",
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>

      {/* </ScrollView> */}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  formContainer: {
    justifyContent: "center",
    paddingHorizontal: wid / 10,
    paddingVertical: high / 60,
  },
  textColor: {
    fontSize: 20,
    textAlign: "left",
    color: "#959595",
    fontFamily: "Poppins-Medium",
  },

  inner: {
    // height: high / 1.9,
    justifyContent: "space-around",
    backgroundColor: "pink",
  },
  textInput: {
    marginTop: high / 60,
    borderWidth: 1,
    fontFamily: "Poppins-Regular",
    marginBottom: 5,
    borderColor: "#DBDBDB",
    alignSelf: "center",
    paddingHorizontal: wid / 30,
    width: wid / 1.25,
    flexDirection: "row",
    borderRadius: 5,
    justifyContent: "center",
    height: high / 16.35,
  },
});
