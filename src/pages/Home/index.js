import React from 'react';
import {Link} from 'react-router-dom';
import routes from '../../routes';

const Item = ({to, children, props}) => (
  <div className="item" {...props}>
    <Link to={to} className="link">
      {children}
    </Link>
  </div>
);

export default class extends React.Component {
  render() {
    return (
      <div id="home">
        <div className="container">
          <div className="gameList">
            <Item to={routes.park}>
              Park
            </Item>

            <Item to={routes.snake}>
              Snake
            </Item>

            <Item to={routes.tetris}>
              Tetris
            </Item>

            <Item to={routes.g2048}>
              2048
            </Item>

            <Item to={routes.testing}>
              Testing
            </Item>
          </div>
        </div>
      </div>
    );
  }
}
