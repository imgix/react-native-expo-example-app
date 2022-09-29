import ImgixClient from "@imgix/js-core";
import Constants from "expo-constants";
import * as React from "react";
import {
  Image,
  Linking,
  PixelRatio,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export default function App() {
  const imgix = new ImgixClient({ domain: "sdk-test.imgix.net" });
  const { width, height } = useWindowDimensions();
  const imgixParams = {
    fit: "crop",
    h: height,
    w: width,
    dpr: PixelRatio.get(),
  };
  const uri = {
    uri: imgix.buildURL("amsterdam.jpg", imgixParams),
  };

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
      <Image style={styles.image} height={height} source={uri} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
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
  image: {
    flex: 1,
    backgroundColor: "#e1e4e8",
  },
});
