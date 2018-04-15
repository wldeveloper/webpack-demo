import React, { Component } from 'react';
import LoadableWrapped from '../LoadableWrapped';

const Dashboard = LoadableWrapped({
  loader: () => import('cps/Dashboard'),
  modules: ['cps/Dashboard'],
  webpack: () => [require.resolveWeak('cps/Dashboard')],
});

const Hello = LoadableWrapped({
  loader: () => import('cps/Hello'),
  modules: ['cps/Hello'],
  webpack: () => [require.resolveWeak('cps/Hello')],
});

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: false,
      hello: false,
    };
  }

  handleDashboard = () => {
    this.setState({
      dashboard: true,
    });
  }

  handleHello = () => {
    this.setState({
      hello: true,
    });
  }

  render() {
    const { dashboard, hello } = this.state;
    return (
      <div>
        <button onClick={this.handleDashboard}>dashboard</button>
        <button onClick={this.handleHello}>hello</button>
        <hr />
        {
          dashboard &&
          <Dashboard />
        }
        {
          hello &&
          <Hello />
        }
      </div>
    );
  }
}

export default Detail;
