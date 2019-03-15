import React from 'react';
import {Link} from 'react-router-dom';
import TheEye from "../pages/Park/TheEye.js";
import routes from '../routes';
import LogoSVG from './LogoSVG';

export default class extends React.Component {
  componentDidMount() {
    const svgs = this.refs.navbar.querySelectorAll('svg');
    console.log(svgs);
    for (let i = 0; i < svgs.length; i++) {
      const svg = svgs[i];
      const path = svg.querySelector('path');
      if (!path) continue;

      const pathLength = path.getTotalLength();
      svg.style.strokeDasharray = pathLength / 5;
      svg.style.strokeDashoffset = pathLength;

      // Make style tag
      const style = document.createElement('style');
      style.type = 'text/css';

      const animateName = `navbarSvgDash${i}`;
      style.innerHTML = `
      @keyframes ${animateName} {
        from {
          stroke-dashoffset: ${pathLength};
        }
        to {
          stroke-dashoffset: 0;
        }
      }
    `;
      document.getElementsByTagName('head')[0].appendChild(style);

      svg.style.animation = `${animateName} linear 5s alternate infinite`;
    }
  }

  render() {
    return (
      <nav
        ref="navbar"
        id="navbar"
        {...this.props}
      >
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
    )
  }
}