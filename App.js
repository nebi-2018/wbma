/* eslint-disable max-len */
import React from "react";
import List from "./components/List";

import { StyleSheet, View } from "react-native";
import { MediaProvider } from "./contexts/MediaContext";

const App = () => {
  return (
    <MediaProvider>
      <View style={styles.container}>
        <List />
      </View>
    </MediaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    //alignItems: "center",
    // justifyContent: "center"
  }
});

export default App;
