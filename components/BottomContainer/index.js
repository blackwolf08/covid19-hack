import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Text, View, TouchableOpacity } from 'react-native';
import Card from '../Card';
import { Ionicons } from '@expo/vector-icons';
import styles, { container } from './BottomContainer.style';
import { LinearGradient } from 'expo-linear-gradient';
const BottomContainer = props => {
  const {
    switchText,
    switchValue,
    IconComponent,
    backgroundColor,
    switchTextStyle,
    onPressSettings,
    disableSettings,
    onSwitchValueChange,
    usernameOnChangeText,
    passwordOnChangeText,
    usernameIconComponent,
    passwordIconComponent,
    usernameTextInputValue,
    passwordTextInputValue
  } = props;
  return (
    <View style={container('transparent')}>
      <LinearGradient
        colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.2)']}
        style={{ borderRadius: 24, paddingBottom: 10 }}
      >
        <View style={styles.containerGlue}>
          <Card
            value={usernameTextInputValue}
            onChangeText={usernameOnChangeText}
            nameIcon='md-person'
            {...props}
          />
          <Card
            name='key'
            secureTextEntry
            title='Password'
            type='FontAwesome'
            value={passwordTextInputValue}
            placeholder='Your Password'
            onChangeText={text => passwordOnChangeText(text)}
            nameIcon='md-key'
            {...props}
          />
        </View>
        <View style={styles.footerContainer}>
          {!disableSettings && (
            <TouchableOpacity
              style={{ marginRight: 'auto', zIndex: 999 }}
              onPress={onPressSettings}
            >
              <Ionicons
                name='ios-settings'
                type='Ionicons'
                color='rgba(255,255,255, 0.9)'
                size={35}
                {...props}
              />
            </TouchableOpacity>
          )}
          <View style={styles.rememberMeContainer}>
            <Text style={switchTextStyle || styles.switchTextStyle}>
              {switchText}
            </Text>
            <Switch
              value={switchValue}
              ios_backgroundColor='black'
              onValueChange={onSwitchValueChange}
              trackColor={{ true: 'default', false: 'black' }}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

BottomContainer.propTypes = {
  switchText: PropTypes.string,
  disableSettings: PropTypes.bool,
  backgroundColor: PropTypes.string
};

BottomContainer.defaultProps = {
  // IconComponent: Icon,
  disableSettings: false,
  switchText: 'Remember me',
  backgroundColor: 'rgba(255,255,255,0.45)'
};

export default BottomContainer;
