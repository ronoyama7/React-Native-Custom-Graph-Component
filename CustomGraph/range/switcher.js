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
      width,
      ageIndexs,
      verLine,
      lineWidth,
      getRangeBtnWidth
    } = this.props;
    return (
      <View style={styles.container}>
        {ranges.map((name, index) =>
          <Range
            name={name}
            width = { width }
            index = {index}
            lineWidth = {lineWidth}
            ageIndexs = {ageIndexs}
            verLine = {verLine}
            active={current === index}
            onPress={onSelectRange}
            getRangeBtnWidth = {getRangeBtnWidth}
            key={index}
          />)}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 33
  },
});