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
  TYPE_BOTTOM,
  TYPE_LEFT,
  TYPE_RIGHT,
  TYPE_TOP,
} from './constants';

export default () => (
  <div className="allBlocks">
    <div className="d-flex">
      <BT type={TYPE_TOP} color={COLOR_1}/>
      <BT type={TYPE_LEFT} color={COLOR_1}/>
      <BT type={TYPE_RIGHT} color={COLOR_1}/>
      <BT type={TYPE_BOTTOM} color={COLOR_1}/>
    </div>

    <div className="d-flex">
      <BI type={TYPE_TOP} color={COLOR_2}/>
      <BI type={TYPE_LEFT} color={COLOR_2}/>
      <BI type={TYPE_RIGHT} color={COLOR_2}/>
      <BI type={TYPE_BOTTOM} color={COLOR_2}/>
    </div>

    <div className="d-flex">
      <BS type={TYPE_TOP} color={COLOR_3}/>
      <BS type={TYPE_LEFT} color={COLOR_3}/>
      <BS type={TYPE_RIGHT} color={COLOR_3}/>
      <BS type={TYPE_BOTTOM} color={COLOR_3}/>
    </div>

    <div className="d-flex">
      <BZ type={TYPE_TOP} color={COLOR_4}/>
      <BZ type={TYPE_LEFT} color={COLOR_4}/>
      <BZ type={TYPE_RIGHT} color={COLOR_4}/>
      <BZ type={TYPE_BOTTOM} color={COLOR_4}/>
    </div>

    <div className="d-flex">
      <BL type={TYPE_TOP} color={COLOR_5}/>
      <BL type={TYPE_LEFT} color={COLOR_5}/>
      <BL type={TYPE_RIGHT} color={COLOR_5}/>
      <BL type={TYPE_BOTTOM} color={COLOR_5}/>
    </div>

    <div className="d-flex">
      <BJ type={TYPE_TOP} color={COLOR_6}/>
      <BJ type={TYPE_LEFT} color={COLOR_6}/>
      <BJ type={TYPE_RIGHT} color={COLOR_6}/>
      <BJ type={TYPE_BOTTOM} color={COLOR_6}/>
    </div>

    <div className="d-flex">
      <BO type={TYPE_TOP} color={COLOR_7}/>
      <BO type={TYPE_LEFT} color={COLOR_7}/>
      <BO type={TYPE_RIGHT} color={COLOR_7}/>
      <BO type={TYPE_BOTTOM} color={COLOR_7}/>
    </div>
  </div>
)
