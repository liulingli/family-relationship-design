import './index.scss';
import React from 'react';
import Defs from './Defs';
import DrawRelation from './DrawRelation';
import {svgToImage} from './utils';

export default class Index extends React.Component {
  constructor(props){
    super(props);
  
    const relation = {
      GG: props.relation.GG || [],
      ranks: props.relation.ranks || [], //层级
      order: props.relation.order || [], //每层包含的元素
      positions: props.relation.positions||[],
      positionByOrder: (props.relation.order||[]).map(o => {
        return o.map(id => {
          const index = (props.relation.GG || []).findIndex(item => item.id === id);
          return (props.relation.positions||[])[index]
        })
      })
    };
  
    this.state = {
      width: 1366,
      height: 500,
      size: 1,
      offsetLeft: 0,
      offsetTop: 0,
      disLeft: 0,
      disTop: 0,
      relation: relation,
      redoItems: [],
      undoItems: [],
      printRelation: null
    };
  }
  
  componentDidMount() {
    const that = this;
    const distance = 0.2;
    
    document.onmousewheel = function (e) {
      let curDistance = 0;
      if (e.wheelDelta > 0 && that.state.size < 2) {
        curDistance = distance
      } else if(that.state.size > 0.4){
        curDistance = -distance
      }
      
      const newSize = that.state.size + curDistance;
      
      that.setState({
        size: newSize,
        disLeft: that.state.disLeft + (that.state.width*curDistance)/2,
        disTop: that.state.disTop + (that.state.height*curDistance)/2
      })
    };
    
    document.onmousedown = function (e) {
      let oldClientX = e.clientX;
      let oldClientY = e.clientY;
      
      document.onmousemove = function (e) {
        
        that.setState({
          offsetLeft: that.state.offsetLeft - (e.clientX - oldClientX)/(that.state.size),
          offsetTop: that.state.offsetTop - (e.clientY - oldClientY)/(that.state.size),
        });
  
        oldClientX = e.clientX;
        oldClientY = e.clientY;
      };
      
      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      }
    }
  }
  
  componentWillUnmount(){
    document.onmousewheel = null;
    document.onmousedown = null;
  }
  
  getPrintRelation(){
    const relation = this.state.relation;
    let positions = relation.positions;
    
    const minPosition = Math.min.apply(null, positions);
    const dis = 0 - minPosition;
    
    positions = positions.map(item=>{
      return item + dis
    });
    
    return {
      ...relation,
      positions
    }
  }
  
  onDownload(){
    const printRelation = this.getPrintRelation();
    const minPosition = Math.min.apply(null, printRelation.positions);
    const maxPosition = Math.max.apply(null, printRelation.positions);
    
    let order = printRelation.order.filter(item=>item.length > 0);
    
    let printSize = {
      width: (maxPosition-minPosition)*10 + 100,
      height: (order.length/2) * 200 + 40,
    };
    
    this.setState({
      printRelation: printRelation,
      printSize: printSize
    }, ()=>{
      const svg = this.svg;
      setTimeout(()=>{
        svgToImage(svg, 'Marydon','jpg', printSize);
        
        this.setState({
          printRelation: null,
          printSize: {},
        })
      })
    })
  }
  
  /**
   * 撤销
   */
  undo(){
    const stateRecord = this.state.relation;
    const undoItems = this.state.undoItems;
    const redoItems = this.state.redoItems;
    const lastRecord = undoItems[undoItems.length-1];
    
    if(lastRecord){
      undoItems.splice(undoItems.length-1, 1);
      redoItems.push(stateRecord);
     
      this.setState({
        relation: lastRecord
      });
    }
  }
  
  /**
   * 重做
   */
  redo(){
    const stateRecord = this.state.relation;
    const undoItems = this.state.undoItems;
    const redoItems = this.state.redoItems;
    const lastRecord = redoItems[redoItems.length-1];
    
    if(lastRecord){
      redoItems.splice(redoItems.length-1, 1);
      undoItems.push(stateRecord);
      
      this.setState({
        relation: lastRecord
      });
    }
  }
  
  onChange(relation){
    let undoItems = this.state.undoItems;
    undoItems.push(this.state.relation);
    
    this.setState({
      relation,
      undoItems
    })
  }
  
  /**
   * 判断是否是初始源
   */
  isOriginator(shape){
    
    return shape.id === 0;
  }

  render() {
    const {width, height, size, offsetLeft, offsetTop, disLeft, disTop} = this.state;
    
    return (
      <div className='family-relationship-design'>
        <div>
          <button onClick={this.onDownload.bind(this)}>下载</button>
          <button onClick={this.undo.bind(this)}>撤销</button>
          <button onClick={this.redo.bind(this)}>重做</button>
        </div>
        <div>
          <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            viewBox={`${offsetLeft+disLeft} ${offsetTop+disTop} ${width/size} ${height/size}`}
            preserveAspectRatio='xMinYMin'
            style={{
              position: 'relative',
              overflow: 'hidden'
            }}
            className='main-svg'
          >
            <Defs />
            <DrawRelation
              ref={instance=>this.DrawRelation = instance}
              relation={this.state.relation}
              onChange={this.onChange.bind(this)}
              isOriginator={this.isOriginator.bind(this)}
            />
          </svg>
        </div>
        {
          this.state.printRelation?
            <div className='print-demo'>
              <svg
                ref={instance => this.svg = instance}
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
              >
                <Defs />
                <DrawRelation
                  ref={instance=>this.DrawRelation = instance}
                  relation={this.state.printRelation}
                  onChange={this.onChange.bind(this)}
                  isPrint={true}
                  height={this.state.printSize.height}
                  isOriginator={this.isOriginator.bind(this)}
                />
              </svg>
            </div>: null
        }
      </div>
    )
  }
}