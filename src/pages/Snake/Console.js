import React from 'react';
import {Controller} from '../../components/Console';
import {STATUS_LIVE, STATUS_OVER, STATUS_PAUSE, STATUS_WIN} from './constants';

const PauseOrResumeButton = ({status, handler}) => (
  <div className="button2" onClick={handler}>
    <i className={'fa ' + (status === STATUS_LIVE ? 'fa-pause' : 'fa-step-forward')}/>
  </div>
);

const RestartButton = ({handler}) => (
  <div className="button2" onClick={handler}>
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
    <div className="console d-flex d-md-none justify-content-between align-items-center">
      <Controller controls={snake}/>

      <div className="actions">
        {StatusButton}
      </div>
    </div>
  );
};

export default Console;
