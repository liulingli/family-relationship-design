/**
 * 2021年3月9日20:52:26
 * 绘制线条
 */
import React from 'react';

export default class Line extends React.Component{
  
  render(){
    const {point1, point2, between, strokeDasharray} = this.props;
    
    let paths = [
      {
        ...point1,
        type: 'M'
      },
      {
        cx: point1.cx,
        cy: point1.cy+(point2.cy - point1.cy)/2,
        type: 'L'
      },
      {
        cx: point1.cx+(point2.cx - point1.cx),
        cy: point1.cy+(point2.cy - point1.cy)/2,
        type: 'L'
      },
      {
        ...point2,
        type: 'L'
      },
    ];
    
    if(between > 1){
      let p1 = point1, p2 = point2;
      if(point1.cx > point2.cx){
        p1 = point2;
        p2 = point1;
      }
      const height = 34 + (between-1)*4;
      const width = 8 + (between-1)*4;
      const initWidth1 = p1.isPoint? 0: 40;
      const initWidth2 = p2.isPoint? 0: 45;
      
      const cy2 = p2.cy - (p2.isPoint?0:width);
      const cy1 = p1.cy - (p1.isPoint?0:width);
      
      paths = [
        {
          ...p1,
          cy: cy1,
          type: 'M',
        },
        {
          type: 'L',
          cx: p1.cx + initWidth1,
          cy: cy1,
        },
        {
          type: 'C', // C
          cx: p1.cx + initWidth1,
          cy: cy1,
        },
        {
          type: ' ',
          cx: p1.cx + initWidth1 + width,
          cy: cy1,
        },
        {
          type: ' ',
          cx: p1.cx + initWidth1 + width,
          cy: cy1 - height*0.2,
        },
        {
          type: 'L',
          cx: p1.cx + initWidth1 + width,
          cy: p1.cy - height,
        },
        {
          type: 'L',
          cx: p2.cx - initWidth2 - width,
          cy: p1.cy - height,
        },
        {
          type: 'L',
          cx: p2.cx - initWidth2 - width,
          cy: p1.cy - height,
        },
        {
          type: 'C',
          cx: p2.cx - initWidth2 - width,
          cy: p1.cy - height*0.2,
        },
        {
          type: ' ',
          cx: p2.cx - initWidth2 - width,
          cy: cy2,
        },
        {
          type: ' ',
          cx: p2.cx - initWidth2,
          cy: cy2,
        },
        {
          type: 'L',
          cx: p2.cx - initWidth2,
          cy: cy2,
        },
        {
          type: 'L',
          ...p2,
          cx: p2.cx,
          cy: cy2,
        },
        {
          type: 'L',
          ...p2,
          cx: p2.cx,
          cy: cy2,
        
        },
      ]
    }
    const d = paths.map((point, index)=>{
      return `${point.type||(index===0?'M':'L')}${point.cx} ${point.cy}`
    }).join(' ');
    
    return (
      <path
        d={d}
        strokeWidth={1}
        stroke='#000'
        fill='none'
        strokeDasharray={strokeDasharray}
      />
    )
  }
}