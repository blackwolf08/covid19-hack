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
        title: 'Welcome!',
        description: 'An all-in-one Covid19 App',
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
        title: 'Get Alerted',
        description: 'Get a risk estimation and alert if you are around someone with high risk of infection',
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
        title: 'Get Stats',
        description: 'Get realtime stats of infection spread around you',
        img: app_intro_3,
        imgStyle: {
          height: 100 * 2.5,
          width: 120 * 2.5,
          resizeMode: 'contain'
        },
        backgroundColor: '#fff',
        fontColor: 'rgba(0,0,0,0.8)',
        level: 10
      },
      {
        title: 'Learn',
        description: 'Learn about recomended preacautionary measures',
        img: app_intro_4,
        imgStyle: {
          height: 90 * 2.5,
          width: 130 * 3.5,
          resizeMode: 'contain'
        },
        backgroundColor: '#fff',
        fontColor: 'rgba(0,0,0,0.8)',
        level: 10
      },
      {
        title: 'Stay Connected',
        description: 'Get all covid headlines right here',
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
        title: 'One touch assistance',
        description: 'Request assisstance if you are at high risk of infection directly from the app',
        img: app_intro_6,
        imgStyle: {
          height: 100 * 2.5,
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
