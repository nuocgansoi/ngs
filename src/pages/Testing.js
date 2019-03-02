import React from 'react';
import BallDrop from './Park/BallDrop';

export default class Testing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className="d-flex align-items-center flex-column">
        <h3 className="mb-5">Testing</h3>
        <BallDrop height={500}/>
      </div>
    )
  }
}
