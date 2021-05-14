/**
 * 2021年3月9日20:52:26
 * 绘制线条, 根据婚姻关系绘制连接线
 */
import React from 'react';
import Line from './Line';

export default class LineByCondition extends React.Component{

  render(){
    const {relation=1, closeRelatives, point1, point2, between} = this.props;
    let showArray = [
      {point1, point2}
    ];
    if(closeRelatives){
      showArray = [
        {point1: {cx: point1.cx, cy: point1.cy-2}, point2: {cx: point2.cx, cy: point2.cy-2}},
        {point1: {cx: point1.cx, cy: point1.cy+2}, point2: {cx: point2.cx, cy: point2.cy+2}},
      ];
    }
    let strokeDasharray;
    // 1结婚 2同居 3分居 4离婚
    if(relation == 2){
      strokeDasharray = '4,4';
    }
    
    return (
      showArray.map((item, index)=>{
        return (
          <Line
            key={index}
            point1={item.point1}
            point2={item.point2}
            between={between}
            strokeDasharray={strokeDasharray}
          />
        )
      })
    )
  }
}