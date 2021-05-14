/**
 * 2021年3月17日
 * 删除关系
 */
import React from 'react';
import {addArrayAuto, getPosition, findMaxId, findChild, findParent} from './utils';
import {Queue} from './utils';
import AddShipBase from './AddShipBase';

export default class DeleteShipBase extends AddShipBase{
  
  onRemove(shape){
    const relation = JSON.parse(JSON.stringify(this.props.relation));
    let {GG: oldGG, positionByOrder: oldPositionByOrder, order: oldOrder, ranks} = relation;
    
    let removeIds = this.getDisconnectedSetIfNodeRemoved(shape.id, oldGG);
    //removeIds = [];
  
    let GG = oldGG.filter(item=>{
      return item.id ==0 || !removeIds.includes(item.id)
    });
  
    GG = JSON.parse(JSON.stringify(GG));
    
    // 过滤掉outedges为空且其他项里outedges也为空的数据
    GG = this.filterGG(GG);
    
    let order = [];
    let positionByOrder = [];
    
    for(let i=0; i<oldOrder.length; i++){
      if(!order[i]){
        order[i] = [];
        positionByOrder[i] = [];
      }
      
      for(let j=0; j<oldOrder[i].length; j++){
        let isIn = GG.find(item=>item.id===oldOrder[i][j]);
        if(isIn){
          order[i].push(oldOrder[i][j]);
          positionByOrder[i].push(oldPositionByOrder[i][j])
        }
      }
    }
  
    ranks = GG.map(item=>{
      return order.findIndex(v=>v.includes(item.id))
    });
  
    console.log({ removeIds, shape, GG, oldGG });
    
    this.setNewState({ relation: {GG, order, ranks, positionByOrder} });
  }
  
  /**
   *  过滤掉outedges为空且其他项里outedges也为空的数据
   *  过滤掉chhub为true，且outedges为空的
   */
  filterGG(GG){
    const GGIds = GG.map(item=>item.id);
    GG.forEach(item=>{
      if(item.outedges){
        item.outedges = item.outedges.filter(v=>{
          return GGIds.includes(v.to)
        })
      }
    });
    
    const newGG = GG.filter(item=>{
      const bool1 = (item.outedges||[]).length === 0;
      const bool2 = GG.filter(v=>{
        return v.id !== item.id && (v.outedges||[]).map(v=>v.to).includes(item.id)
      }).length === 0;
      
      return item.id===0 || !(bool1 && bool2)
    }).filter(item=>{
      return item.id===0 || !(item.chhub && (item.outedges||[]).length===0)
    });
    
    if(GG.length === newGG.length){
      return newGG
    }
    
    return this.filterGG(newGG);
  }
  
  isPerson(v){
    return !(this.idToShape[v].chhub || this.idToShape[v].hub)
  }
  
  isRelationship(v){
    return this.idToShape[v].chhub || this.idToShape[v].hub;
  }
  
  getInEdges(v){
    //outedges 包含 v
    return this.GG.filter(item=>{
      return (item.outedges||[]).map(v=>v.to).includes(v)
    }).map(v=>v.id);
  }
  
  getOutEdges(v){
    return (this.idToShape[v].outedges||[]).map(v=>v.to)
  }
  
  isVirtual(v){
    return false
  }
  
  downTheChainUntilNonVirtual(v) {
    if (!this.isVirtual(v)) return v;
    const outEdges = this.getOutEdges(v);
    return this.downTheChainUntilNonVirtual(outEdges[0]);
  }
  
  getAllRelationships(v){
    let relationships = this.getOutEdges(v);
  
    let result = [];
    for (let r = 0; r < relationships.length; ++r) {
      let edgeTo       = relationships[r];
      let relationship = this.downTheChainUntilNonVirtual(edgeTo);
      result.push(relationship);
    }
    
    return result;
  }
  
  
  getNumVertices(v){
    return [];
  }
  
  getIdToShape(GG){
    this.idToShape = {};
    this.GG = GG;
    GG.forEach(item=>{
      this.idToShape[item.id] = item;
    })
  }
  
  getDisconnectedSetIfNodeRemoved(v, GG){
    this.getIdToShape(GG);
    
    let removedList = {};
    
    removedList[v] = true;
    
    if(this.isPerson(v)){
      if (this.getInEdges(v).length != 0) {
        let chhub = this.getInEdges(v)[0];
        if (this.getOutEdges(chhub).length == 1) {
          removedList[ this.getInEdges(chhub)[0] ] = true;
        }
      }
  
      let allRels = this.getAllRelationships(v);
      for (let i = 0; i < allRels.length; i++) {
        removedList[allRels[i]] = true;
      }
    }
  
    for (let node in removedList) {
      if (removedList.hasOwnProperty(node) && this.isRelationship(node)) {
        let chhubId = this.getOutEdges(node)[0];
        removedList[chhubId] = true;
      }
    }
  
    let connected = {};
  
    let queue = new Queue();
    queue.push( 0 );
    
    while ( queue.size() > 0 ) {
      let next = parseInt(queue.pop());
    
      if (connected.hasOwnProperty(next)) continue;
      connected[next] = true;
  
      let outEdges = this.getOutEdges(next);
      for (let i = 0; i < outEdges.length; i++) {
        if (!removedList.hasOwnProperty(outEdges[i]))
          queue.push(outEdges[i]);
      }
      let inEdges = this.getInEdges(next);
      for (let i = 0; i < inEdges.length; i++) {
        if (!removedList.hasOwnProperty(inEdges[i]))
          queue.push(inEdges[i]);
      }
    }
  
    let affected = [];
    for (let i = 0; i < GG.length; i++) {
      const {id} = GG[i];
      if (this.isPerson(id) || this.isRelationship(id)) {
        if (!connected.hasOwnProperty(id))
          affected.push(id);
      }
    }
    
    console.log({removedList, connected, affected })
    
    return affected;
  }
  
}