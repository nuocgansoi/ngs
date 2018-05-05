import React from 'react';

export default ({x, y, ...props}) => {
  return (
    <div className="point" data-position-x={x} data-position-y={y}/>
  );
}
