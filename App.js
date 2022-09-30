import Constants from "expo-constants";
import * as React from "react";
import {
  Linking,
  PixelRatio,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { ImgixImage } from "./components/ImgixImage";

export default function App() {
  const windowDimensions = useWindowDimensions();
  const { height } = windowDimensions;
  const deviceDPR = PixelRatio.get();
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        To get started, add a URL with imgix{" "}
        <Text
          style={styles.link}
          onPress={() =>
            Linking.openURL("https://docs.imgix.com/apis/rendering")
          }
        >
          parameters
        </Text>{" "}
        to {"<Image />"} in App.js.
      </Text>
      <View style={styles.imageContainer}>
        <ImgixImage
          source={{ domain: "sdk-test.imgix.net", path: "amsterdam.jpg" }}
          height={height}
          params={{ fit: "crop", dpr: deviceDPR }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    color: "blue",
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 1,
  },
});
