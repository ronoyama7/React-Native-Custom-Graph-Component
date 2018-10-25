import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Range from './range';

export default class Switcher extends Component {

  render() {
    const {
      ranges,
      current,
      onSelectRange,
      width
    } = this.props;
    return (
      <View style={styles.container}>
        {ranges.map((name, index) =>
          <Range
            name={name}
            width = { width / ranges.length }
            index = {index}
            active={current === index}
            onPress={onSelectRange}
            key={index}
          />)}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff'
  },
});