import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { LinearGradient}  from 'react-native-linear-gradient'

type Props = {};
export default class CustomLinearGradient extends Component<Props> {
  render() {
    return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
        
       </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#739ec8',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
});
