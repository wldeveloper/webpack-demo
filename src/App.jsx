import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => (
  <Router>
    <Route exact path="/" component={() => <div>hello world</div>} />
  </Router>
);

const mapDispatchToProps = {};
const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
