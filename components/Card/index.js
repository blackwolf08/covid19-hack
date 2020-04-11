import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TextInput from 'react-native-improved-text-input';
import styles, { _textStyle, _textInputStyle } from './Card.style';

const Card = props => {
  const {
    title,
    value,
    textStyle,
    textColor,
    titleStyle,
    titleColor,
    placeholder,
    onChangeText,
    selectionColor,
    iconComponent,
    nameIcon
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.containerGlue}>
        <View style={{ width: 35, justifyContent: 'center' }}>
          <Ionicons size={30} name={nameIcon} color='black' />
        </View>
        <View style={styles.textContainer}>
          <Text style={titleStyle || _textStyle(titleColor)}>{title}</Text>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor='#ccc'
            selectionColor={selectionColor}
            onChangeText={onChangeText}
            style={textStyle || _textInputStyle(textColor)}
            secureTextEntry={props.secureTextEntry ? true : false}
          />
        </View>
      </View>
    </View>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  textColor: PropTypes.string,
  titleColor: PropTypes.string,
  placeholder: PropTypes.string,
  selectionColor: PropTypes.string
};

Card.defaultProps = {
  title: 'User Name',
  textColor: 'black',
  titleColor: '#282828',
  placeholder: 'John Doe',
  selectionColor: '#757575'
};

export default Card;
