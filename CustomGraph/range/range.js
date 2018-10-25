import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default class Range extends Component {

  props: {
    name: string,
    active: boolean,
    onPress: (range: string) => void,
  };

  onPress = () => {
    const {
      name,
      index,
      onPress
    } = this.props;
    onPress(index);
  };

  onLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
      x: e.nativeEvent.layout.x,
      y: e.nativeEvent.layout.y
    })
  }

  render() {
    const {
      name,
      active,
      width
    } = this.props;
    return (
        <TouchableOpacity style={[styles.container, {}]} onPress={this.onPress}>
          <View   style={active ? styles.bottomActive : styles.bottomInactive}>
            <Text style={[styles.text, active ? styles.active : {}]}>{name}</Text>
          </View>
        </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    padding: 6,
    // borderWidth: 1
  },
  text: {
    color: '#213e72',
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: 'bold'
  },
  bottomInactive: {
    borderRadius: 5,
    padding: 2,
    paddingLeft: 4,
    paddingRight: 4,
    justifyContent: 'center',
  },
  bottomActive: {
    borderRadius: 5,
    padding: 2,
    paddingLeft: 4,
    paddingRight: 4,
    justifyContent: 'center',
    // backgroundColor: 'rgba(85, 200, 200, 1)',
    backgroundColor: '#fff'
  },
  active: {
    color: '#213e72',
  },
});