import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {loadable, Navbar} from './components';
import {Home, Snake} from './pages';
import './scss/App.scss';
import routes from './routes';

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

              <Redirect to={routes.home}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
