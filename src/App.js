import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Game from './pages/Game';
import './scss/App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            Logo
          </nav>
          <div>
            <Route exact path="/" component={Game}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
