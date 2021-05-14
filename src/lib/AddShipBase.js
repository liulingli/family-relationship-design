/**
 * 2021年3月16日
 * 新增关系
 */
import React from 'react';
import {addArrayAuto, getPosition, findMaxId, findChild, findParent} from './utils';



export default class AddShipBase extends React.Component{
  
  addShip(shape, ship, sex, number, single){
    shape = JSON.parse(JSON.stringify(shape));
    
    // ship： parent添加父母，
    // top添加兄弟（同父母）
    // bottom/right 添加孩子/妻子，
    // child添加孩子（父母已存在孩子）
    if(ship === 'parent'){
      this.addParentShip(shape);
    }else if(['bottom', 'right'].includes(ship)){
      this.addPartnerShip(shape);
    }else if(ship === 'child'){
      this.addChildShip(shape, sex, number, single);
    }else if(ship === 'top'){
      this.addBrotherShip(shape, sex, number, single);
    }
  }
  
  /**
   * 添加父母
   * @param shape
   */
  addParentShip(shape){
    const relation = JSON.parse(JSON.stringify(this.props.relation));
    let {GG, order, ranks, positionByOrder} = relation;
    shape = GG.find(item=>item.id===shape.id);
    
    let {x, y} = getPosition(shape.id, GG, ranks, order);
    
    let maxId = findMaxId(GG);
    
    this.idToHasParent[shape.id] = true;
    
    const addGG = [
      {id: maxId + 1, chhub: true, prop: {}, outedges: [{to: shape.id}]},
      {id: maxId + 2, rel: true, hub: true, prop: {relation: 1}, outedges: [{to: maxId + 1}]},
      {id: maxId + 3, prop: {gender: 'F'}, outedges: [{to: maxId + 2}]},
      {id: maxId + 4, prop: {gender: 'M'}, outedges: [{to: maxId + 2}]}
    ];
    
    GG = GG.concat(addGG);
    
    const position = positionByOrder[y][x];
    
    const addOrder = [[maxId + 1], [maxId + 4, maxId + 2,  maxId + 3]];
    const addPosition = [[position], [position-12, position, position + 12]];
    
    if(!order[y-2]){
      order.splice(y, 0, [], []);
      positionByOrder.splice(y, 0, [], []);
      y = y + 2;
    }
    
    
    for(let i=0; i<2; i++){
      let index= y-(i+1);
      let newOrder = order[index].concat(addOrder[i]);
      let newSet = addArrayAuto(positionByOrder[index], addPosition[i], newOrder, order[index+1], GG);
      
      order[index] = newSet.map(item=>item.id);
      positionByOrder[index] = newSet.map(item=>item.position);
    }
    
    ranks = GG.map(item=>{
      return order.findIndex(v=>v.includes(item.id))
    });
  
    positionByOrder = this.resetPosition({ shape, GG, ranks, order,  positionByOrder, shipPoints: shape.outedges||[], oldRelation: this.props.relation});
    
    this.setNewState({ relation: {GG, order, ranks, positionByOrder} });
  }
  
