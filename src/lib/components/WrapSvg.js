/**
 * 2021年3月9日
 * 图形包裹， 包含添加父母孩子妻子
 */
import React from 'react';
import Circle from './Circle';
import Diamond from './Diamond';
import Rect from './Rect';
import LinePoint from './LinePoint';

import PersonInfo from './Tool/PersonInfo';

const sexToComponent = {
  U: Diamond,
  M: Rect,
  F: Circle,
};

export default class WrapSvg extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }
  
  addShip(ship){
    this.props.addShip(ship)
  }
  
  onRemove(){
    this.props.onRemove();
  }
  
  render(){
    const {config={}, cx, cy, hasParent, isPrint, ...other} = this.props;
    const {prop= {}} = config;
    const {condition=1} = prop;
    const originator = this.props.isOriginator(config);
    const {gender='U', fName, nodeNumber, birthDate} = prop;
    const fillColor = [2, 5].includes(condition)?'#000':[3,6].includes(condition)?'url(#gradient)': '#dddddd';
    const Component = sexToComponent[gender];
    const props = {
      width: 65,
      height: 65,
      cx: cx,
      cy: cy,
      fill: fillColor,
      stroke: originator?'#595959':'#9f9f9f',
      strokeWidth: originator?3: 1,
    };
    const textProps = {
      x: props.cx,
      y: props.cy + props.height/2 + 20,
      fontSize: 12,
      textAnchor: 'middle',
    };
    const betweenX = 15*Math.cos(45 * Math.PI / 180), betweenY=15*Math.sin(45 * Math.PI / 180);
    // condition取值 1正常，2患病，3疑似，4死亡，5死亡患病 6死亡疑似
    const deathLine = [4,5,6].includes(condition) && <line x1={props.cx-props.width/2-betweenX} y1={props.cy+props.height/2+betweenY} x2={props.cx+props.width/2+betweenX} y2={props.cy-props.height/2-betweenY} stroke='#9f9f9f' strokeWidth={1}/>;
    
    const pathStyle = {
      stroke: '#808080',
      strokeWidth: 4,
      fill: 'none'
    };
    
    const linePointProps = {
      props, pathStyle,
      addShip: this.addShip.bind(this),
    };
    
    if(!Component){
      return null
    }
    
    return(
      <svg
        className='wrap-svg'
        id={config.id}
        data-x={config.cx}
        data-y={config.cy}
      >
        <Rect
          cx={props.cx}
          cy={props.cy}
          width={props.width*2.4}
          height={props.height*2.4}
          fill={'transparent'}
          className='hover'
        />
        {
          isPrint? null:
            <>
              {
                originator? null:
                  <>
                    <Rect
                      cx={props.cx + props.width}
                      cy={props.cy - props.height}
                      width={12}
                      height={12}
                      fill='#c1c1c1'
                      className='cursor close'
                      onClick={this.onRemove.bind(this)}
                    />
                    <text
                      className='cursor close'
                      x={props.cx + props.width - 4}
                      y={props.cy - props.height + 6}
                      fill='red'
                      onClick={this.onRemove.bind(this)}
                    >x</text>
                  </>
              }
              <svg className='line-point'>
                {
                  <LinePoint
                    {...linePointProps}
                    type='top'
                    hasParent={hasParent}
                  />
                }
                <LinePoint
                  {...linePointProps}
                  type='right'
                />
                <LinePoint
                  {...linePointProps}
                  type='bottom'
                />
              </svg>
            </>
        }
        <PersonInfo
          config={config}
          genderList={this.props.genderList}
          trigger={<Component {...other} {...props}/>}
          onChange={this.props.onDataChange}
        />
        {deathLine}
        <text {...textProps} x={props.cx} y={props.cy}>{nodeNumber}</text>
        <text {...textProps}>
          <tspan>{fName||config.id}</tspan>
          <tspan>{birthDate}</tspan>
        </text>
      </svg>
    )
  }
}