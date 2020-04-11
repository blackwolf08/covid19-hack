import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import StarRating from 'react-native-star-rating';

import { apiCallPost } from '../../api';

class Home extends Component {
  state = {
    loading: false
  };
  onStarRatingPress = rating => {
    this.setState({
      loading: true
    });
    try {
      console.log('hi');
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    if (this.state.loading) {
      <View
        style={{
          width: this.props.width / 2 - 30,
          height: this.props.width / 2 - 30
        }}
      >
        <View style={{ flex: 1 }}>
          <ActivityIndicator />
        </View>
      </View>;
    }
    return (
      <View
        style={{
          width: this.props.width / 2 - 30,
          height: this.props.width / 2 - 30
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
            source={{ uri: this.props.img }}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'space-evenly',
            paddingLeft: 10
          }}
        >
          <Text style={{ fontSize: 10, color: '#b63838' }}>
            {this.props.type}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
            {this.props.name}
          </Text>
          <Text style={{ fontSize: 10 }}>{this.props.price}$</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <StarRating
              maxStars={5}
              rating={this.props.rating}
              starSize={10}
              selectedStar={rating => this.onStarRatingPress(rating)}
            />
            <Text
              style={{
                fontSize: 10,
                marginLeft: 5
              }}
            >
              ({this.props.rating_count})
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
