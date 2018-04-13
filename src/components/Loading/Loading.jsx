import React from 'react';
import { object, bool, oneOfType } from 'prop-types';

const Loading = props => {
  const { error, timedOut, pastDelay } = props;
  if (error) {
    return <div>Error!</div>;
  } else if (timedOut) {
    return <div>Taking a long time...</div>;
  } else if (pastDelay) {
    return <div>Loading...</div>;
  }
  return null;
};

Loading.propTypes = {
  error: oneOfType([object, bool]).isRequired,
  timedOut: bool.isRequired,
  pastDelay: bool.isRequired,
};

export default Loading;
