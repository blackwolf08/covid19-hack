import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import Chatbot from "../Chatbot";
import axios from "axios";
import firebase from "firebase";
import { Icon, Button } from "@ui-kitten/components";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const storeList = [
  {
    name: "Jai Ambe Departmental Store",
    address: "A-10, Jaypee College, Nodia",
    status: "Open",
    distance: "1.2 km away",
  },
  {
    name: "Big Bazzar",
    address: "Shipra Mall, Ghaziabad",
    status: "Open",
    distance: "2 km away",
  },
  {
    name: "LOTS",
    address: "A-16, Sector 62",
    status: "Closed",

    distance: "0.3 km away",
  },
];

const hospital = [
  {
    name: "Fortis",
    address: "Bada Baazar",
    status: "91 / 1431",
    distance: "1.2 km away",
  },
  {
    name: "Vedanta",
    address: "New Delhi",
    status: "200 / 987",
    distance: "6 km away",
  },
  {
    name: "AIIMS",
    address: "Patel Chowk",
    status: "789 / 1880",
    distance: "12 km away",
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
        <ScrollView style={{ flex: 1 }}>
          <Text
            style={{
              marginTop: 100,
              fontSize: 24,
              paddingHorizontal: 20,
              color: "rgba(0,0,0,0.9)",
            }}
          >
            Stores Near You
          </Text>
          {storeList.map((store, id) => (
            <View style={{ flexDirection: "row", width, padding: 20 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Feather name="shopping-cart" color={"#000"} size={20} />
              </View>
              <View
                style={{
                  flex: 4,
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {store.name}
                </Text>
                <Text style={{ color: "rgba(0,0,0,0.4)" }}>
                  {store.address}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "rgba(0,0,0,0.4)" }}>
                    <Feather name="map-pin" /> {store.distance}
                  </Text>
                  <Text
                    style={{ color: store.status == "Open" ? "green" : "red" }}
                  >
                    {store.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          <Text
            style={{
              marginTop: 20,
              fontSize: 24,
              paddingHorizontal: 20,
              color: "rgba(0,0,0,0.9)",
            }}
          >
            Avaviable Beds Near You
          </Text>
          {hospital.map((store, id) => (
            <View style={{ flexDirection: "row", width, padding: 20 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="medicinebox" color={"#000"} size={20} />
              </View>
              <View
                style={{
                  flex: 4,
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {store.name}
                </Text>
                <Text style={{ color: "rgba(0,0,0,0.4)" }}>
                  {store.address}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "rgba(0,0,0,0.4)" }}>
                    <Feather name="map-pin" /> {store.distance}
                  </Text>
                  <Text
                    style={{
                      color: "#1f1f1f",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    {store.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={{ marginBottom: 20, marginTop: 20 }}
              onPress={async () => {
                try {
                  let currUser = firebase.auth().currentUser.uid;

                  axios.get(
                    "https://covid19sunny.herokuapp.com/massgathering?uid=" +
                      currUser
                  );
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
          </View>
        </ScrollView>
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
