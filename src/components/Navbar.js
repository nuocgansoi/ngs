import React from 'react';
import {Link} from 'react-router-dom';
import TheEye from "../pages/Park/TheEye.js";
import routes from '../routes';
import LogoSVG from './LogoSVG';

export default (props) => (
  <nav id="navbar" {...props}>
    <div className="body container">
      <div className="d-flex justify-content-between">
        <Link to={routes.home}>
          <LogoSVG/>
        </Link>

        <div className="d-flex">
          <TheEye width={40} height={20}/>
          <TheEye width={40} height={20}/>
        </div>
      </div>
    </div>
  </nav>
);
