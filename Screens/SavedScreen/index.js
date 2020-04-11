import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Location from "../../components/Location";

class SavedScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Location />
      </View>
    );
  }
}
export default SavedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
