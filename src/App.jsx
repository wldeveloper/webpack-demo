import React from 'react';
import { connect } from 'react-redux';
import Router from './views/Router';

const App = () => (
  <Router />
);

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
