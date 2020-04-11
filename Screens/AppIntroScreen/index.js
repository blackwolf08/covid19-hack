import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, Alert } from 'react-native';
import AppIntro from 'rn-falcon-app-intro';
import app_intro_1 from '../../assets/app_intro_1.png';
import app_intro_2 from '../../assets/app_intro_2.png';
import app_intro_3 from '../../assets/app_intro_3.png';
import app_intro_4 from '../../assets/app_intro_4.png';
import app_intro_5 from '../../assets/app_intro_5.png';
import app_intro_6 from '../../assets/app_intro_6.png';

class AppIntroScreen extends Component {
  onSkipBtnHandle = index => {
    this.props.navigation.navigate('Auth');
  };
  doneBtnHandle = () => {
    this.props.navigation.navigate('Auth');
  };
  nextBtnHandle = index => {};
  onSlideChangeHandle = (index, total) => {};
  render() {
    const pageArray = [
      {
        title: 'Taxi!',
        description: 'Check-in your luggage on the App!',
        img: app_intro_1,
        imgStyle: {
          height: 120 * 2.5,
          width: 120 * 2.5,
          resizeMode: 'contain'
        },
        backgroundColor: '#fff',
        fontColor: 'rgba(0,0,0,0.8)',
        level: 10
      },
      {
        title: 'Airport Assistance',
        description: 'Porter, Air-Cab, E-Cart and much more!',
        img: app_intro_2,
        imgStyle: {
          height: 120 * 2.5,
          width: 120 * 2.5,
          resizeMode: 'contain'
        },
        backgroundColor: '#fff',
        fontColor: 'rgba(0,0,0,0.8)',
        level: 10
      },
      {
        title: 'Curated Travel Destinations',
        description: 'Get personalised Destination Packages!',
        img: app_intro_3,
        imgStyle: {
          height: 120 * 2.5,
          width: 120 * 2.5,
          resizeMode: 'contain'
        },
        backgroundColor: '#fff',
        fontColor: 'rgba(0,0,0,0.8)',
        level: 10
      },
      {
        title: 'Book Flights, Hotels & Cab',
        description: 'Best rates and customised recommendations!',
        img: app_intro_4,
        imgStyle: {
          height: 120 * 2.5,
          width: 120 * 2.5,
          resizeMode: 'contain'
        },
        backgroundColor: '#fff',
        fontColor: 'rgba(0,0,0,0.8)',
        level: 10
      },
      {
        title: 'Magic Itinerary',
        description: 'Set and Destination and Date, and let us do the rest!',
        img: app_intro_5,
        imgStyle: {
          height: 120 * 2.5,
          width: 120 * 2.5,
          resizeMode: 'contain'
        },
        backgroundColor: '#fff',
        fontColor: 'rgba(0,0,0,0.8)',
        level: 10
      },
      {
        title: 'Global Presence',
        description: 'We got you covered in 250+ destinations WorldWide!',
        img: app_intro_6,
        imgStyle: {
          height: 120 * 2.5,
          width: 120 * 2.5,
          resizeMode: 'contain'
        },
        backgroundColor: '#fff',
        fontColor: 'rgba(0,0,0,0.8)',
        level: 10
      }
    ];
    return (
      <AppIntro
        onNextBtnClick={this.nextBtnHandle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        pageArray={pageArray}
        dotColor='rgba(0,0,0,0.1)'
        activeDotColor='#777'
        rightTextColor='rgba(0,0,0,0.8)'
        leftTextColor='rgba(0,0,0,0.8)'
        doneBtnLabel='Go!'
      />
    );
  }
}
export default AppIntroScreen;
