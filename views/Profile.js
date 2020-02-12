import React, { useEffect, useState } from "react";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
  Icon
} from "native-base";
import { AsyncStorage } from "react-native";
import PropTypes from "prop-types";
import { fetchGET } from "../hooks/APIHooks";
import AsyncImage from "../components/AsyncImage";
import { Dimensions } from "react-native";

const deviceHeight = Dimensions.get("window").height;

const mediaURL = "http://media.mw.metropolia.fi/wbma/uploads/";

const Profile = props => {
  const [user, setUser] = useState({
    userdata: {},
    avatar: ""
  });
  const userToState = async () => {
    try {
      const userFromStorage = await AsyncStorage.getItem("user");
      // eslint-disable-next-line max-len
      const uData = JSON.parse(userFromStorage);
      const avatarPic = await fetchGET("tags", "avatar_" + uData.user_id);
      console.log("aPic", avatarPic[0].filename);
      setUser(user => ({
        userdata: uData,
        avatar: avatarPic[0].filename
      }));
    } catch (e) {
      console.log("Profile error: ", e.message);
    }
  };

  useEffect(() => {
    userToState();
  }, []);

  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate("Auth");
  };

  console.log("ava", mediaURL + user.avatar);
  return (
    <Container>
      <Content>
        <Card>
          <CardItem header bordered>
            <Icon name="person" />
            <Text>Username: {user.userdata.username}</Text>
          </CardItem>
          <CardItem>
            <Body>
              <AsyncImage
                style={{
                  width: "100%",
                  height: deviceHeight / 2
                }}
                spinnerColor="#777"
                source={{ uri: mediaURL + user.avatar }}
              />
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Fullname: {user.userdata.full_name}</Text>
              <Text numberOfLines={1}>email: {user.userdata.email}</Text>
            </Body>
          </CardItem>
          <CardItem footer bordered>
            <Body>
              <Button full onPress={signOutAsync}>
                <Text>Logout</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object
};

export default Profile;
