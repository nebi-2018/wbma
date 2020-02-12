import React, { useContext } from "react";
import { List as BaseList } from "native-base";
import { FlatList } from "react-native";
import ListItem from "./ListItem";
import { MediaContext } from "../contexts/MediaContext";
import { getAllMedia } from "../hooks/APIHooks";
import PropTypes from "prop-types";

const List = props => {
  const [media, setMedia] = useContext(MediaContext);
  const [data] = getAllMedia();
  setMedia(data);
  return (
    <BaseList
      dataArray={media}
      renderRow={item => (
        <ListItem navigation={props.navigation} singleMedia={item} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object
};

export default List;
