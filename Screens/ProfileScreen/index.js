import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ListItem } from "react-native-elements";
import { width, height } from "../../constants";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

import Card from "../../components/CreditCardInput";

const list = [
  {
    title: "Appointments",
    icon: "av-timer",
  },
  {
    title: "Trips",
    icon: "flight-takeoff",
  },
  {
    title: "Trips",
    icon: "flight-takeoff",
  },
  {
    title: "Trips",
    icon: "flight-takeoff",
  },
  {
    title: "Trips",
    icon: "flight-takeoff",
  },
];

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
        {list.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            leftIcon={{ name: item.icon }}
            bottomDivider
            chevron
            containerStyle={{
              width,
            }}
          />
        ))}

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
