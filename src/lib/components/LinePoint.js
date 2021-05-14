/**
 * 2021年3月9日20:52:26
 * 箭头
 */
import React from 'react';
import Diamond from './Diamond';
import Rect from './Rect';
import Circle from './Circle';
import AddChild from './Tool/AddChild';

import {getPathStr} from '../utils';

export default class LinePoint extends React.Component{
  
  addShip(ship){
    this.props.addShip(ship)
  }
  
  render(){
    const {pathStyle, props, type, hasParent} = this.props;
    
    const between = props.width*0.5;
    const short = props.width*0.3;
  
    const dBottom = [[
      [props.cx, props.cy+props.height/2-4],
      [props.cx, props.cy+props.height/2+between]
    ]];
    const dRight = [[
      [props.cx+props.width/2-4, props.cy],
      [props.cx + props.width/2 + between, props.cy]
    ]];
    const dTop = [
      [
        [props.cx, props.cy-props.height/2+4],
        [props.cx, props.cy-props.height/2-between],
      ],
      [
        [props.cx, props.cy-props.height/2-short/2],
        [props.cx-short-between, props.cy-props.height/2-short/2],
        [props.cx-short-between, props.cy-props.height/2+props.width*0.2]
      ]];
    
    const typeToD = {
      'bottom': dBottom,
      'right': dRight,
      'top': dTop
    };
    
    const position = {
      'bottom': dBottom[0][1],
      'right': dRight[0][1],
      'top': dTop[1][2]
    }[type];
    
    const pointStyle = {
      cx: position[0],
      cy: position[1],
      width: 15,
      height: 15,
      fill: 'url(#gradient-blue)',
    };
    
    let Point = <Diamond {...pointStyle} className='point-cursor' onClick={this.addShip.bind(this, type)}/>;
    
    if(['top', 'bottom'].includes(type)){
      Point = <AddChild trigger={Point} addType={(sex, number, single)=>{
         this.props.addShip(shape, sex, number, single)
      }}/>
    }
   
    const pointsArray = typeToD[type];
  
    const topPoint = [[props.cx-props.width/3, props.cy-props.height/2-between], [props.cx+props.width/3, props.cy-props.height/2-between]];
    
    return (
      <>
        {
          pointsArray.map((points, index)=>{
            return <polyline key={index} points={getPathStr(points)} {...pathStyle}/>
          })
        }
        {Point}
        {
          type==='top' && !hasParent?<>
            <polyline points={getPathStr(topPoint)} {...pathStyle}  strokeWidth={1}/>
            <Rect {...pointStyle} width={10} height={10} cx={topPoint[0][0]} cy={topPoint[0][1]} fill='#a8a6a6'/>
            <Circle {...pointStyle} width={11} height={11} cx={topPoint[1][0]} cy={topPoint[1][1]} fill='#a8a6a6'/>
            
            <Circle
              {...pointStyle}
              width={11}
              height={11}
              cx={props.cx}
              cy={topPoint[1][1]}
              style={{cursor: 'pointer'}}
              className='point-cursor'
              onClick={this.addShip.bind(this, 'parent')}
            />
          </>: null
        }
      </>
    )
  }
}