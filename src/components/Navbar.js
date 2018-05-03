import React from 'react';
import {Link} from 'react-router-dom';
import routes from '../routes';
import LogoSVG from './LogoSVG';

export default (props) => (
  <nav id="navbar" {...props}>
    <div className="body container">
      <Link to={routes.home}>
        <LogoSVG/>
      </Link>
    </div>
  </nav>
);
