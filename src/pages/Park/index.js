import React from 'react';
import TheEye from './TheEye';
import TheGalaxy from "./TheGalaxy.js";
import TheMovingBall from './TheMovingBall.js';

export default class Park extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="park">
        <h4>Park</h4>

        <div className="d-flex mb-2">
          <TheEye width={100} height={50}/>
          <TheEye width={100} height={50}/>
        </div>

        <div className="d-flex mb-2">
          <TheGalaxy width={300} height={400}/>
        </div>

        <div className="d-flex mb-2">
          <TheMovingBall width={300} height={400}/>
        </div>
      </div>
    );
  }
}
