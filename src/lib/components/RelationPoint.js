/**
 * 2021年3月19日
 * 图形包裹， 包含关系
 */
import React from 'react';
import Circle from './Circle';
import Rect from './Rect';

import AddChild from './Tool/AddChild';
import RelationShip from './Tool/RelationShip';

export default class RelationPoint extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
  }
  
  onRemove(){
    this.props.onRemove && this.props.onRemove();
  }
  
  render(){
    const {cx, cy, isPrint, config} = this.props;
    // 1结婚 2同居 3分居 4离婚
    const relation = config.prop.relation||1;
    let slashLine = [];
    if(relation == 3){
      slashLine = [{p1: {x: cx-30, y: cy-8}, p2: {x: cx-10, y: cy+8}}]
    }
    if(relation == 4){
      slashLine = [
        {p1: {x: cx-30, y: cy-8}, p2: {x: cx-10, y: cy+8}},
        {p1: {x: cx-38, y: cy-8}, p2: {x: cx-18, y: cy+8}}
      ]
    }
    
    const width = 12;
    
    const props = {
      width: width,
      height: width,
      cx: cx,
      cy: cy,
      fill: '#d00b0b',
      stroke: '#000',
      strokeWidth: 1,
      className: 'cursor'
    };
    
    return(
      <svg className='relation-point'>
        <Rect
          cx={cx}
          cy={cy + width/2}
          width={40}
          height={70}
          fill={'rgba(0, 0, 0, 0.2)'}
          className='relation-point-bg'
        />
        <>
          <Rect
            cx={props.cx + width}
            cy={props.cy - width*2}
            width={12}
            height={12}
            fill='#c1c1c1'
            className='cursor close'
            onClick={this.onRemove.bind(this)}
          />
          <text
            className='cursor close'
            x={props.cx + width - 4}
            y={props.cy - width*2 + 6}
            fill='red'
            onClick={this.onRemove.bind(this)}
          >x</text>
        </>
        {
          slashLine.map((item, index)=>{
            return (
              <line
                key={index}
                x1={item.p1.x}
                y1={item.p1.y}
                x2={item.p2.x}
                y2={item.p2.y}
                strokeWidth={1}
                stroke='#000'
              />
            )
          })
        }
        <RelationShip
          trigger={<Circle {...props} />}
          config={this.props.config}
          onChange={this.props.onDataChange}
        />
        {
          !isPrint &&
          <AddChild
            trigger={<Circle {...props} fill='blue' cx={cx} cy={cy+20} width={width-2} height={width-2} className='club'/>}
            addType={({sex, number, single})=>{
              this.props.addShip({sex, number, single})
            }}/>
        }
        <text x={cx} y={cy-10}>{config.id}</text>
      </svg>
    )
  }
}