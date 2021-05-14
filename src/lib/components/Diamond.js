/**
 * 2021年3月9日
 * 绘制菱形
 */
import React from 'react';

export default class Index extends React.Component{
  static displayName = 'Diamond';
  
  render(){
    const {cx, cy, width, height, addShip, onRemove, ...other} = this.props;
    const points = [
      [cx-width/2, cy],
      [cx, cy-height/2],
      [cx+width/2, cy],
      [cx, cy+height/2],
    ];
    
    const pointStr = points.map(item=>{
      return `${item[0]},${item[1]}`
    }).join(' ');
    
    return (
      <polygon
        points={pointStr}
        {...other}
      />
    )
  }
}