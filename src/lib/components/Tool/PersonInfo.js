/**
 * 2021年3月23日
 * 个人信息
 */
import React from 'react';
import moment from 'moment';
import {Balloon, Radio, DatePicker, Select, Input} from '@alifd/next';

export default class PersonInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  onChange(type, value){
    this.props.onChange(type, value);
  }
  
  render() {
    const {config, genderList} = this.props;
    const {prop} = config;
    
    return (
      <Balloon
        trigger={this.props.trigger}
        className='relation-ship-balloon'
        triggerType='click'
        popupContainer={this.props.popupContainer}
        align='rb'
        style={{
          marginLeft: 105,
          marginTop: 0,
        }}
      >
        <div className='relation-ship'>
          <div className='relation-ship-title'>基本信息</div>
          <div className='relation-ship-content'>
            <div className='form-item'>
              <div className='form-item-label required'>性别</div>
              <div className='form-item-content'>
                <Radio.Group
                  value={prop.gender}
                  dataSource={genderList||[]}
                  onChange={this.onChange.bind(this, 'gender')}
                />
              </div>
            </div>
            <div className='form-item'>
              <div className='form-item-label required'>姓名</div>
              <div className='form-item-content'>
                <Input
                  value={prop.fName}
                  onChange={this.onChange.bind(this, 'fName')}
                />
              </div>
            </div>
            <div className='form-item'>
              <div className='form-item-label'>出生日期</div>
              <div className='form-item-content'>
                <DatePicker
                  value={prop.birthDate}
                  onChange={(value)=>{
                    this.onChange('birthDate', moment(value).format('YYYY-MM-DD'))
                  }}
                  followTrigger
                />
              </div>
            </div>
            <div className='form-item'>
              <div className='form-item-label required'>身体状况</div>
              <div className='form-item-content'>
                <Select
                  value={prop.condition}
                  dataSource={[
                    {label: '正常', value: 1},
                    {label: '患病', value: 2},
                    {label: '疑似', value: 3},
                    {label: '死亡', value: 4},
                    {label: '死亡患病', value: 5},
                    {label: '死亡疑似', value: 6},
                  ]}
                  onChange={this.onChange.bind(this, 'condition')}
                  followTrigger
                />
              </div>
            </div>
            <div className='form-item'>
              <div className='form-item-label required'>领养</div>
              <div className='form-item-content'>
                <Radio.Group
                  value={prop.adopt}
                  dataSource={[
                    {label: '是', value: 1},
                    {label: '否', value: 2},
                  ]}
                  onChange={this.onChange.bind(this, 'adopt')}
                />
              </div>
            </div>
            <div className='form-item'>
              <div className='form-item-label'>备注</div>
              <div className='form-item-content'>
                <Input.TextArea
                  rows={4}
                  maxLength={200}
                  value={prop.marks}
                  onChange={this.onChange.bind(this, 'marks')}
                />
              </div>
            </div>
          </div>
        </div>
      </Balloon>
    )
  }
}

