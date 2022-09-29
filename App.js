import Constants from "expo-constants";
import * as React from "react";
import { Image, Linking, StyleSheet, Text, View } from "react-native";

export default function App() {
  const imgixImageURL = "https://sdk-test.imgix.net/amsterdam.jpg";

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
      <Image
        style={styles.image}
        height={950}
        source={{ uri: imgixImageURL }}
      />
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
  },
});
