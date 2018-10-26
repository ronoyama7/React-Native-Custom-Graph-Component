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
  G,
  Line
} from 'react-native-svg';

export default class CustomGraph extends Component {

    props: {
      readonly: boolean,
      width: number,
      height: number,
      itemIndex: number,
      backgroundDivdePros: number,
      chartTop: number,
      chartRight: number,
      chartLeft: number,
      chartBottom: number,
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
      itemIndex: 6,
      backgroundDivdePros: 8,
      chartTop: 80,
      chartRight: 10,
      chartLeft: 10,
      chartBottom: 0,
      data: [0, 20, 18, 32, 24, 36, 18, 36, 48, 50, 40, 30, 20, 10, 20, 40, 50, 70, 80, 60, 50, 40, 0],
      // data: [0, 30, 50, 30, 50, 30, 50, 30, 50, 30, 50, 30, 50, 30, 50, 30, 50, 30, 50, 30, 50, 30, 0],
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
      segmentCount : 1000,
    };
    
  constructor(props) {
    super(props);
    global.__DEV__ = false
    this.state = {
      xAxisProgress: 0,
      chartLineData: '',
      chartXAxisData: '',
      RangeBtnWidth: [],
      backgroundDivdePros: 0,
      currentRange: this.props.itemIndex % 4 == 0 ? parseInt(this.props.itemIndex / 4) : -1,
    }
                      
    this.maxY = 0;
    this.props.data.forEach((value)=>{
      this.maxY = this.maxY > value ? this.maxY : value;
    })

    this.verLine = [];
    this.backgroundDivdePros = 0;

    this.ageIndexs = [0, 4, 8, 12, 16, 20];

    this.inputRange = null;
    this.outputRangeX = null;
    this.outputRangeY = null;
  }

  getSelectPros(index) {
    let xAxisValue = this.state.chartXAxisData[index + 1] - 20;
    for (let i = 0; i < this.props.segmentCount; i++) {
      if (parseInt(this.outputRangeX[i]) >= xAxisValue) {
        return i;
      }
    }
  }

  selectRange(currentRange, layout) {
    return
    let index = currentRange * 4;
    let xAxisProgress = this.getSelectPros(index)
    this.setState({currentRange, xAxisProgress});
    if (this.outputRangeY != null) {
      value = this.props.data[currentRange * 4 + 1];
      this.props.onChange(index, value);
    }
  }

  getRangeBtnWidth(width, index) {
    let RangeBtnWidth = this.state.RangeBtnWidth;
    RangeBtnWidth[index] = width;
    this.setState({RangeBtnWidth});
  }

  componentWillMount() {

    this.gestureResponder = createResponder({
      onStartShouldSetResponder: (evt, gestureState) => true,
      onStartShouldSetResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetResponder: (evt, gestureState) => true,
      onMoveShouldSetResponderCapture: (evt, gestureState) => true,

      onResponderGrant: (evt, gestureState) => {
        this.setState({
          gestureState: {
            ...gestureState
          }
        })
      },
      onResponderMove: (evt, gestureState) => {
        if (this.props.readonly) {
          return;
        }
        // let index = parseInt((gestureState.moveX * this.props.data.length ) / (this.props.width) )
        let xAxisProgress = this.state.xAxisProgress;
        xAxisProgress += parseInt(((gestureState.moveX - gestureState.previousMoveX)  * this.props.segmentCount ) / (this.props.width) )
        let startxAxis = this.getSelectPros(0);
        let endxAxis = this.getSelectPros(20);
        if (xAxisProgress < startxAxis) {
          xAxisProgress = startxAxis;
        }
        if (xAxisProgress > endxAxis) {
          xAxisProgress = endxAxis;
        }
        this.setState({xAxisProgress});
        if (this.outputRangeY != null) {
          let index = parseInt(xAxisProgress * this.props.data.length / this.props.segmentCount - 0.5);
          if (index <= 0) index = 0;
          if (index >= 20) index = 20;
          if (index % 4 == 0) {
            let currentRange = index / 4;
            // this.setState({currentRange});
          } else {
            // this.setState({currentRange: -1});
          }
          if (this.outputRangeY != null) {
              value = this.props.data[index + 1];
              this.props.onChange(index, value);
          }
        }
      },
      onResponderTerminationRequest: (evt, gestureState) => true,
      onResponderRelease: (evt, gestureState) => {
        const xAxisProgress = this.getSelectPros(this.props.itemIndex);
        this.setState({
          gestureState: {
            ...gestureState
          },
        })
        let timerEnd = false;
        const timer = setInterval(()=> {
          if (timerEnd) {
            this.setState({...xAxisProgress});
            timerEnd = false;
            let index = this.props.itemIndex;
            value = this.props.data[index + 1];
            this.props.onChange(index, value);
            clearInterval(timer);
            this.forceUpdate();
          }
          if (Math.abs(xAxisProgress - this.state.xAxisProgress)  <=  12.5) {
            this.state.xAxisProgress = xAxisProgress;
            let index = this.props.itemIndex;
            value = this.props.data[index + 1];
            this.props.onChange(index, value);
            timerEnd = true;
            this.setState({xAxisProgress});
          } else {
            let speed = 0
            if (xAxisProgress > this.state.xAxisProgress) {
              speed = 25;
            } else {
              speed = -25
            }
            this.setState({xAxisProgress:this.state.xAxisProgress + speed});
            let index = parseInt(this.state.xAxisProgress * this.props.data.length / this.props.segmentCount - 0.5);
            value = this.props.data[index + 1];
            this.props.onChange(index, value);
          }
        }, 1/60);
      },
      onResponderTerminate: (evt, gestureState) => {
      },
      onResponderSingleTapConfirmed: (evt, gestureState) => {
      },
      debug: false
    });
  }
  
