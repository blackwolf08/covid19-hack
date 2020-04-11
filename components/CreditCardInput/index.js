import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {
  CreditCardInput,
  LiteCreditCardInput
} from 'react-native-input-credit-card';

export default class Card extends Component {
  _onChange = form => console.log(form);

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CreditCardInput onChange={this._onChange} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
