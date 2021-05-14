/**
 * 2021年3月11日
 * 填充渐变样式
 */
import React from 'react';
import WrapSvg from './components/WrapSvg';
import LineByCondition from './components/LineByCondition';
import RelationPoint from './components/RelationPoint';

import DeleteShipBase from './DeleteShipBase';

import {getPosition} from './utils';

export default class DrawRelation extends DeleteShipBase {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
    this.center = props.isPrint?{ x: 0, y: -props.height}: {x: 600, y: -160};
    this.idToHasParent = this.getIdToHasParent(props.relation.GG);
  }
  
  componentWillReceiveProps(nextProps){
    if(JSON.stringify(this.props) !== JSON.stringify(nextProps)){
      this.idToHasParent = this.getIdToHasParent(nextProps.relation.GG);
    }
  }
  
  shouldComponentUpdate(nextProps, nextState){
    if(
      JSON.stringify(this.props) !== JSON.stringify(nextProps) ||
      JSON.stringify(this.state) !== JSON.stringify(nextState)
    ){
      return true
    }
    
    return false
  }
  
  renderShape(config, cx, cy, GG) {
    if(config.chhub) return null;
    
    if(config.hub){
      return (
        <RelationPoint
          key={config.id}
          cx={cx}
          cy={cy}
          config={config}
          addShip={({ sex, number, single })=>{
            let id = ((config.outedges||[])[0]||{}).to;
            const curShape = GG.find(item=>{
              return item.chhub && item.id === id;
            } );
            this.addShip(curShape, 'child', sex, number, single)
          }}
          onRemove={this.onRemove.bind(this, config)}
          onDataChange={this.onDataChange.bind(this, config)}
        />
      )
    }
    
    return (
      <WrapSvg
        {...this.props}
        key={config.id}
        config={config}
        cx={cx}
        cy={cy}
        hasParent={this.idToHasParent[config.id]}
        addShip={this.addShip.bind(this, config)}
        onRemove={this.onRemove.bind(this, config)}
        isPrint={this.props.isPrint}
        genderList={this.getOptionalGender(config, GG)}
        onDataChange={this.onDataChange.bind(this, config)}
      />
    )
  }
  
  onDataChange(config, type, value){
    const relation = JSON.parse(JSON.stringify(this.props.relation));
    relation.GG.find(item=>item.id===config.id).prop[type] = value;
    
    this.props.onChange(relation)
  }
  
  /**
   * 找夫妻关系, 可能存在多个
   * // Heredity options 遗传选项
   * childless 没有孩子
   * infertile 不孕不育
   */
  findRelationShip(shape, GG){
    // 查找夫妻信息
    let relationShip = [];
    (shape.outedges||[]).forEach(v=>{
      let curShip = GG.find(item=>{
        return (item.outedges||[]).map(v=>v.to).includes(v.to) && shape.id!==item.id
      });
      relationShip.push(curShip)
    });
    
    return relationShip
  }
  
  getOptionalGender(shape, GG){
    const relationShip = this.findRelationShip(shape, GG);
    const genderList = [
      {label: '男', value: 'M'},
      {label: '女', value: 'F'},
      {label: '不确定', value: 'U'}
    ];
  
    relationShip.forEach(item=>{
      if(item.prop.gender === 'M'){
        genderList[0].disabled = true;
      }
      if(item.prop.gender === 'F'){
        genderList[1].disabled = true;
      }
    });
    
    return genderList.filter(item=>!item.disabled)
  }
  
  /**
   * 判断是否存在父级
   */
  getIdToHasParent(GG){
    const idToHasParent = {};
  
    GG.forEach(item=>{
      const {id, chhub, hub} = item;
      if(!(chhub || hub)){
        idToHasParent[id] = GG.filter(v=>{
          return (v.outedges||[]).map(v=>v.to).includes(id) && v.chhub;
        }).length > 0;
      }
    });
    
    return idToHasParent;
  }
  
  getShowWrap() {
    const {relation} = this.props;
    const {GG, order, ranks, positionByOrder} = relation;
    let disX = 0, disY = 0;
    const position = {};
    
    const shapeDom = order.map((o, i) => {
      disY += i % 2 ? 180 : 20;
      disX = 0;
      return o.map((id, j) => {
        const shape = GG.find(item => item.id === id);
        disX += 100;
        position[id] = {isPoint: shape.chhub||shape.hub, cx: this.center.x + positionByOrder[i][j] * 10, cy: this.center.y + disY};
        return this.renderShape(shape, this.center.x + positionByOrder[i][j] * 10, this.center.y + disY, GG)
      })
    });
    
    let lineDom = [];
    
    GG.forEach((g, i) => {
      const {id, outedges = []} = g;
      const p1 = getPosition(id, GG, ranks, order);
      outedges.forEach((item, j) => {
        // 两点中间间隔
        const p2 = getPosition(item.to, GG, ranks, order);
        const between = p1.y===p2.y ? Math.abs(p2.x-p1.x) : 0;
        const shape = GG.find(v=>v.id===item.to);
        let relation = 1;
        let closeRelatives = false;
        if(shape.hub){
          relation = shape.prop.relation;
          closeRelatives = shape.prop.closeRelatives;
        }
        
        lineDom.push(
          <LineByCondition
            key={`${i}-${j}`}
            point1={position[id]}
            point2={position[item.to]}
            between={between}
            relation={relation}
            closeRelatives={closeRelatives}
          />
        )
      })
    });
    
    console.log({GG, shapeDom, order, positionByOrder });
    
    console.log(JSON.stringify({
      ...relation,
      positions: relation.GG.map(item=>{
        const {x, y} = getPosition(item.id, GG, ranks, order);
        return positionByOrder[y][x]
      })
    }));
    
    return (
      <>
        {lineDom.map(item=>item)}
        {shapeDom}
      </>
    )
  }
  
  render() {
    
    return (
      <svg ref={instance => this.svg = instance}>
        {this.getShowWrap()}
      </svg>
    )
  }
}
