import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { Provider as PaperProvider } from "react-native-paper";
import React, { useEffect } from "react";
import {
  ContextProvider,
  useStateContext,
} from "./screens/Context/ContextProvider";

export default function App() {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);
  useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 1000);
  }, []);
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
  });
  const colorScheme = useColorScheme();
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ContextProvider>
          <PaperProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </PaperProvider>
        </ContextProvider>
      </SafeAreaProvider>
    );
  }
}
