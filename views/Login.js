import React, { useState } from "react";
import { StyleSheet, View, Text, Button, AsyncStorage } from "react-native";
import PropTypes from "prop-types";
import { fetchPOST } from "../hooks/APIHooks";
import FormTextInput from "../components/FormTextInput";
import useSignUpForm from "../hooks/LoginHooks";

const Login = props => {
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
      const user = await fetchPOST("login", inputs);
      console.log("Login", user);
      await AsyncStorage.setItem("userToken", user.token);
      await AsyncStorage.setItem("user", JSON.stringify(user.user));
      props.navigation.navigate("App");
    } catch (e) {
      console.log("signInAsync error: " + e.message);
      setError(e.message);
    }
  };
  const registerAsync = async () => {
    try {
      const result = await fetchPOST("users", inputs);
      console.log("register", result);
      signInAsync();
    } catch (e) {
      console.log("registerAsync error: ", e.message);
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* login form */}
      <View style={styles.form}>
        <Text>Login</Text>
        <View>
          <FormTextInput
            autoCapitalize="none"
            placeholder="username"
            onChangeText={handleUsernameChange}
          />
          <FormTextInput
            autoCapitalize="none"
            placeholder="password"
            secureTextEntry={true}
            onChangeText={handlePasswordChange}
          />
          <Button title="Sign in!" onPress={signInAsync} />
        </View>
      </View>

      {/* register form */}
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
            onChangeText={handlePasswordChange}
          />
          <Button title="Register!" onPress={registerAsync} />
          <Text>{error}</Text>
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
  },
  form: {
    width: "90%"
  }
});

// proptypes here
Login.propTypes = {
  navigation: PropTypes.object
};

export default Login;
