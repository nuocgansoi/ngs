import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import {LogoSVG} from './components';
import Snake from './pages/Snake';
import './scss/App.scss';

const routes = {
  home: '/',
};

class App extends Component {
  render() {
    return (
      <Router>
        <div id="rootWrapper">
          <nav id="navbar">
            <div className="body container">
              <LogoSVG/>
            </div>
          </nav>
          <div id="main">
            <Route exact path={routes.home} component={Snake}/>
            <Redirect to={routes.home}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
