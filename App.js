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
// import our custom responsive image component
import { ResponsiveImage } from "./components/ResponsiveImage";

/**
 * In this example React Native app, we create a custom Image component, `ResponsiveImage` which uses imgix's
 * rendering API to render an optimized image. The component uses React Native's Animation module to "blur-up"
 * from a blurred version of our image into a full-resolution version.
 *
 * NOTE: there is a simulated "slow" connection in this demo. You can remove it by setting `delay` to `0` in `ResponsiveImage.js`
 */

export default function App() {
  // Get the dimensions of the device's window, this will update if the device rotates.
  const win = useWindowDimensions();

  // crop the imgage to the device w,h, use avif picture format, and match device DPR.
  // NOTE: do not use {format: 'avif'} parameter, not compatible with anroid.
  const imgixParams = {
    fit: "crop",
    w: win.width,
    h: win.height,
    dpr: PixelRatio.get(),
  };

  const goToImgixDocs = () => {
    Linking.openURL("https://docs.imgix.com/apis/rendering");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Add imgix{" "}
        <Text style={styles.link} onPress={goToImgixDocs}>
          parameters
        </Text>{" "}
        in <Text style={{ fontWeight: "normal" }}>ResponsiveImage.js</Text> to
        transform the image.
      </Text>
      <ResponsiveImage
        height={win.height}
        width={win.width}
        style={{ width: win.width, height: win.height }}
        resizeMode="cover"
        source={{ uri: "https://sdk-test.imgix.net/amsterdam.jpg" }}
        params={imgixParams}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
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
});
