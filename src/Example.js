import React from 'react';
import './Example.scss';
import Lib from './lib';

import {preset9, preset1} from './config/relation'

export default class Index extends React.Component {
  
  render() {
    return (
      <Lib
        relation={preset9}
      />
    )
  }
}