import React from 'react';
import {BI, BJ, BL, BO, BS, BT, BZ} from './blocks';
import {
  COLOR_1,
  COLOR_2,
  COLOR_3,
  COLOR_4,
  COLOR_5,
  COLOR_6,
  COLOR_7,
  TYPE_4,
  TYPE_2,
  TYPE_3,
  TYPE_1,
} from './constants';

export default () => (
  <div className="allBlocks">
    <div className="d-flex">
      <BT type={TYPE_1} color={COLOR_1}/>
      <BT type={TYPE_2} color={COLOR_1}/>
      <BT type={TYPE_3} color={COLOR_1}/>
      <BT type={TYPE_4} color={COLOR_1}/>
    </div>

    <div className="d-flex">
      <BI type={TYPE_1} color={COLOR_2}/>
      <BI type={TYPE_2} color={COLOR_2}/>
      <BI type={TYPE_3} color={COLOR_2}/>
      <BI type={TYPE_4} color={COLOR_2}/>
    </div>

    <div className="d-flex">
      <BS type={TYPE_1} color={COLOR_3}/>
      <BS type={TYPE_2} color={COLOR_3}/>
      <BS type={TYPE_3} color={COLOR_3}/>
      <BS type={TYPE_4} color={COLOR_3}/>
    </div>

    <div className="d-flex">
      <BZ type={TYPE_1} color={COLOR_4}/>
      <BZ type={TYPE_2} color={COLOR_4}/>
      <BZ type={TYPE_3} color={COLOR_4}/>
      <BZ type={TYPE_4} color={COLOR_4}/>
    </div>

    <div className="d-flex">
      <BL type={TYPE_1} color={COLOR_5}/>
      <BL type={TYPE_2} color={COLOR_5}/>
      <BL type={TYPE_3} color={COLOR_5}/>
      <BL type={TYPE_4} color={COLOR_5}/>
    </div>

    <div className="d-flex">
      <BJ type={TYPE_1} color={COLOR_6}/>
      <BJ type={TYPE_2} color={COLOR_6}/>
      <BJ type={TYPE_3} color={COLOR_6}/>
      <BJ type={TYPE_4} color={COLOR_6}/>
    </div>

    <div className="d-flex">
      <BO type={TYPE_1} color={COLOR_7}/>
      <BO type={TYPE_2} color={COLOR_7}/>
      <BO type={TYPE_3} color={COLOR_7}/>
      <BO type={TYPE_4} color={COLOR_7}/>
    </div>
  </div>
)
