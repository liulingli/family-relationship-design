/**
 * 2021年3月11日
 * 填充渐变样式
 */
import React from 'react';

export default class Defs extends React.Component {
 
  render(){
    return(
      <defs>
        <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='0%' style={{stopColor: 'rgb(0,0,0)', stopOpacity:1}}/>
          <stop offset='100%' style={{stopColor: 'rgb(255,255,255)', stopOpacity:1}}/>
        </linearGradient>
        <linearGradient id='gradient-blue' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='0%' style={{stopColor: 'rgb(171,193,188)', stopOpacity:1}}/>
          <stop offset='100%' style={{stopColor: 'rgb(13,62,122)', stopOpacity:1}}/>
        </linearGradient>
        <linearGradient id='gradient-red' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='0%' style={{stopColor: 'rgb(213,172,172)', stopOpacity:1}}/>
          <stop offset='100%' style={{stopColor: 'rgb(225,70,70)', stopOpacity:1}}/>
        </linearGradient>
      </defs>
    )
  }
}