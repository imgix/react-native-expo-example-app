import ImgixClient from "@imgix/js-core";
import Constants from "expo-constants";
import * as React from "react";
import {
  Animated,
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
  /**
   * create a "full resolution image" that matches the device dimensions and
   * device-pixel-ratio.
   */
  const imgixParams = {
    fit: "crop",
    h: height,
    w: width,
    dpr: PixelRatio.get(),
  };
  const uri = {
    uri: imgix.buildURL("amsterdam.jpg", imgixParams),
  };

  /**
   * create a low quality image placeholder with imgix rendering API
   */
  const lqipParams = {
    fit: "crop",
    w: width / 4,
    h: height / 4,
    dpr: 1,
    blur: 25,
  };
  const lqipUri = { uri: imgix.buildURL("amsterdam.jpg", lqipParams) };

  // animate the opacity of the lqip and full quality image
  const lqipOpacity = React.useRef(new Animated.Value(0.01)).current;
  const imageOpacity = React.useRef(new Animated.Value(0.01)).current;

  // when image loads, set their opacity to 1
  const handleLqipLoad = () => {
    Animated.timing(lqipOpacity, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const handleImageLoad = () => {
    Animated.timing(imageOpacity, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
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
      <View style={styles.imageContainer}>
        <Animated.Image
          style={[styles.image, { opacity: lqipOpacity }]}
          onLoad={handleLqipLoad}
          source={lqipUri}
        />
        <Animated.Image
          onLoad={handleImageLoad}
          source={uri}
          style={[styles.image, { opacity: imageOpacity }]}
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
  imageContainer: {
    flex: 1,
  },
  image: {
    position: "absolute",
    backgroundColor: "#e1e4e8",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});
