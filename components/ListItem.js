import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";

const mediaURL = "http://media.mw.metropolia.fi/wbma/uploads/";
const ListItem = props => {
  console.log("list item props", props.singleMedia);
  return (
    <TouchableOpacity style={styles.row}>
      <View style={styles.imagebox}>
        <Image
          style={styles.image}
          source={{ uri: mediaURL + props.singleMedia.thumbnails.w160 }}
        />
      </View>
      <View style={styles.textbox}>
        <Text style={styles.listTitle}>{props.singleMedia.title}</Text>
        <Text>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#ccc",
    marginBottom: 5,
    borderRadius: 16
  },
  imagebox: {
    flex: 1
  },
  image: {
    flex: 1,
    width: "100%",
    height: 150,
    borderRadius: 16
  },
  textbox: {
    flex: 1,
    padding: 10
  },
  listTitle: {
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 15
  }
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object
};

export default ListItem;
