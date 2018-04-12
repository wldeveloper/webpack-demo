import React from 'react';
import Loadable from 'react-loadable';

const Loading = props => {
  if (props.error) {
    return <div>Error!</div>;
  } else if (props.timedOut) {
    return <div>Taking a long time...</div>;
  } else if (props.pastDelay) {
    return <div>Loading...</div>;
  }
  return null;
};

const LoadableComponent = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading,
  delay: 500,
  timeout: 10000,
});

/* class LoadableDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <LoadableComponent />;
  }
} */

export default LoadableComponent;
