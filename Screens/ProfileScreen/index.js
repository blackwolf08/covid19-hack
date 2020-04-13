import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Chatbot from "../Chatbot";
import axios from "axios";
import firebase from "firebase";

class ProfileScreen extends Component {
  state = {
    loading: false,
  };
  render() {
    if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={async () => {
            try {
              let currUser = firebase.auth().currentUser.uid;

              axios.get("https://covid19sunny.herokuapp.com/?uid=" + currUser);
              alert("Users Near You Alerted!");
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: "#1f1f1f",
            }}
          >
            Report Mass Gathering
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            try {
              this.setState({
                loading: true,
              });
              await AsyncStorage.removeItem("token");
              this.props.navigation.navigate("Initial");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: "red",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
        <Chatbot />
      </View>
    );
  }
}
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
