import React from 'react';
import {KEY_A, KEY_D, KEY_S, KEY_W, KEYS} from './constants';

export default class G2048 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks: [],
    };
    this.mouse = {
      x: 0,
      y: 0,
    };
  }

  componentDidMount() {
    let blocks = [this.randomBlock()];
    blocks = [...blocks, this.randomBlock(blocks)];
    this.setState({blocks});

    document.addEventListener('keydown', this.onKeyDown, false);
  }

  onKeyDown = (e) => {
    const {keyCode} = e;

    if (KEYS.includes(keyCode)) e.preventDefault();

    switch (keyCode) {
      case KEY_W:
        this.move.up();
        break;
      case KEY_A:
        this.move.left();
        break;
      case KEY_S:
        this.move.down();
        break;
      case KEY_D:
        this.move.right();
        break;
    }
  };

  onTouchStart = (e) => {
    this.mouse.x = e.touches[0].clientX;
    this.mouse.y = e.touches[0].clientY;
  };

  onTouchEnd = (e) => {
    const x = e.changedTouches[0].clientX;
    const y = e.changedTouches[0].clientY;

    const moveX = Math.abs(x - this.mouse.x);
    const moveY = Math.abs(y - this.mouse.y);

    if (moveX < 20 && moveY < 20) return null;

    if (moveX > moveY) {
      if (x > this.mouse.x) {
        this.move.right();
      } else {
        this.move.left();
      }
    } else {
      if (y > this.mouse.y) {
        this.move.down();
      } else {
        this.move.up();
      }
    }
  };

  randomBlock = (blocks) => {
    if (!blocks) blocks = this.state.blocks;

    const value = 2 + Math.round(Math.random()) * 2;
    const {x, y} = this.randomBlockPosition(blocks);

    return {x, y, value};
  };

  randomBlockPosition = (blocks) => {
    const x = Math.round(Math.random() * 3);
    const y = Math.round(Math.random() * 3);

    const availableBlock = blocks.find(block => block.x === x && block.y === y);
    if (availableBlock) {
      return this.randomBlockPosition(blocks);
    }

    return {x, y};
  };

  move = {
    up: () => {
      console.log('up');
      const {blocks} = this.state;
      const columns = {
        0: [],
        1: [],
        2: [],
        3: [],
      };
      let movingCount = 0;

      blocks.map(block => {
        columns[block.x].push(block);
      });
      let newBlocks = [];

      Object.keys(columns).map(columnIndex => {
        const columnBlocks = columns[columnIndex].sort((a, b) => a.y - b.y);
        let newColumnBlocks = [];

        columnBlocks.map(columnBlock => {
          if (columnBlock.y === 0) {
            newColumnBlocks.push(columnBlock);
          } else {
            const aheadBlocks = newColumnBlocks.filter(ncb => ncb.y < columnBlock.y);
            if (!aheadBlocks.length) {
              movingCount++;

              columnBlock.y = 0;
              newColumnBlocks.push(columnBlock);
            } else {
              const nearbyBlock = aheadBlocks[aheadBlocks.length - 1];

              if (nearbyBlock.value === columnBlock.value) {
                movingCount++;

                newColumnBlocks = newColumnBlocks.map(ncb => {
                  if (ncb.y === nearbyBlock.y) {
                    ncb.value *= 2;
                  }

                  return ncb;
                });
              } else {
                if (columnBlock.y !== nearbyBlock.y + 1) {
                  movingCount++;
                  columnBlock.y = nearbyBlock.y + 1;
                }

                newColumnBlocks.push(columnBlock);
              }
            }
          }
        });

        newBlocks = [...newBlocks, ...newColumnBlocks];
      });

      if (!movingCount) return;

      this.setState({
        blocks: [
          ...newBlocks,
          this.randomBlock(newBlocks),
        ],
      });
    },
    left: () => {
      console.log('left');
      const {blocks} = this.state;
      const rows = {
        0: [],
        1: [],
        2: [],
        3: [],
      };
      let movingCount = 0;

      blocks.map(block => {
        rows[block.y].push(block);
      });
      let newBlocks = [];

      Object.keys(rows).map(columnIndex => {
        const rowBlocks = rows[columnIndex].sort((a, b) => a.x - b.x);
        let newRowBlocks = [];

        rowBlocks.map(rowBlock => {
          if (rowBlock.x === 0) {
            newRowBlocks.push(rowBlock);
          } else {
            const aheadBlocks = newRowBlocks.filter(ncb => ncb.x < rowBlock.x);
            if (!aheadBlocks.length) {
              movingCount++;

              rowBlock.x = 0;
              newRowBlocks.push(rowBlock);
            } else {
              const nearbyBlock = aheadBlocks[aheadBlocks.length - 1];

              if (nearbyBlock.value === rowBlock.value) {
                movingCount++;

                newRowBlocks = newRowBlocks.map(ncb => {
                  if (ncb.x === nearbyBlock.x) {
                    ncb.value *= 2;
                  }

                  return ncb;
                });
              } else {
                if (rowBlock.x !== nearbyBlock.x + 1) {
                  movingCount++;
                  rowBlock.x = nearbyBlock.x + 1;
                }

                newRowBlocks.push(rowBlock);
              }
            }
          }
        });

        newBlocks = [...newBlocks, ...newRowBlocks];
      });

      if (!movingCount) return;

      this.setState({
        blocks: [
          ...newBlocks,
          this.randomBlock(newBlocks),
        ],
      });
    },
    down: () => {
      console.log('down');
      const {blocks} = this.state;
      const columns = {
        0: [],
        1: [],
        2: [],
        3: [],
      };
      let movingCount = 0;

      blocks.map(block => {
        columns[block.x].push(block);
      });
      let newBlocks = [];

      Object.keys(columns).map(columnIndex => {
        const columnBlocks = columns[columnIndex].sort((a, b) => b.y - a.y);
        let newColumnBlocks = [];

        columnBlocks.map(columnBlock => {
          if (columnBlock.y === 3) {
            newColumnBlocks.push(columnBlock);
          } else {
            const aheadBlocks = newColumnBlocks.filter(ncb => ncb.y > columnBlock.y);
            if (!aheadBlocks.length) {
              movingCount++;

              columnBlock.y = 3;
              newColumnBlocks.push(columnBlock);
            } else {
              const nearbyBlock = aheadBlocks[aheadBlocks.length - 1];

              if (nearbyBlock.value === columnBlock.value) {
                movingCount++;

                newColumnBlocks = newColumnBlocks.map(ncb => {
                  if (ncb.y === nearbyBlock.y) {
                    ncb.value *= 2;
                  }

                  return ncb;
                });
              } else {
                if (columnBlock.y !== nearbyBlock.y - 1) {
                  movingCount++;
                  columnBlock.y = nearbyBlock.y - 1;
                }

                newColumnBlocks.push(columnBlock);
              }
            }
          }
        });

        newBlocks = [...newBlocks, ...newColumnBlocks];
      });

      if (!movingCount) return;

      this.setState({
        blocks: [
          ...newBlocks,
          this.randomBlock(newBlocks),
        ],
      });
    },
    right: () => {
      console.log('right');
      const {blocks} = this.state;
      const rows = {
        0: [],
        1: [],
        2: [],
        3: [],
      };
      let movingCount = 0;

      blocks.map(block => {
        rows[block.y].push(block);
      });
      let newBlocks = [];

      Object.keys(rows).map(columnIndex => {
        const rowBlocks = rows[columnIndex].sort((a, b) => b.x - a.x);
        let newRowBlocks = [];

        rowBlocks.map(rowBlock => {
          if (rowBlock.x === 3) {
            newRowBlocks.push(rowBlock);
          } else {
            const aheadBlocks = newRowBlocks.filter(ncb => ncb.x > rowBlock.x);
            if (!aheadBlocks.length) {
              movingCount++;

              rowBlock.x = 3;
              newRowBlocks.push(rowBlock);
            } else {
              const nearbyBlock = aheadBlocks[aheadBlocks.length - 1];

              if (nearbyBlock.value === rowBlock.value) {
                movingCount++;

                newRowBlocks = newRowBlocks.map(ncb => {
                  if (ncb.x === nearbyBlock.x) {
                    ncb.value *= 2;
                  }

                  return ncb;
                });
              } else {
                if (rowBlock.x !== nearbyBlock.x - 1) {
                  movingCount++;
                  rowBlock.x = nearbyBlock.x - 1;
                }

                newRowBlocks.push(rowBlock);
              }
            }
          }
        });

        newBlocks = [...newBlocks, ...newRowBlocks];
      });

      if (!movingCount) return;

      this.setState({
        blocks: [
          ...newBlocks,
          this.randomBlock(newBlocks),
        ],
      });
    },
  };


  //------------------------------------------------------------------------------
  //  Renders
  //------------------------------------------------------------------------------

  renderBlocks = () => {
    return this.state.blocks.map((block, index) => {
      return (
        <div
          data-value={block.value}
          style={{
            left: block.x * 25 + '%',
            top: block.y * 25 + '%',
          }}
          className="block"
          key={index}
        >
          <div className="blockBody">
          </div>
          <div className="value">
            {block.value}
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div
        id="g2048"
        className="container"
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.onTouchEnd}
      >
        <div className="yard">
          {this.renderBlocks()}
        </div>
      </div>
    );
  }
}
