import React from 'react';
import {Link} from 'react-router-dom';
import routes from '../../routes';

export default class extends React.Component {
  render() {
    return (
      <div id="home">
        <div className="container">
          <div className="gameList">
            <Link to={routes.snake} className="link">
              Snake
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
