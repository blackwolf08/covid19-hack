import React, { Component } from 'react';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';

class InitialScreen extends Component {
  async componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    let token = await AsyncStorage.getItem('token');

    if (!token) {
      this.props.navigation.navigate('AppIntro');
    } else {
      this.props.navigation.navigate('App');
    }
    // this.props.navigation.navigate('App');
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
      </View>
    );
  }
}
export default InitialScreen;
