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

export default function App(props) {
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
      let res = await Location.isBackgroundLocationAvailableAsync();
      console.log(res);
      Location.startLocationUpdatesAsync("UPDATE_LOCATION");

      // setLocation(location);

      // let latitude = location.coords.latitude;
      // let longitude = location.coords.longitude;

      // let coords = { latitude, longitude };
      // setCoords(coords);

      // let address = await Location.reverseGeocodeAsync(coords);
      // setAddress(address);
      // props.setLocation(coords, address);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (coords) {
    text = JSON.stringify(address);
  }

  return <></>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
