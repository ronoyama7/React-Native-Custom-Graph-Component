/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import CustomGraph from './CustomGraph/CustomGraph';

const jsonData = require('./Resourse/data.json');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
console.disableYellowBox = true;
type Props = {};
export default class App extends Component<Props> {

  constructor(props) 
  {
    super(props);
    this.state = {
      age: 0,
      y: 0,
    };
    // Should Add 0 at start and end of array
    this.data = [20, 18, 32, 24, 36, 18, 36, 48, 50, 40, 30, 20, 10, 20, 40, 50, 70, 80, 60, 50, 40];
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Age : {this.state.age}</Text>
        <Text>Value : {this.state.y}</Text>
        <CustomGraph
          data={this.data}
          height={200}
          itemIndex={4}
          readonly={false}
          onChange={(age, y) => {
            this.setState({ age });
            this.setState({ y });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#739ec8',
    padding: 5
  },
  welcome: {
    height: 200,
    borderWidth : 2,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
