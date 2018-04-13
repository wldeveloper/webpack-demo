import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Home from './Home';
import Detail from './Detail';

const RouterIndex = () => (
  <Router>
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/detail" component={Detail} />
      <Redirect to="/home" />
    </Switch>
  </Router>
);

export default RouterIndex;
