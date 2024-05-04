import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CameraScreen from "./components/cameraScreen";
import SignUpScreen from "./components/signUpScreen";
import SignInScreen from "./components/signInScreen";
import ImageScreen from "./components/imageScreen";
import FaceDetector from "./components/objectDetectionScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ title: "Sign In" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: "Sign Up" }}
        />
        <Stack.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{ title: "Camera" }}
        />
        <Stack.Screen
          name="ImageScreen"
          component={ImageScreen}
          options={{ title: "Image" }}
        />
        <Stack.Screen
          name="FaceDetection"
          component={FaceDetector}
          options={{ title: "Face Detection" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
