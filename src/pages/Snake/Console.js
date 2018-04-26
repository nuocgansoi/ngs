import React from 'react';
import {STATUS_LIVE, STATUS_OVER, STATUS_PAUSE, STATUS_WIN} from './constants';

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

const PauseOrResumeButton = ({status, handler}) => (
  <div className="button1" onClick={handler}>
    <i className={'fa ' + (status === STATUS_LIVE ? 'fa-pause' : 'fa-step-forward')}/>
  </div>
);

const RestartButton = ({handler}) => (
  <div className="button1" onClick={handler}>
    <i className="fa fa-redo"/>
  </div>
);

const Console = ({snake, status, ...props}) => {
  let StatusButton;
  switch (status) {
    case STATUS_LIVE:
    case STATUS_PAUSE:
      StatusButton = <PauseOrResumeButton status={status} handler={snake.pauseOrResume}/>;
      break;
    case STATUS_OVER:
    case STATUS_WIN:
    default:
      StatusButton = <RestartButton handler={snake.restart}/>;
      break;
  }

  return (
    <div className="console d-flex d-md-none justify-content-between align-items-center mt-3 mb-5">
      <div className="controller">
        <div>
          <ControlButton handler={snake.up}>
            <i className="fa fa-arrow-up"/>
          </ControlButton>
        </div>
        <div className="d-flex">
          <ControlButton handler={snake.left}>
            <i className="fa fa-arrow-left"/>
          </ControlButton>
          <ControlButton handler={snake.down}>
            <i className="fa fa-arrow-down"/>
          </ControlButton>
          <ControlButton handler={snake.right}>
            <i className="fa fa-arrow-right"/>
          </ControlButton>
        </div>
      </div>

      <div className="settings">
        <div>
          {StatusButton}
        </div>
      </div>
    </div>
  );
};

export default Console;
