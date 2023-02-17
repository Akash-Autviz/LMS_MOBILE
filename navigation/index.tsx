/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { useEffect, useState, useLayoutEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SecureStore from "expo-secure-store";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabTwoScreen from "../screens/TabTwoScreen";
import { RootStackParamList, RootTabParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import HomeScreen from "../screens/HomeScreen";
import FeedScreen from "../screens/FeedScreen";
import Fullscreen from "../screens/FullScreen";
import MockTestScreen from "../screens/MockTestScreen";

import PlayScreen from "../screens/PlayScreen";
import VideosScreen from "../screens/VideosScreen";
import CourseDetails from "../screens/CourseDetails";
import SignInPage from "../screens/SignInPage";
import LoginScreen from "../screens/LoginScreen";
import ProfilePage from "../screens/ProfilePage";
import MockTestSubjectTest from "../screens/MockTestSubjectScreen";
import Purchased from "../screens/Purchased";
import TestInfoScreen from "../screens/TestInfoScreen";
import AffairsView from "../screens/AffairsView";
import TestResultScreen from "../screens/TestResultScreen";

import JobNotification from "../screens/JobNotification";
import Password from "../screens/Password";
import Webview from "../screens/Webview";
import { useStateContext } from "../screens/Context/ContextProvider";
import MockTestTypeTest from "../screens/MockTestTypeTest";
import ResetPassword from "../screens/ResetPassword";
import SignUpScreen from "../screens/SignUpScreen";
import WebViewInMobile from "../screens/WebViewInMobile";
import EditProfile from "../screens/EditProfile";
import OtpScreen from "../screens/OtpScreen";
import QuizTestScreen from "../screens/QuizTestScreen";
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);
  useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 1000);
  }, []);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const navigation = useNavigation();
  const [isLogIn, setisLogIn] = useState(false);
  const { userDetail, setUserDetail } = useStateContext();

  async function getValueFor() {
    try {
      let accesToken = await SecureStore.getItemAsync("userId1");

      let User = await SecureStore.getItemAsync("access_token");

      if (accesToken && User) {
        setisLogIn(true);
      }
    } catch (error) {
      alert("Session END");
    }
  }
  useEffect(() => {
    getValueFor();
  }, []);

  return (
    <Stack.Navigator>
      {!isLogIn && (
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}

      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Test"
        component={MockTestSubjectTest}
        options={{ headerShown: false, navigationBarHidden: false }}
      />
      <Stack.Screen
        name="reset"
        component={ResetPassword}
        options={{
          headerTitle: "Forgot Password",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Purchased"
        component={Purchased}
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerTitleAlign: "center",
          headerTitle: "My Course",
        }}
      />
      <Stack.Screen
        name="FullScreen"
        component={Fullscreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Web"
        component={Webview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TestTypeScreen"
        component={MockTestTypeTest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuizTest"
        component={QuizTestScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="WebViewInMobile"
        component={WebViewInMobile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TestResult"
        component={TestResultScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CourseDetails"
        component={CourseDetails}
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerTitleAlign: "center",
          headerTitle: "Course Details",
        }}
      />
      <Stack.Screen
        name="Otp"
        component={OtpScreen}
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerTitleAlign: "center",
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
}
function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CourseDetails"
        component={CourseDetails}
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerTitleAlign: "center",
          headerTitle: "Course Details",
        }}
      />
      <Stack.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Job"
        component={JobNotification}
        options={{
          headerTitle: "Job Notification",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Password"
        component={Password}
        options={{
          headerTitle: "Password Management",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="Videos"
        component={VideosScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TestResult"
        component={TestResultScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function Feed() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Affairs"
        component={AffairsView}
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerTitleAlign: "center",
          headerTitle: "My Feed",
        }}
      />
      <Stack.Screen
        name="TestResult"
        component={TestResultScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator({ navigation }: any) {
  const colorScheme = useColorScheme();

  return (
    <React.Fragment>
      <BottomTab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: Colors[colorScheme].tint,
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "#2E343C" : "#FAFAFB",
            position: "absolute",
            borderTopWidth: colorScheme === "dark" ? 0 : 1,
          },
        }}
      >
        <BottomTab.Screen
          name="HomeScreen"
          component={Home}
          listeners={({ navigation }) => ({
            tabPress: (event: { preventDefault: () => void }) => {
              event.preventDefault();
              navigation.navigate("Home");
            },
          })}
          options={() => ({
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <Image
                style={{
                  justifyContent: "center",
                  width: 19,
                  height: 18,
                  tintColor: focused ? "#498BEA" : "#747B84", // : "#fff 498BEA",
                }}
                source={require("../assets/images/Nav/home.png")}
              />
            ),
          })}
        />
        <BottomTab.Screen
          name="TabTwoScreen"
          component={TabTwoScreen}
          listeners={({ navigation }) => ({
            tabPress: (event: { preventDefault: () => void }) => {
              event.preventDefault();
              // setShowBottom(true);
              navigation.navigate("TabTwoScreen");
            },
          })}
          options={{
            title: "Tab Two",
            tabBarIcon: ({ focused }) => (
              <Image
                style={{
                  justifyContent: "center",
                  width: 24,
                  height: 24,
                  tintColor: focused ? "#498BEA" : "#747B84", // : "#fff 498BEA",
                }}
                source={require("../assets/images/Nav/book.png")}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="PlayScreen"
          component={PlayScreen}
          listeners={({ navigation }) => ({
            tabPress: (event: { preventDefault: () => void }) => {
              event.preventDefault();
              // setShowBottom(true);
              navigation.navigate("PlayScreen");
            },
          })}
          options={{
            title: "Play",
            tabBarIcon: ({ focused }) => (
              <Image
                style={{
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  bottom: 1,
                  borderRadius: 10,
                  // tintColor: focused ? "#498BEA" : "#747B84", // : "#fff 498BEA",
                }}
                source={require("../assets/images/Nav/play.png")}
              />
              //  <Icon  />
            ),
          }}
        />
        <BottomTab.Screen
          name="MockTestScreen"
          component={MockTestScreen}
          options={{
            title: "MockTest",
            tabBarIcon: ({ focused }) => (
              <Image
                style={{
                  justifyContent: "center",
                  width: 24,
                  height: 24,
                  tintColor: focused ? "#498BEA" : "#747B84", // : "#fff 498BEA",
                }}
                source={require("../assets/images/Nav/test.png")}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="FeedScreen"
          component={Feed}
          options={{
            title: "Feed",
            tabBarIcon: ({ focused }) => (
              <Image
                style={{
                  justifyContent: "center",
                  width: 22,
                  height: 22,
                  tintColor: focused ? "#498BEA" : "#747B84", // : "#fff 498BEA",
                }}
                source={require("../assets/images/Nav/feed.png")}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    </React.Fragment>
  );
}
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return (
    <FontAwesome
      size={30}
      style={{ marginBottom: -3, backgroundColor: "#FAFAFB" }}
      {...props}
    />
  );
}
