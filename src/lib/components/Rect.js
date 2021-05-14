/**
 * 2021年3月9日
 * 绘制矩形
 */
import React from 'react';

export default class Index extends React.Component{
  static displayName = 'Rect';
  
  render(){
    const {cx, cy, width, height, fill, stroke, strokeWidth=1, ...other} = this.props;
    return (
      <rect
        x={cx-width/2}
        y={cy-height/2}
        width={width}
        height={height}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        {...other}
      />
    )
  }
}