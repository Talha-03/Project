import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { stylesSignInAndSignUp } from "./style";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          navigation.reset({
            index: 0,
            routes: [{ name: "CameraScreen" }],
          });
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <View style={stylesSignInAndSignUp.container}>
      {/* <Image source={require('../assets/image.png')} style={{width: 120, marginBottom: 50}}/> */}
      <Text style={stylesSignInAndSignUp.title}>Create your Account</Text>
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
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={stylesSignInAndSignUp.input}
        secureTextEntry={true}
      />
      <Pressable onPress={handleSignUp} style={stylesSignInAndSignUp.button}>
        <Text style={stylesSignInAndSignUp.buttonText}>Sign Up</Text>
      </Pressable>
      <View style={stylesSignInAndSignUp.footer}>
        <Text style={stylesSignInAndSignUp.text}>Already have an account?</Text>
        <Pressable onPress={() => navigation.navigate("SignIn")}>
          <Text style={stylesSignInAndSignUp.link}>Sign in</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUpScreen;
