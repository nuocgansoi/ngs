import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {loadable, Navbar} from './components';
import {Home, Snake, Tetris} from './pages';
import routes from './routes';
import './scss/App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div id="rootWrapper">
          <Navbar/>
          <div id="main">
            <Switch>
              <Route exact path={routes.home} component={loadable(Home)}/>
              <Route exact path={routes.snake} component={loadable(Snake)}/>
              <Route exact path={routes.tetris} component={loadable(Tetris)}/>

              <Redirect to={routes.home}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
