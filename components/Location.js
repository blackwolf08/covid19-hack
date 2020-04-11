import React, { useState, useEffect } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import firebase from "firebase";

const API_KEY = "AIzaSyA-BEPYPnVnTggLAhVx9BpwPkqnkLB1Pds";

Location.setApiKey(API_KEY);

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);

      let latitude = location.coords.latitude;
      let longitude = location.coords.longitude;

      let coords = { latitude, longitude };
      setCoords(coords);

      let address = await Location.reverseGeocodeAsync(coords);
      setAddress(address);
    })();
  }, []);

  const login = async () => {
    try {
      let res = await firebase.auth().signInAnonymously();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const saveToDB = async () => {
    try {
      await firebase.database().ref("users");
    } catch (error) {
      console.log(error);
    }
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (coords) {
    text = JSON.stringify(address);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      <TouchableOpacity onPress={login}>
        <Text>Login Anonymously</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={saveToDB}>
        <Text>Login Anonymously</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
