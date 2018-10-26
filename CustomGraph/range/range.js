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

  state = {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  }

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
    console.log(this.props.index)
    console.log(this.state)
    this.props.getRangeBtnWidth(this.state.width, this.props.index)
  }

  render() {
    const {
      name,
      active,
      width,
      index,
      ageIndexs,
      verLine,
      lineWidth
    } = this.props;
    return (
        <TouchableOpacity style={[styles.container, {left: verLine[ageIndexs[index]] - this.state.width / 4 + 3}]} onPress={this.onPress}>
          {/* <View style = {[{position: 'absolute', width: lineWidth, left: this.state.width / 2 + 5, height: 10, backgroundColor: 'yellow'}]}/> */}
          <View  onLayout = {this.onLayout} style={active ? styles.bottomActive : styles.bottomInactive}>
            <Text style={[styles.text, active ? styles.active : {}]}>{name}</Text>
          </View>
        </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    padding: 6,
    // borderWidth: 1,
    position: 'absolute'
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
    backgroundColor: 'rgba(85, 200, 200, 1)',
    // backgroundColor: '#fff'
  },
  active: {
    color: '#fff',
  },
});