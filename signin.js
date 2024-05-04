import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { stylesSignInAndSignUp } from "./style";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        navigation.reset({
          index: 0,
          routes: [{ name: "CameraScreen" }],
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <View style={stylesSignInAndSignUp.container}>
      {/* <Image source={require('../assets/image.png')} style={{width: 120, marginBottom: 50}}/> */}
      <Text style={stylesSignInAndSignUp.title}>Login to your Account</Text>
      {error ? <Text style={stylesSignInAndSignUp.error}>{error}</Text> : null}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={stylesSignInAndSignUp.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={stylesSignInAndSignUp.input}
        secureTextEntry={true}
      />
      <Pressable onPress={handleSignIn} style={stylesSignInAndSignUp.button}>
        <Text style={stylesSignInAndSignUp.buttonText}>Sign In</Text>
      </Pressable>
      <View style={stylesSignInAndSignUp.footer}>
        <Text style={stylesSignInAndSignUp.text}>Don't have an account?</Text>
        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <Text style={stylesSignInAndSignUp.link}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignInScreen;
