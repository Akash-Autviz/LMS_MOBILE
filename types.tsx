/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UnsafeObject } from "react-native/Libraries/Types/CodegenTypes";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Splash: NavigatorScreenParams<RootTabParamList> | undefined;
  Root: undefined;
  Home: undefined;
  Modal: undefined;
  TabTwo: undefined;
  Test: undefined;
  FullScreen: undefined;
  LoginScreen: undefined;
  SignIn: undefined;
  TestResult: undefined;
  TestInfo: undefined;
  MockTest: undefined;
  Play: undefined;
  Job: undefined;
  login: undefined;
  reset: undefined;
  Rooot: undefined;
  Purchased: undefined;
  Affairs: undefined;
  CourseDetails: undefined;
  Feed: undefined;
  Password: undefined;
  ProfilePage: undefined;
  Web: undefined;
  Profile: undefined;
  Videos: undefined;
  NotFound: undefined;
  TestTypeScreen: undefined;
  SignUp: undefined;
  WebViewInMobile: undefined;
  EditProfile: undefined;
  Otp: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  HomeScreen: undefined;
  PlayScreen: undefined;
  MockTestScreen: undefined;
  FeedScreen: undefined;
  TabTwoScreen: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