  render() {
    if (this.state.chartLineData != '' && this.outputRangeY == null) {
      const pathMetrics = new MetricsPath(this.state.chartLineData);
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
      for (let index = 0; index < 21; index ++) {
        let xAxisProgress = this.getSelectPros(index);
        this.verLine.push(this.outputRangeX[xAxisProgress]);
      }
      let xAxisProgress = this.getSelectPros(this.props.itemIndex);
      this.setState({xAxisProgress});
    }

    if (this.verLine.length > 0) {
      this.backgroundDivdePros = (this.verLine[this.props.backgroundDivdePros] + this.state.RangeBtnWidth[parseInt(this.props.backgroundDivdePros / 4)] / 2) / this.props.width * 100;
    }

    const PathData = ({ x, y, ...props }) => {
        let chartLineData = props.line;
        let data = props.data;
        let chartXAxisData = [];
        data.map((_, index) => (
          chartXAxisData.push(x(index))
        ));
        console.log(chartXAxisData);
        console.log(props);
        this.setState({chartLineData, chartXAxisData});
        return null;
    } 

    const CustomGrid = ({ x, y, data, ticks }) => (
      <G>
          {
              // Vertical grid
              data.map((_, index) => (
                  <Line
                      key={ index }
                      y1={ '0%' }
                      y2={ '100%' }
                      x1={ x(index) }
                      x2={ x(index) }
                      stroke={ 'rgba(0,0,0,0.2)' }
                  />
              ))
          }
      </G>
  )

    return (
      <View  style={styles.container}>
        <View ref = {(ref) => this.mainScreen = ref} {...this.gestureResponder} style={{ width: this.props.width, height: this.props.height }}>
          <AreaChart
              style={{height: this.props.height}}
              data={this.props.data}
              contentInset={{ top: this.props.chartTop, bottom: this.props.chartBottom, left: this.props.chartLeft, right: this.props.chartRight }}
              svg={{ fill: 'url(#gradient)' }}
              curve={shape.curveNatural}
          >
           {/* <CustomGrid /> */}
            <Defs>
              <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'100%'} y2={'0%'}>
                  <Stop offset={'0%'} stopColor={this.props.fillColorA} stopOpacity={1}/>
                  <Stop offset={ `${this.backgroundDivdePros}%`} stopColor={this.props.fillColorA} stopOpacity={1}/>
                  <Stop offset={ `${this.backgroundDivdePros + 0.01}%`} stopColor={this.props.fillColorB} stopOpacity={1}/>
              </LinearGradient>
            </Defs>
            {
              this.state.chartLineData == '' ?
              <PathData /> : null
            }
           
          </AreaChart>

          {
            this.props.readonly && this.outputRangeY != null ?
            null :
            <LinearGradientA start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={[this.props.lineStartColor, this.props.lineEndColor]} style = {[
              { width: this.props.lineWidth, 
                height: this.props.lineHeight,
                  position: 'absolute' },
              {
                left: this.outputRangeX == null ? 0 : this.outputRangeX[this.state.xAxisProgress] + this.props.sphereWidth / 2 - this.props.lineWidth / 2,
                bottom: 1}]} />
          }

          <View style = {[
              {width: this.props.sphereWidth, height: this.props.sphereWidth, borderRadius: this.props.sphereBorderRadius,
                backgroundColor: this.props.sphereBorderColor,  position: 'absolute',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center' },
              {
                left: this.outputRangeX == null ? 0 : this.outputRangeX[this.state.xAxisProgress],
                bottom: this.outputRangeY == null ? 0 : this.outputRangeY[this.state.xAxisProgress]}]}
                {...this.gestureResponder} >
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
          verLine = {this.verLine}
          lineWidth = {this.props.lineWidth}
          ageIndexs = {this.ageIndexs} 
          ranges={this.props.stageTitle}
          current={this.state.currentRange}
          onSelectRange={this.selectRange.bind(this)}
          getRangeBtnWidth = {this.getRangeBtnWidth.bind(this)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
});