  /**
   * 添加伴侣的时候添加孩子
   */
  addPartnerShip(shape){
    const relation = JSON.parse(JSON.stringify(this.props.relation));
    let {GG, order, ranks, positionByOrder} = relation;
    shape = GG.find(item=>item.id===shape.id);
  
    let {x, y} = getPosition(shape.id, GG, ranks, order);
    
    let maxId = findMaxId(GG);
    
    const addGG = [
      {id: maxId + 1, rel: true, hub: true, prop: {relation: 1}, outedges: [{to: maxId + 3}]},
      {id: maxId + 2, prop: {gender: 'M'}, outedges: [{to: maxId + 1}]},
      {id: maxId + 3, chhub: true, prop: {}, outedges: [{to: maxId + 4}]},
      {id: maxId + 4, prop: {gender: 'F'}},
    ];
    
    if(!shape.outedges){
      shape.outedges = [];
    }
    
    let xLeft=0, xRight=0;
    shape.outedges.forEach(v=>{
      let {x: curX} = getPosition(v.to, GG, ranks, order);
      if(curX < x){
        xLeft = xLeft + 2;
      }
      if(curX > x){
        xRight = xRight + 2
      }
    });
    
    let isRight = xLeft >= xRight;
    let positionX = isRight ? x + xRight: x - xLeft;
    
    shape.outedges.push({
      to: maxId + 1
    });
    
    GG = GG.concat(addGG);
    
    const position = positionByOrder[y][positionX];
    const dis = !isRight?-1: 1;
    
    const addOrder = [[maxId + 1, maxId + 2], [maxId + 3], [maxId + 4]];
    const addPosition = [[position+(12*dis), position+(24*dis)], [position+(12*dis)], [position+(12*dis)]];
    
    for(let i=0; i<3; i++){
      const index = y + i;
      if(!order[index]){
        order[index] = [];
        positionByOrder[index] = [];
      }
    }
    
    const newPosition = isRight? positionX+1: positionX;
    if(!isRight){
      addOrder[0].reverse();
      addPosition[0].reverse()
    }
    
    // 第一层先设置
    order[y].splice(newPosition, 0, ...addOrder[0]);
    positionByOrder[y].splice(newPosition, 0, ...addPosition[0]);
    
    for(let i=1; i<3; i++){
      const index = y + i;
      let newOrder = order[index].concat(addOrder[i]);
      let newSet = addArrayAuto(positionByOrder[index], addPosition[i], newOrder, order[index-1], GG, true);
      
      order[index] = newSet.map(item=>item.id);
      positionByOrder[index] = newSet.map(item=>item.position);
    }
    
    ranks = GG.map(item=>{
      return order.findIndex(v=>v.includes(item.id))
    });
  
    positionByOrder = this.resetPosition({ shape, GG, ranks, order,  positionByOrder});
  
    this.setNewState({ relation: {GG, order, ranks, positionByOrder} });
    
  }
  
  /**
   * 仅添加孩子, 父母已存在
   */
  addChildShip(shape, sex, number, single){
    const relation = JSON.parse(JSON.stringify(this.props.relation));
    let {GG, order, ranks, positionByOrder} = relation;
    shape = GG.find(item=>item.id===shape.id);
    
    let {x, y} = getPosition(shape.id, GG, ranks, order);
    
    let maxId = findMaxId(GG);
    
    let addGG = [
      {id: maxId + 1, prop: {gender: sex}},
    ];
    if(number){
      if(single){}
      addGG = single?[
        {id: maxId + 1, prop: {gender: sex, number: number, twins: true}},
      ]: (Array.apply(null, Array(number))).map((number, index)=>{
        return {id: maxId + index + 1, prop: {gender: sex, twins: true}}
      });
    }
    
    let lastChildId = shape.outedges[shape.outedges.length-1].to;
    let {x: laseX, y: lastY} = getPosition(lastChildId, GG, ranks, order);
    
    let maxPosition = positionByOrder[lastY][laseX];
    
    shape.outedges.forEach(item=>{
      let {x, y} = getPosition(item.to, GG, ranks, order);
      let oldPosition = positionByOrder[y][x];
      positionByOrder[y][x] = oldPosition - (10 * addGG.length);
      if(oldPosition > maxPosition){
        maxPosition = oldPosition;
      }
    });
    
    shape.outedges = shape.outedges.concat(addGG.map(item=>{
      return {to:item.id}
    }));
    
    GG = GG.concat(addGG);
    
    const addOrder = addGG.map((v, i)=>{
      return maxId+(i+1)
    });
  
    const initPosition = maxPosition - (10 * addGG.length);
    const between = 20;
    
    const addPosition = addGG.map((v, i)=>{
      return initPosition + between * (i+1);
    });
    
    const addX = laseX + 1;
    order[y+1].splice(addX, 0, ...addOrder);
    positionByOrder[y+1].splice(addX, 0, ...addPosition);
    
    ranks = GG.map(item=>{
      return order.findIndex(v=>v.includes(item.id))
    });
  
    positionByOrder = this.resetPosition({shape, GG, order, ranks, positionByOrder});
  
    this.setNewState({ relation: {GG, order, ranks, positionByOrder} });
  }
  
