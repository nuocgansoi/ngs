import React from 'react';

let interval;

const onTouchStart = (handler) => () => {
  handler();
  interval = setInterval(handler, 100);
};

const onTouchEnd = () => {
  clearInterval(interval);
};

const ControlButton = ({handler, ...props}) => (
  <div className="button1" onTouchStart={onTouchStart(handler)} onTouchEnd={onTouchEnd}>
    {props.children}
  </div>
);

export default ({controls}) => {
  return (
    <div className="controller">
      <div className="d-flex">
        <ControlButton handler={controls.left}>
          <i className="fa fa-arrow-left" data-fa-rotate="45"/>
        </ControlButton>
        <ControlButton handler={controls.up}>
          <i className="fa fa-arrow-up" data-fa-rotate="45"/>
        </ControlButton>
      </div>
      <div className="d-flex">
        <ControlButton handler={controls.down}>
          <i className="fa fa-arrow-down" data-fa-rotate="45"/>
        </ControlButton>
        <ControlButton handler={controls.right}>
          <i className="fa fa-arrow-right" data-fa-rotate="45"/>
        </ControlButton>
      </div>
    </div>
  );
}
