import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

class SavedScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Quiz Screen</Text>
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
