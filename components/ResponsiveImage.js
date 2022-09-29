// Based off of "Progressive Image Loading in React Native" by Spencer Carli:
// https://medium.com/react-native-training/progressive-image-loading-in-react-native-e7a01827feb7

import * as React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import ImgixClient from '@imgix/js-core';

export const ResponsiveImage = (props) => {
  const {source, style, width, height, params} = props;

  // create a low quality image placeholder with imgix rendering API transformations set in props.params
  const lqipParams = {...params, w: width/4, h: height/4, dpr:1, blur: 25}
  const lqipSource = ImgixClient._buildURL(source.uri, lqipParams);
  // create an image source with imgix rendering API transformations set in props.params
  const imageSource = ImgixClient._buildURL(source.uri, params)

  // animate the opacity of the lqip and full quality image
  lqipOpacity = React.useRef(new Animated.Value(0.01)).current;
  imageOpacity = React.useRef(new Animated.Value(0.01)).current;

  // when image loads, set their opacity to 1
  handleLqipLoad = () => {
    Animated.timing(lqipOpacity, {
      toValue: 1,
    }).start();
  }
  handleImageLoad = () => {
    // delay the animation to simulate a slow internet conneciton
    const delay = 500 // miliseconds

    Animated.timing(imageOpacity, {
      delay,
      toValue: 1,
    }).start();
  }

  return (
    <View style={styles.container}>
      <Animated.Image 
        {...props} 
        source={{uri: lqipSource}} 
        style={[style, {opacity: lqipOpacity}]}
        onLoad={handleLqipLoad}
        testID={'foobar2'}
      />
      <Animated.Image 
        {...props} 
        testID={'foobar'}
        source={{...source, uri: imageSource}} 
        style={[styles.imageOverlay, {opacity: imageOpacity}, style]} 
        onLoad={handleImageLoad}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e4e8"
  },
    imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});
