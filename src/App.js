import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { loadable, Navbar } from './components';
import { G2048, Home, Park, Snake, Tetris } from './pages';
import Testing from './pages/Testing';
import HungBong from './unity_games/hung_bong';
import Runner from './unity_games/runner';
import BanRuoi from './unity_games/ban_ruoi';
import BanChim from './unity_games/ban_chim';
import BallBreaker from './unity_games/ball_breaker';
import ArcherShootsApples from './unity_games/archer_shoots_apples';
import routes from './routes';
import './scss/App.scss';
import TowerDefense from './unity_games/tower_defense';

class App extends Component {
  render() {
    return (
      <Router>
        <div id="rootWrapper" className="container">
          <Navbar />
          <div id="main">
            <Switch>
              <Redirect from='/:url*(/+)' to={window.location.pathname.slice(0, -1)} />
              <Route exact path={routes.home} component={loadable(Home)} />
              <Route exact path={routes.snake} component={loadable(Snake)} />
              <Route exact path={routes.tetris} component={loadable(Tetris)} />
              <Route exact path={routes.park} component={loadable(Park)} />
              <Route exact path={routes.g2048} component={loadable(G2048)} />
              <Route exact path={routes.testing} component={loadable(Testing)} />

              <Route exact path={routes.unity_games.hung_bong} component={loadable(HungBong)} />
              <Route exact path={routes.unity_games.runner} component={loadable(Runner)} />
              <Route exact path={routes.unity_games.ban_ruoi} component={loadable(BanRuoi)} />
              <Route exact path={routes.unity_games.ban_chim} component={loadable(BanChim)} />
              <Route exact path={routes.unity_games.ball_breaker} component={loadable(BallBreaker)} />
              <Route exact path={routes.unity_games.archer_shoots_apples} component={loadable(ArcherShootsApples)} />
              <Route exact path={routes.unity_games.tower_defense} component={loadable(TowerDefense)} />

              <Redirect to={routes.home} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
