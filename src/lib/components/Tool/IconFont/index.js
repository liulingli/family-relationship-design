/**
 * Date: 2019-04-09 21:23:00
 * Author: 刘伶俐
 * Desc: 引用阿里巴巴图标库
 */
import React, { Component } from 'react';
import './iconfont.scss';

const sizeTo = {
  'xxs': '8px',
  'xs': '12px',
  'small': '16px',
  'medium': '20px',
  'large': '24px',
  'xl': '28px',
  'xxl': '34px'
};
export default class IconFont extends Component{
  static defaultProps = {
    size: 'medium',
    color: '#3c3c3c',
    fontWeight: 500,
    style: {}
  };

  constructor(props){
    super(props);

  }
  render(){
    let { size, type, fontWeight, style, onClick, className, ...other } = this.props;
    size = size || 'medium';
    const fontSize = sizeTo[size];

    return (
      <i
        {...other}
        className={`iconfont icon-${type} ${className||''}`}
        style={{fontSize, fontWeight: fontWeight, ...style }}
        onClick={onClick}
      />
    )
  }
}
