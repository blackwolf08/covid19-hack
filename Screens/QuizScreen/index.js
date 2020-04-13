import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import RNPickerSelect from "react-native-picker-select";
import { MultipleSelectPicker } from "react-native-multi-select-picker";
import Chatbot from "../Chatbot";
import firebase from "firebase";
import axios from "axios";

import AwesomeButton from "react-native-really-awesome-button";

const { width, height } = Dimensions.get("window");

let sumval = 0;
let grade = "Not Calculated";
class SavedScreen extends Component {
  state = {
    selectectedItems: [],
    isShownPicker: false,
    gradeval: grade,
  };
  multiSelect;

  calcGVal = async (sumval) => {
    if (sumval > 50) grade = "A";
    else if (sumval > 30) grade = "B";
    else if (sumval > 20) grade = "C";
    else if (sumval > 10) grade = "D";
    else grade = "F";
    try {
      let currUser = firebase.auth().currentUser.uid;
      let databaseRef = firebase.database().ref(`hasCorona/${currUser}`);
      if (sumval > 30) {
        databaseRef.set({ hasCorona: true });
        axios.get("https://covid19sunny.herokuapp.com/?uid=" + currUser);
      } else {
        databaseRef.set({ hasCorona: false });
      }
    } catch (e) {
      console.log(e);
    }
    this.setState({
      gradeval: grade,
    });
  };

  clacGrade(val2) {
    sumval = sumval + val2;
  }
  render() {
    const items = [
      { label: "Severe Weakness", value: 4 },
      { label: "Persistent Pain in chest", value: 6 },
      { label: "Drowsiness", value: 0 },
      { label: "Difficulty in breathing", value: 7 },
      { label: "Moderate to Severe Cough", value: 8 },
      { label: "Change in appetite", value: 2 },
      { label: "Loss in Sense of Smell", value: 3 },
      { label: "Sore Throat", value: 9 },
      { label: "Dry Cough", value: 10 },
    ];
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text
            style={{
              opacity: 0.7,
              fontSize: 20,
              color: "#101010",
              fontWeight: "bold",
              textAlign: "center",
              paddingTop: 20,
            }}
          >
            COVID-19 Slef Assisment Test
          </Text>
          <Text
            style={{
              opacity: 0.7,
              fontSize: 20,
              color: "#101010",
              fontWeight: "bold",
              marginTop: 20,
              textAlign: "center",
            }}
          >
            Answer the following question to measure your Risk Grade
          </Text>
        </View>
        <ScrollView
          decelerationRate={0}
          snapToInterval={height - 200} //your element width
          snapToAlignment={"center"}
        >
          <View style={styles.moreInfoConatiner}>
            <Text
              style={{
                opacity: 0.7,
                fontSize: 20,
                color: "rgba(0,0,0,1)",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              Have you travelled internationally in feb/ march 2020?
            </Text>
            <RNPickerSelect
              onValueChange={(value) => this.clacGrade(value)}
              items={[
                { label: "Yes", value: 30 },
                { label: "No", value: 1 },
              ]}
              placeholder={{
                label: "Select your answer...",
              }}
              style={pickerSelectStyles}
            />
          </View>
          <View style={styles.moreInfoConatiner}>
            <Text
              style={{
                opacity: 0.7,
                fontSize: 20,
                color: "rgba(0,0,0,1)",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 20,
                marginTop: 40,
              }}
            >
              Are you experiencing any of the symptoms below?
            </Text>

            <MultipleSelectPicker
              items={items}
              onSelectionsChange={(ele) => {
                this.setState({ selectectedItems: ele });
              }}
              selectedItems={this.state.selectectedItems}
              buttonStyle={{
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
              buttonText="hello"
              checkboxStyle={{ height: 20, width: 20 }}
            />

            {(this.state.selectectedItems || []).map((item, index) => {
              sumval += item.value;

              return <Text></Text>;
            })}
          </View>
          <View style={styles.moreInfoConatiner}>
            <Text
              style={{
                opacity: 0.7,
                fontSize: 20,
                color: "rgba(0,0,0,1)",
                fontWeight: "bold",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Let us know your body temperature
            </Text>

            <RNPickerSelect
              onValueChange={(value) => this.clacGrade(value)}
              items={[
                { label: "Normal ( 96-98.6) °F", value: 1 },
                { label: "Fever ( 98.6-102) °F", value: 4 },
                { label: "High Fever ( >102) °F", value: 7 },
              ]}
              placeholder={{
                label: "Select your answer...",
              }}
              style={pickerSelectStyles}
            />
          </View>
          <View style={styles.moreInfoConatiner}>
            <Text
              style={{
                padding: 10,
                opacity: 0.7,
                fontSize: 20,
                color: "rgba(0,0,0,1)",
                fontWeight: "bold",
              }}
            >
              Have you come in contact with anyone who has been positively
              tested for COVID-19 (Corona Virus)?
            </Text>
            <RNPickerSelect
              onValueChange={(value) => this.clacGrade(value)}
              items={[
                { label: "Yes", value: 28 },
                { label: "No", value: 2 },
                { label: "I do not know", value: 10 },
              ]}
              placeholder={{
                label: "Select your answer...",
              }}
              style={pickerSelectStyles}
            />
          </View>

          <View style={styles.moreInfoConatiner}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 40 }}>
              Legend{" "}
            </Text>
            <Text style={styles.instruct}>A (High Risk, seek help) </Text>
            <Text style={styles.instruct}>B (At Risk) </Text>
            <Text style={styles.instruct}>C (Medium Risk) </Text>
            <Text style={styles.instruct}>D (Low Risk) </Text>
            <Text style={styles.instruct}>F (Very Low Risk)</Text>
            <Text
              style={[
                styles.moreInfoText,
                {
                  color:
                    this.state.gradeval == "A" || this.state.gradeval == "B"
                      ? "red"
                      : "green",
                },
              ]}
            >
              Grade: {this.state.gradeval}{" "}
            </Text>
            <AwesomeButton
              progress
              activityColor="#FFFFFF"
              backgroundColor="#1E90FF"
              onPress={(next) => {
                /** Do Something **/
                {
                  this.calcGVal(sumval);
                }
                next();
              }}
            >
              Get Estimation
            </AwesomeButton>
          </View>
        </ScrollView>
        <Chatbot />
      </View>
    );
  }
}
export default SavedScreen;

const styles = StyleSheet.create({
  moreInfoConatiner: {
    borderRadius: 16,
    padding: 20,
    width: width,
    justifyContent: "center",
    height: height - 200,
  },
  moreInfoText: {
    opacity: 0.7,
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  instruct: {
    fontSize: 18,
    color: "#1f1f1f",
    marginTop: 20,
  },
  title: {
    height: 150,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
