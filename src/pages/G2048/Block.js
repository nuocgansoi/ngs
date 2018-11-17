import React from 'react';

export default class Block extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    const nextBlock = nextProps.block;

    if (!nextBlock) return false;

    const currentBlock = this.props.block;

    console.log('------------------');
    console.log(nextProps.block);
    console.log(this.props.block);
    console.log(nextBlock.x !== currentBlock.x
      || nextBlock.y !== currentBlock.y
      || nextBlock.value !== currentBlock.value);

    return nextBlock.x !== currentBlock.x
      || nextBlock.y !== currentBlock.y
      || nextBlock.value !== currentBlock.value;
  }

  render() {
    const {block} = this.props;

    return (
      <div
        data-value={block.value}
        style={{
          left: block.x * 25 + '%',
          top: block.y * 25 + '%',
        }}
        className="block"
      >
        <div className="blockBody">
        </div>
        <div className="value">
          {block.value}
        </div>
      </div>
    );
  }
}
