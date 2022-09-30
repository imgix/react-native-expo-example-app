import ImgixClient from "@imgix/js-core";
import * as React from "react";
import { Animated, StyleSheet, View } from "react-native";

export const ImgixImage = (props) => {
  const { width, height, params, source } = props;
  const imgix = new ImgixClient({ domain: source.domain });
  /**
   * create a "full resolution image" that matches the device dimensions and
   * device-pixel-ratio.
   */
  const imgixParams = {
    ...params,
    fit: "crop",
    h: height,
    w: width,
  };
  const uri = {
    uri: imgix.buildURL(source.path, imgixParams),
  };

  /**
   * create a low quality image placeholder with imgix rendering API
   */
  const lqipParams = {
    ...params,
    fit: "crop",
    w: width ? width / 4 : null,
    h: height / 4,
    dpr: 1,
    blur: 25,
  };
  const lqipUri = { uri: imgix.buildURL(source.path, lqipParams) };

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
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: "#e1e4e8",
  },
  image: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});
