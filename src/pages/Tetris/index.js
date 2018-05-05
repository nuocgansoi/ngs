import React from 'react';
import AllBlocks from './AllBlocks';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="tetris">
        Tetris

        <div className="yard">

          <AllBlocks/>
        </div>
      </div>
    );
  }
}