  /**
   * 添加兄弟（如果此时没有父母还需要添加父母）
   * 如果不存在父母逻辑暂时不处理，
   * 只处理有父母的情况
   */
  addBrotherShip(shape, sex, number, single){
    const relation = JSON.parse(JSON.stringify(this.props.relation));
    let {GG} = relation;
  
    const parentShape = GG.find(item=>{
      return (item.outedges||[]).map(v=>v.to).includes(shape.id)
    });
    
    if(parentShape){
      this.addChildShip(parentShape, sex, number, single);
    }
  }
  
  /**
   * 重置位置
   * 好像跟什么时候新增的没关系
   * 只跟当前所处位置有关系
   * 如果之前就不居中， 现在也不用设置居中
   */
  resetPosition({shape, GG, order, ranks, positionByOrder, shipPoints, oldRelation}){
    positionByOrder =  this.resetPositionOverlapping({shape, GG, order, ranks, positionByOrder});
  
    // 添加父母时查找所有不居中的夫妻
    if(shipPoints){
      for(let i=0; i<shipPoints.length; i++){
        let shipPoint = GG.find(item=>item.id===shipPoints[i].to);
        let MF = GG.filter(v=>{
          return (v.outedges||[]).map(v=>v.to).includes(shipPoint.id)
        }).map(item=>item.id);
        let cp = getPosition(shipPoint.id, oldRelation.GG, oldRelation.ranks, oldRelation.order);
        let lp = getPosition(MF[0], oldRelation.GG, oldRelation.ranks, oldRelation.order);
        let rp = getPosition(MF[1], oldRelation.GG, oldRelation.ranks, oldRelation.order);
        
        let betweenBefore =  Math.abs(Math.abs(oldRelation.positionByOrder[cp.y][cp.x] - oldRelation.positionByOrder[lp.y][lp.x]) - Math.abs(oldRelation.positionByOrder[cp.y][cp.x] - oldRelation.positionByOrder[rp.y][rp.x]))
        
  
        let {x, y} = getPosition(shipPoint.id, GG, ranks, order);
        let {x: x1, y: y1} = getPosition(MF[0], GG, ranks, order);
        let {x: x2, y: y2} = getPosition(MF[1], GG, ranks, order);
  
        let between = Math.abs(Math.abs(positionByOrder[y1][x1] - positionByOrder[y][x]) - Math.abs(positionByOrder[y2][x2] - positionByOrder[y][x]))
        
        if(between !==0 && betweenBefore === 0){
          positionByOrder = this.resetPositionCenter({shape: shipPoint, GG, order, ranks, positionByOrder, between: between/2})
        }
      }
    }
    
    return positionByOrder;
  }
  
  /**
   * 重置位置， 解决重叠
   */
  resetPositionOverlapping({shape, GG, order, ranks, positionByOrder}){

    //console.log('resetPosition----begin');
    
    //return positionByOrder;
    this.getIdToShape(GG);
    
    for(let i=0; i<positionByOrder.length; i++){
      let position = positionByOrder[i];
      
      // 判断是否有重叠的点， 如果是人与人，距离是24， 如果是人与其他则是12
      let coverIndex = position.findIndex((item, index)=>{
        let between = 12;
        if(index > 0 && this.isPerson(order[i][index]) && this.isPerson(order[i][index-1])){
          between = 24
        }
        return (index > 0 && (item-position[index-1]) < between);
      });
      
      let isSet = {};
      
      let isSetArray = [];
      
      if(coverIndex > -1) {
        let between = (24 - (position[coverIndex] - position[coverIndex - 1])) / 1;
        
        for (let j = coverIndex; j < position.length; j++) {
          if (!isSet[order[i][j]]) {
      
            position[j] = position[j] + between;
      
            isSet[order[i][j]] = true;
      
            isSetArray.push({id: order[i][j], add: between});
      
            // 查找子集移动
            this.findChildren(order[i][j], GG, order, ranks, positionByOrder, isSet, between, isSetArray);
            
            // 查找父级移动
            this.findParents(order[i][j], GG, order, ranks, positionByOrder, isSet, between, isSetArray, 0);
          }
        }
        
        console.log({
          i, coverIndex, id: order[i][coverIndex], orderList: order[i],  isSet, isSetArray, relation: this.props.relation,
          GG, order, positionByOrder
        })
      }
    }
    
    let hasPosition = positionByOrder.filter(position=>{
      return position.findIndex((item, index)=>{
        return (index > 0 && (item-position[index-1]) < 12);
      })>-1;
    }).length > 0;
    
    if(hasPosition){
      positionByOrder = this.resetPosition({shape, GG, order, ranks, positionByOrder});
    }
    
    return positionByOrder
  }
  
