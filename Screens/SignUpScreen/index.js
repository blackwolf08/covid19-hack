import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

import { Button, Block, Input, Text } from "../../components";
import { theme } from "../../constants";
import Location from "../../components/Location";

import firebase from "firebase";

export default class SignUp extends Component {
  state = {
    email: null,
    username: null,
    password: null,
    errors: [],
    loading: false,
    number: "9958470889",
    expoPushToken: "",
    notification: {},
    coords: {},
    address: {},
  };

  setLocation = (coords, address) => {
    this.setState({ coords, address });
  };

  handleSignUp = async () => {
    const { navigation } = this.props;
    const { email, username, password, number } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data

    try {
      let res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
          this.setState({ errors, loading: false });
          errors.push("password");
          alert(JSON.stringify(error));
        });

      if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
          );
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
        let token = await Notifications.getExpoPushTokenAsync();
        console.log(token);
        this.setState({ expoPushToken: token });
      } else {
        alert("Must use physical device for Push Notifications");
      }

      if (Platform.OS === "android") {
        Notifications.createChannelAndroidAsync("default", {
          name: "default",
          sound: true,
          priority: "max",
          vibrate: [0, 250, 250, 250],
        });
      }
      await firebase.database().ref(`users/${res.user.uid}`).set({
        email,
        username,
        number,
        expoPushToken: this.state.expoPushToken,
        coords: this.state.coords,
        address: this.state.address,
      });
      Alert.alert(
        "Success!",
        "Your account has been created",
        [
          {
            text: "Continue",
            onPress: () => {
              navigation.navigate("Login");
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      this.setState({ errors, loading: false });
      errors.push("email");
      console.log(error);
    }
  };

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <ScrollView style={{}}>
          <Block padding={[0, theme.sizes.base * 2]}>
            <Text h1 bold>
              Sign Up
            </Text>
            <Block middle>
              <Input
                email
                label="Email"
                error={hasErrors("email")}
                style={[styles.input, hasErrors("email")]}
                defaultValue={this.state.email}
                onChangeText={(text) => this.setState({ email: text })}
              />
              <Location setLocation={this.setLocation} />
              <Input
                label="Username"
                error={hasErrors("username")}
                style={[styles.input, hasErrors("username")]}
                defaultValue={this.state.username}
                onChangeText={(text) => this.setState({ username: text })}
              />
              <Input
                secure
                label="Password"
                error={hasErrors("password")}
                style={[styles.input, hasErrors("password")]}
                defaultValue={this.state.password}
                onChangeText={(text) => this.setState({ password: text })}
              />
              <Input
                label="Phone Number"
                error={hasErrors("number")}
                style={[styles.input, hasErrors("number")]}
                onChangeText={(text) => this.setState({ number: text })}
              />
              <Button gradient onPress={() => this.handleSignUp()}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Sign Up
                  </Text>
                )}
              </Button>

              <Button onPress={() => navigation.navigate("Login")}>
                <Text
                  gray
                  caption
                  center
                  style={{ textDecorationLine: "underline" }}
                >
                  Back to Login
                </Text>
              </Button>
            </Block>
          </Block>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 40,
    justifyContent: "center",
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
});
