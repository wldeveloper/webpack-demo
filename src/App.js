import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div>hello world</div>
    );
  };
};

const mapDispatchToProps = {};
const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
