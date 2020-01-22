import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage,
  InputAccessoryView
} from "react-native";
import PropTypes from "prop-types";
import { login, register } from "../hooks/APIHooks";
import FormTextInput from "../components/FormTextInput";
import useSignUpForm from "../hooks/LoginHooks";

const Login = props => {
  // props is needed for navigation
  const [error, setError] = useState("");
  const {
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleFullnameChange,
    inputs
  } = useSignUpForm();
  const signInAsync = async () => {
    try {
      const user = await login(inputs);
      console.log("Login", user);
      await AsyncStorage.setItem("userToken", user.token);
      await AsyncStorage.setItem("user", JSON.stringify(user.user));
      props.navigation.navigate("App");
    } catch (e) {
      console.log(e.message);
    }
  };

  const registerAsync = async () => {
    try {
      const result = await register(inputs);
      console.log("register", user);
      if (!result.error) {
        signInAsync();
      } else {
        setError(result.error);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <View style={styles.container}>
      {/*login form*/}
      <View style={styles.form}>
        <Text>Login</Text>
        <View>
          <FormTextInput
            autoCapitalize="none"
            placeholder="username"
            value={inputs.username}
            onChangeText={handleUsernameChange}
          />
          <FormTextInput
            autoCapitalize="none"
            placeholder="password"
            secureTextEntry={true}
            value={inputs.password}
            onChangeText={handlePasswordChange}
          />
          <Button
            title="Sign in!"
            onPress={() => {
              signInAsync();
            }}
          />
        </View>
      </View>
      {/*register form*/}
      <View style={styles.form}>
        <Text>Register</Text>
        <View>
          <FormTextInput
            autoCapitalize="none"
            placeholder="username"
            onChangeText={handleUsernameChange}
          />
          <FormTextInput
            autoCapitalize="none"
            placeholder="email"
            onChangeText={handleEmailChange}
          />
          <FormTextInput
            autoCapitalize="none"
            placeholder="fullname"
            onChangeText={handleFullnameChange}
          />
          <FormTextInput
            autoCapitalize="none"
            placeholder="password"
            secureTextEntry={true}
            value={inputs.password}
            onChangeText={handlePasswordChange}
          />
          <Button
            title="Sign in!"
            onPress={() => {
              registerAsync();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40
  }
});

// proptypes here

export default Login;
