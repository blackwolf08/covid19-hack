import React, { Component } from 'react';
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  View
} from 'react-native';
import Constants from 'expo-constants';

import { apiCallPost } from '../../api';
import { Button, Block, Input, Text } from '../../components';
import { theme } from '../../constants';

export default class SignUp extends Component {
  state = {
    email: null,
    username: null,
    password: null,
    errors: [],
    loading: false,
    number: '9958470889'
  };

  handleSignUp = async () => {
    const { navigation } = this.props;
    const { email, username, password, number } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data

    try {
      let body = new FormData();
      body.append('first_name', username);
      body.append('email', email);
      body.append('password', password);
      body.append('phone_number', number);
      await apiCallPost(
        'https://sih-maroon-beret-test.herokuapp.com/signup/',
        body
      );
      Alert.alert(
        'Success!',
        'Your account has been created',
        [
          {
            text: 'Continue',
            onPress: () => {
              navigation.navigate('Login');
            }
          }
        ],
        { cancelable: false }
      );
    } catch (error) {
      this.setState({ errors, loading: false });
      errors.push('email');
      console.log(error);
    }
  };

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.signup} behavior='padding'>
        <ScrollView style={{}}>
          <Block padding={[0, theme.sizes.base * 2]}>
            <Text h1 bold>
              Sign Up
            </Text>
            <Block middle>
              <Input
                email
                label='Email'
                error={hasErrors('email')}
                style={[styles.input, hasErrors('email')]}
                defaultValue={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />
              <Input
                label='Username'
                error={hasErrors('username')}
                style={[styles.input, hasErrors('username')]}
                defaultValue={this.state.username}
                onChangeText={text => this.setState({ username: text })}
              />
              <Input
                secure
                label='Password'
                error={hasErrors('password')}
                style={[styles.input, hasErrors('password')]}
                defaultValue={this.state.password}
                onChangeText={text => this.setState({ password: text })}
              />
              <Input
                label='Phone Number'
                error={hasErrors('number')}
                style={[styles.input, hasErrors('number')]}
                onChangeText={text => this.setState({ number: text })}
              />
              <Button gradient onPress={() => this.handleSignUp()}>
                {loading ? (
                  <ActivityIndicator size='small' color='white' />
                ) : (
                  <Text bold white center>
                    Sign Up
                  </Text>
                )}
              </Button>

              <Button onPress={() => navigation.navigate('Login')}>
                <Text
                  gray
                  caption
                  center
                  style={{ textDecorationLine: 'underline' }}
                >
                  Back to Login
                </Text>
              </Button>
            </Block>
          </Block>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 40,
    justifyContent: 'center'
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
});
