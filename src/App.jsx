import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import css from './test.scss';

const App = () => (
  <Router>
    <div>
      <Route exact path="/home" component={() => <div className={css.wrap}>helaaaaaaaad</div>} />
      <Route exact path="/list" component={() => <div>aaa</div>} />
      <Route exact path="/" component={() => <div>helaaaafdafadfsaaaaaaaaaaalo world</div>} />
    </div>
  </Router>
);

const mapDispatchToProps = {};
const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
