import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

class Category extends Component {
  state = {
    loading: false
  };
  render() {
    const { navigation, name, imageUri } = this.props;
    return (
      <TouchableOpacity
        style={{
          height: 130,
          width: 130,
          marginLeft: 20,
          borderWidth: 0.5,
          borderColor: '#dddddd',
          borderRadius: 10
        }}
        onPress={() => {
          navigation.navigate('ActivityScreen', { title: name });
        }}
      >
        <View style={{ flex: 2 }}>
          <Image
            source={{ uri: imageUri }}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'cover',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            }}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
          <Text>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
