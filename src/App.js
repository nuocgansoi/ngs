import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Snake from './pages/Snake';
import './scss/App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <strong>This is a Logo!</strong>
          </nav>
          <div>
            <Route exact path="/" component={Snake}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
