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
      x: 0,
      y: 0,
    }
    const startTimeStamp = 946684800;
    const weeklength = 1050;
    let data = [];
    this.finalData = [];
    for (let i = 0; i < weeklength; i++) {
      data[i] = [];
    }
    jsonData.forEach((element, index) => {
      let timestamp = parseInt((element[0] / 1000  - startTimeStamp) / (3600 * 24 * 7));
      data[timestamp].push(element[2]);
      jsonData[index][0] = timestamp;
    });
    data.forEach((element, index) => {
      let value = 0;
      if (element.length != 0) {
        let temp = 0;
        for(let i = 0; i < element.length; i++) {
          temp += element[i];
        }
        value = parseInt(temp / element.length);
      }
      this.finalData[index] = value;
    });
    // console.log(this.finalData);
    // console.log(data);
    // console.log(jsonData);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Age : {this.state.x}</Text>
        <Text>Value : {this.state.y}</Text>
        <CustomGraph
        // data = {this.finalData}
        onChange = {(x, y) => {
          console.log(x);
          this.setState({x})
          this.setState({y})
          // console.log(y);
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