  /**
   * 重置位置，夫妻关系居中显示
   */
  resetPositionCenter({shape, GG, order, ranks, positionByOrder, between}){
   
    //return positionByOrder;
    
    let isSet = {
      [shape.id]: true
    };
    let isSetArray = [];
  
    let {x, y} = getPosition(shape.id, GG, ranks, order);
    positionByOrder[y][x] = positionByOrder[y][x] + between;
    
    this.findChildren(shape.id, GG, order, ranks, positionByOrder, isSet, between, isSetArray, true)
    
    return positionByOrder;
  }
  
  
  /**
   * 查找子集，且子集右侧的数据统一加距离
   */
  findChildren(id, GG, order, ranks, positionByOrder, isSet, between, isSetArray, notSet){
    let shape = GG.find(item=>item.id === id);
    
    if(!(shape.chhub || shape.hub)){
      return;
    }
    
    let childId = findChild(id, GG);
    
    if(!childId || isSet[childId]){
      return;
    }
    
    let {x, y} = getPosition(childId, GG, ranks, order);
    let maxX = positionByOrder[y].length;
    
    if(notSet){
      maxX = x+1
    }
  
    for(let j=x; j<maxX; j++){
      if(!isSet[order[y][j]]){
        positionByOrder[y][j] = positionByOrder[y][j] + between;
        isSet[order[y][j]] = true;
        isSetArray.push({id: order[y][j], add: between })
      }
  
      this.findChildren(order[y][j], GG, order, ranks, positionByOrder, isSet, between, isSetArray, notSet);
    }
  }
  
  /**
   * 查找父级， 且父级右侧的数据统一加距离
   */
  findParents(id, GG, order, ranks, positionByOrder, isSet, between, isSetArray, i){
    //console.log('findParents', { isSetArray })
    let parentIdArray = i < 3?this.finParentTop(id, GG): this.findParentAll(id, GG);
  
    i++;
    
    parentIdArray.forEach(parentId=>{
      
      if(!parentId || isSet[parentId]) return;
  
      let {x, y} = getPosition(parentId, GG, ranks, order);
  
      for(let j=x; j<positionByOrder[y].length; j++){
    
        if(!isSet[order[y][j]]){
          positionByOrder[y][j] = positionByOrder[y][j] + between;
          isSet[order[y][j]] = true;
          isSetArray.push({id: order[y][j], add: between })
        }
        this.findParents(order[y][j], GG, order, ranks, positionByOrder, isSet, between, isSetArray, i);
      }
    });
  }
  
  findParentAll(id, GG){
    
    const shape = GG.filter(item=>{
      return (item.outedges||[]).map(v=>v.to).includes(id)
    });
    
    return shape.map(item=>item.id)
  }
  
  finParentTop(id, GG){
    
    if(this.isPerson(id) || this.idToShape[id].chhub){
      const shape = GG.find(item=>{
        return (item.outedges||[]).map(v=>v.to).includes(id)
      })||{};
  
      return [shape.id]
    }
    
    return []
  }
  
  setNewState({ relation }){
    
    this.idToHasParent = this.getIdToHasParent(relation.GG);
    
    this.props.onChange && this.props.onChange(relation);
   
  }
}

