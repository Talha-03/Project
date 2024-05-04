import React, { useState } from "react";
import { Image, View, Text, Alert, Pressable } from "react-native";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { stylesImageScreen } from "./style";

export default function ImageScreen({ route }) {
  const { uri } = route.params;
  const [uploading, setUploading] = useState(false);

  //upload image on Firebase Storage
  const handleUpload = async () => {
    setUploading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = uri.split("/").pop();
      const reference = ref(storage, `images/${filename}`);
      const result = await uploadBytes(reference, blob);
      const url = await getDownloadURL(result.ref);
      setUploading(false);
      Alert.alert("Upload successful");
    } catch (error) {
      console.error(error);
      setUploading(false);
      Alert.alert("Upload failed");
    }
  };
  return (
    <View style={stylesImageScreen.container}>
      <Image source={{ uri }} style={stylesImageScreen.image} />
      <Pressable onPress={handleUpload} style={stylesImageScreen.button}>
        <Text style={stylesImageScreen.buttonText}>
          {uploading ? "Uploading..." : "Upload to Firebase"}
        </Text>
      </Pressable>
    </View>
  );
}
