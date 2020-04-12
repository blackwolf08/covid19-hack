import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import RNPickerSelect from 'react-native-picker-select';
import { MultipleSelectPicker } from 'react-native-multi-select-picker'

import AwesomeButton from "react-native-really-awesome-button";

let sumval=0;
let grade="Not Calculated";
class SavedScreen extends Component {
  state = {
    selectectedItems: [],
    isShownPicker: false,
    gradeval: grade,
}
multiSelect
  
calcGVal=(sumval)=>{
  
  if(sumval>50)
    grade="A"
    else if(sumval>30)
    grade="B"
    else if(sumval>20)
    grade="C"
    else if(sumval>10)
    grade="D"
    else
    grade="F"
console.log(grade); 
this.setState({
  gradeval: grade
})
}


clacGrade(val2)
{
  
  sumval=sumval+val2;
  console.log(sumval);
}
  render() {


    const items = [
      { label: 'Severe Weakness', value: 4 },
      { label: 'Persistent Pain in chest', value: 6 },
      { label: 'Drowsiness', value: 0 },
      { label: 'Difficulty in breathing', value: 7 },
      { label: 'Moderate to Severe Cough', value: 8 },
      { label: 'Change in appetite', value: 2 },
      { label: 'Loss in Sense of Smell', value: 3 },
      { label: 'Sore Throat', value: 9 },
      { label: 'Dry Cough', value: 10 },
  ]
    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.moreInfoConatiner}>
        <Text
                style={{
                  opacity: 0.7,
                  fontSize: 24,
                  color:'blue',
                  fontWeight: "bold",
                }}
              >
                Answer the following question to measure your Risk Grade
              </Text>
        </View>
        <View style={styles.moreInfoConatiner}>
              <Text
                style={{
                  opacity: 0.7,
                  fontSize: 24,
                  color:'red',
                  fontWeight: "bold",
                }}
              >
                Have you travelled internationally in feb/ march 2020?
              </Text>
              <RNPickerSelect
            onValueChange={(value) => this.clacGrade(value)}
            items={[
                { label: 'Yes', value: 30 },
                { label: 'No', value: 1 },
            ]}
        />          
            </View>
            <View style={styles.moreInfoConatiner}>
                <Text
                style={{
                  opacity: 0.7,
                  fontSize: 24,
                  color:'red',
                  fontWeight: "bold",
                }}
              >
                Are you experiencing any of the symptoms below?

              </Text>
              
              <TouchableOpacity
                    onPress={() => {
                        this.setState({ isShownPicker: !this.state.isShownPicker })
                    }}
                    style={{ height: 50, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#dadde3' }}
                >
                    <Text style={{opacity: 0.4,color:'black',fontWeight: "bold"}}>See Symptoms</Text>
                </TouchableOpacity>
                {this.state.isShownPicker ? <MultipleSelectPicker
                    items={items}
                    onSelectionsChange={(ele) => { this.setState({ selectectedItems: ele }) }}
                    selectedItems={this.state.selectectedItems}
                    buttonStyle={{ height: 100, justifyContent: 'center', alignItems: 'center' }}
                    buttonText='hello'
                    checkboxStyle={{ height: 20, width: 20 }}
                />
                    : null
                }
                
                {(this.state.selectectedItems || []).map((item: any, index) => {
                  sumval+=item.value;
                  
                  console.log(sumval);
                    return (<Text>

                    </Text>)
                    
                })}

             
                
              
        </View>
        <View style={styles.moreInfoConatiner}>
        <Text
                style={{
                  opacity: 0.7,
                  fontSize: 24,
                  color:'red',
                  fontWeight: "bold",
                }}
              >
                Let us know your body temperature

              </Text>
              
              <RNPickerSelect
            onValueChange={(value) => this.clacGrade(value)}
            items={[
                { label: 'Normal ( 96-98.6) °F', value: 1 },
                { label: 'Fever ( 98.6-102) °F', value: 4 },
                { label: 'High Fever ( >102) °F', value: 7 },
            ]}
        />          
              </View>
              <Text
                style={{
                  padding:10,
                  opacity: 0.7,
                  fontSize: 24,
                  color:'red',
                  fontWeight: "bold",
                }}
              >
                Have you come in contact with anyone who has been positively tested for COVID-19 (Corona Virus)?


              </Text>
              <RNPickerSelect
            onValueChange={(value) => this.clacGrade(value)}
            items={[
                { label: 'Yes', value: 28 },
                { label: 'No', value: 2 },
                { label: 'I do not know', value: 10 },
            ]}
        />          
      <View style={styles.moreInfoConatiner}>
        <Text style={styles.instruct}>
        A (High Risk, seek help) </Text>
        <Text style={styles.instruct}>B (At Risk) </Text>
        <Text style={styles.instruct}>C (Medium Risk) </Text>
        <Text style={styles.instruct}>D (Low Risk) </Text>
        <Text style={styles.instruct}>F (Very Low Risk)
        </Text>
      </View>

        <View style={styles.moreInfoConatiner}>


          <Text style={styles.moreInfoText} >Grade: {this.state.gradeval} </Text>
        <AwesomeButton 
      progress
      activityColor="#FFFFFF"
      backgroundColor= "#1E90FF"
      onPress={next => {
        /** Do Something **/
        {this.calcGVal(sumval)}
        next();
      }}
    >
     Get Estimation
    </AwesomeButton>
    </View>
        </ScrollView>
        
      </View>
    );
  }
}
export default SavedScreen;

const styles = StyleSheet.create({
  moreInfoConatiner: {
    backgroundColor: "white",
    borderRadius: 16,
    flex: 1,
    padding: 20,
  },  
  moreInfoText: {
    opacity: 0.7,
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    marginTop: 20,
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop:20,
    alignItems: "center",
    justifyContent: "center",
  },
  instruct:
  {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
    flex: 1,
  }
});
