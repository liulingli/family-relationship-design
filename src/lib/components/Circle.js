/**
 * 2021年3月9日20:52:26
 * 绘制圆形
 */
import React from 'react';

export default class Index extends React.Component{
  static displayName = 'Circle';
  
  render(){
    const {cx, cy, width, height, fill, stroke, strokeWidth=1, ...other} = this.props;
    return (
      <ellipse
        cx={cx}
        cy={cy}
        rx={width/2}
        ry={height/2}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        {...other}
      />
    )
  }
}