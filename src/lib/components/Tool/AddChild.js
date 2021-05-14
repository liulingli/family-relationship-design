/**
 * 2021年3月13日
 * 添加孩子，选择性别和多胞胎
 */
import React from 'react';
import {Balloon, Button, NumberPicker} from '@alifd/next';
import IconFont from './IconFont';

export default class AddChild extends React.Component{
  
  addType(sex, number, single){
    this.props.addType(sex, number, single)
  }
  
  render(){
    return (
      <Balloon
        trigger={this.props.trigger}
        className='add-child'
        triggerType='click'
        popupContainer={this.props.popupContainer}
      >
        <div className='add-child-buttons'>
          <Button type='normal' onClick={this.addType.bind(this, 'M', undefined, false)}><IconFont type='rect'/></Button>
          <Button type='normal' onClick={this.addType.bind(this, 'F', undefined, false)}><IconFont type='circle'/></Button>
          <Button type='normal' onClick={this.addType.bind(this, 'U', undefined, false)}><IconFont type='diamond'/></Button>
          <Button type='normal' onClick={this.addType.bind(this, 'U', 2, false)}>⋀</Button>
          <Button type='normal' onClick={this.addType.bind(this, 'U', 'n', true)}>〈n〉</Button>
        </div>
        {/*<div style={{}}>*/}
          {/*<NumberPicker />*/}
          {/*<Button type='primary'>添加</Button>*/}
        {/*</div>*/}
      </Balloon>
    )
  }
}
