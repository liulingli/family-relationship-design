/**
 * 2021年3月23日
 * 改变夫妻关系
 */
import React from 'react';
import {Balloon, Radio, Checkbox} from '@alifd/next';

export default class RelationShip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  onChange(type, value){
    this.props.onChange(type, value);
  }
  
  render() {
    const {config} = this.props;
    const {prop} = config;
    
    return (
      <Balloon
        trigger={this.props.trigger}
        className='relation-ship-balloon'
        triggerType='click'
        popupContainer={this.props.popupContainer}
        align='rb'
      >
        <div className='relation-ship'>
          <div className='relation-ship-title'>与配偶的亲密关系</div>
          <div className='relation-ship-content'>
            <div className='form-item'>
              <Radio.Group
                value={prop.relation}
                dataSource={[
                  {label: '结婚', value: 1},
                  {label: '同居', value: 2},
                  {label: '分居', value: 3},
                  {label: '离婚', value: 4}
                ]}
                onChange={this.onChange.bind(this, 'relation')}
              />
            </div>
            <div className='form-item solid'>
              <Checkbox
                checked={prop.closeRelatives}
                onChange={this.onChange.bind(this, 'closeRelatives')}
              >近亲</Checkbox>
            </div>
          </div>
        </div>
      </Balloon>
    )
  }
}

