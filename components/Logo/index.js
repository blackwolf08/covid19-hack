import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import styles from './Logo.style';

const Logo = props => {
  const { logoText, logoComponent } = props;
  return (
    <View style={styles.container}>
      {logoComponent || (
        <View style={styles.row}>
          <Text
            style={[styles.textStyle, { fontWeight: 'bold', marginTop: 20 }]}
          >
            AAI - Assistance App
          </Text>
        </View>
      )}
    </View>
  );
};

Logo.propTypes = {
  logoText: PropTypes.string
};

Logo.defaultProps = {
  logoText: 'AAI - Assistance'
};

export default Logo;
