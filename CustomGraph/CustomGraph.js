/**
 * Sample React Native CustomGraph
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

import { AreaChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {createResponder} from 'react-native-gesture-responder';
import MetricsPath from 'art/metrics/path';

const LinearGradientA = require('react-native-linear-gradient').default

const { width, height } = Dimensions.get('window');

import  Switcher  from './range/switcher'

import Svg,{
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

export default class CustomGraph extends Component {

    props: {
      readonly: boolean,
      width: number,
      height: number,
      itemIndexProg: number,
      backgroundDivdePros: number,
      data: Array<number>,
      fillColorA: string,
      fillColorB: string,
      sphereWidth: number,
      sphereBorderWidth: number,
      sphereBorderColor: string,
      sphereBorderRadius: number,
      sphereBackGroundColor: string,
      lineWidth: number,
      lineHeight: number,
      lineStartColor: 'rgba(255,255,255,0.0)',
      lineEndColor: 'rgba(166,214,223,0.8)',
      onChange: func,
      onReady: func,
      stageTitle: Array<string>,
      segmentCount: number,
    };
    
    static defaultProps = {
      readonly : false,
      width: width,
      height: 200,
      itemIndexProg: 16,
      backgroundDivdePros: 30,
      data: [0,50, 30, 40, 60, 80, 60, 90, 80, 60, 30, 50, 40, 30, 60],
      fillColorA: 'rgb(248, 248, 248)',
      fillColorB: 'rgb(216, 234, 239)',
      sphereWidth: 40,
      sphereBorderWidth: 20,
      sphereBorderColor: 'rgba(255, 255, 0, 0.3)',
      sphereBorderRadius: 50,
      sphereBackGroundColor: 'rgba(255, 255, 0, 0.8)',
      lineWidth: 2,
      lineHeight: 200 * 0.8,
      lineStartColor: 'rgba(255,255,255,0.0)',
      lineEndColor: 'rgba(166,214,223,0.8)',
      onChange: null,
      onReady: null,
      stageTitle: ['age 0', 'age 4', 'age 8', 'age 12', 'age 16', 'age 20'],
      segmentCount : 100,
    };
    
  constructor(props) {
    super(props);
    global.__DEV__ = false
    this.state = {
      itemSelectPros: this.props.itemIndexProg,
      linePath: '',
      currentRange: 0,
    }
    
    this.maxY = 0;
    this.props.data.forEach((value)=>{
      this.maxY = this.maxY > value ? this.maxY : value;
    })

    this.inputRange = null;
    this.outputRangeX = null;
    this.outputRangeY = null;
    console.log(this.maxY);
  }

  selectRange(currentRange, layout) {
    // console.log(layout)
    // let itemWidth = layout.width;
    // let itemSelectPros = parseInt((100 / this.props.stageTitle.length) * (currentRange + 1) );
    // console.log(itemSelectPros)
    // this.setState({itemSelectPros});
    this.setState({currentRange});
    // this.state.itemSelectPros
  }

  componentWillMount() {
    console.log('componentWillMount...');
    this.gestureResponder = createResponder({
      onStartShouldSetResponder: (evt, gestureState) => true,
      onStartShouldSetResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetResponder: (evt, gestureState) => true,
      onMoveShouldSetResponderCapture: (evt, gestureState) => true,

      onResponderGrant: (evt, gestureState) => {
      },
      onResponderMove: (evt, gestureState) => {
        if (this.props.readonly) {
          return;
        }
        console.log(gestureState.moveX );
        let itemSelectPros = parseInt((gestureState.moveX * this.props.segmentCount ) / (this.props.width) )
        console.log(itemSelectPros);
        if (itemSelectPros < 0 || itemSelectPros > this.props.segmentCount) 
        {
          return;
        }
        this.setState({itemSelectPros});
        if (this.outputRangeY != null) {
          let index = parseInt(itemSelectPros * this.props.data.length / this.props.segmentCount - 0.5);
          let value = 0;
          if (index < 0) index = 0;
          if (index < this.props.data.length) {
            value = this.props.data[index];
          }
          this.props.onChange(index, value);
        }
      },
      onResponderTerminationRequest: (evt, gestureState) => true,
      onResponderRelease: (evt, gestureState) => {
        this.setState({
          gestureState: {
            ...gestureState
          }
        })
      },
      onResponderTerminate: (evt, gestureState) => {
      },
      onResponderSingleTapConfirmed: (evt, gestureState) => {
        console.log('onResponderSingleTapConfirmed...' + JSON.stringify(gestureState));
      },
      debug: false
    });
  }
  
  render() {
    if (this.state.linePath != '' && this.outputRangeY == null) {
      const pathMetrics = new MetricsPath(this.state.linePath);
      const length = pathMetrics.length;
      const segmentLength = length / this.props.segmentCount;
      const pointCount = this.props.segmentCount + 1;
      this.inputRange = new Array(pointCount);
      this.outputRangeX = new Array(pointCount);
      this.outputRangeY = new Array(pointCount);

      for (let i = 0; i < pointCount; i++) {
        const offset = i * segmentLength;
        const {x, y} = pathMetrics.point(offset);
        this.inputRange[i] = i;
        this.outputRangeX[i] = x - this.props.sphereWidth / 2;
        this.outputRangeY[i] = this.props.height - y - this.props.sphereWidth / 2;
      }
    }

    const PathData = ({ x, y, ...props }) => {
        let linePath = props.line;
        this.setState({linePath});
        this.forceUpdate();
        return null;
    } 

    return (
      <View  style={styles.container}>
        <View {...this.gestureResponder} style={{  width: this.props.width, height: this.props.height }}>
          <AreaChart
              style={{height: this.props.height}}
              data={this.props.data}
              contentInset={{ top: 80, bottom: 0 }}
              svg={{ fill: 'url(#gradient)' }}
              curve={shape.curveNatural}
          >
            <Defs>
              <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'100%'} y2={'0%'}>
                  <Stop offset={'0%'} stopColor={this.props.fillColorA} stopOpacity={1}/>
                  <Stop offset={ `${this.props.backgroundDivdePros}%`} stopColor={this.props.fillColorA} stopOpacity={1}/>
                  <Stop offset={ `${this.props.backgroundDivdePros + 0.01}%`} stopColor={this.props.fillColorB} stopOpacity={1}/>
              </LinearGradient>
            </Defs>
            {
              this.state.linePath == '' ?
              <PathData /> : null
            }
          </AreaChart>

          {
            this.props.readonly && this.outputRangeY != null ?
            null :
            <LinearGradientA start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={[this.props.lineStartColor, this.props.lineEndColor]} style = {[
              { width: this.props.lineWidth, 
                height: this.props.lineHeight,
                // height: this.outputRangeY[this.state.itemSelectPros],
                  position: 'absolute' },
              {
                left: this.outputRangeX == null ? 0 : this.outputRangeX[this.state.itemSelectPros] + this.props.sphereWidth / 2 - this.props.lineWidth / 2,
                bottom: 1}]} />
          }

          <View style = {[
              {width: this.props.sphereWidth, height: this.props.sphereWidth, borderRadius: this.props.sphereBorderRadius,
                backgroundColor: this.props.sphereBorderColor,  position: 'absolute',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center' },
              {
                left: this.outputRangeX == null ? 0 : this.outputRangeX[this.state.itemSelectPros],
                bottom: this.outputRangeY == null ? 0 : this.outputRangeY[this.state.itemSelectPros]}]}
              onResponderMove = {()=> this.onResponderMove.bind(this)}>
              <View style = {
                [
                  {
                    borderRadius: 50,
                    backgroundColor: this.props.sphereBackGroundColor,
                    width: this.props.sphereWidth - this.props.sphereBorderWidth,
                    height: this.props.sphereWidth - this.props.sphereBorderWidth,
                  }
                ]
              } />
          </View>
        </View>     
        <Switcher
          width = {this.props.width}
          ranges={this.props.stageTitle}
          current={this.state.currentRange}
          onSelectRange={this.selectRange.bind(this)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 1,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
});
