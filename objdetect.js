import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Platform,
  ActivityIndicator,
  Pressable,
  ScrollView,
} from "react-native";
import { faceDetection } from "./style";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import * as ImagePicker from "expo-image-picker";
import * as jpeg from "jpeg-js";
import * as Blazeface from "@tensorflow-models/blazeface";

const FaceDetector = () => {
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
      await tf.ready(); // Initialize TensorFlow.js
    })();
  }, []);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 1,
        aspect: [4, 3],
      });

      if (!result.cancelled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  const detectFaces = async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(selectedImage);
      const rawImageData = await response.arrayBuffer();
      const imageData = jpeg.decode(rawImageData, true);
      const blazeFace = await Blazeface.load();
      const faces = await blazeFace.estimateFaces(imageData, false);
      setDetectedFaces(faces);
    } catch (error) {
      console.error("Error detecting faces:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 20,
        }}
      >
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 300, height: 300, marginBottom: 20 }}
          />
        )}
        {isLoading && <ActivityIndicator size={40} />}
        {detectedFaces.length > 0 && (
          <View>
            <Text style={faceDetection.result}>Face Detection Result</Text>
            {detectedFaces.map((face, index) => (
              <View key={index} style={{ marginTop: 10 }}>
                <Text style={{ color: "red", fontSize: 16, fontWeight: 600 }}>
                  Face {index + 1}
                </Text>
                <Text style={faceDetection.infoText}>
                  <Text style={{ color: "black" }}>Top: </Text>{" "}
                  {face.topLeft[0]}
                </Text>
                <Text style={faceDetection.infoText}>
                  <Text style={{ color: "black" }}>Left: </Text>{" "}
                  {face.topLeft[1]}
                </Text>
                <Text style={faceDetection.infoText}>
                  <Text style={{ color: "black" }}>Width: </Text>{" "}
                  {face.bottomRight[0] - face.topLeft[0]}
                </Text>
                <Text style={faceDetection.infoText}>
                  <Text style={{ color: "black" }}>Height: </Text>{" "}
                  {face.bottomRight[1] - face.topLeft[1]}
                </Text>
              </View>
            ))}
          </View>
        )}
        <View style={faceDetection.buttonContainer}>
          <Pressable onPress={selectImage} style={faceDetection.button}>
            <Text style={faceDetection.buttonText}>Select Image</Text>
          </Pressable>
          <Button
            title="Detect Faces"
            onPress={detectFaces}
            disabled={!selectedImage}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default FaceDetector;
