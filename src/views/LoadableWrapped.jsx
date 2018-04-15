import Loadable from 'react-loadable';
import Loading from '../components/Loading';

const LoadableWrapped = opts => (
  Loadable(Object.assign({
    loading: Loading,
    delay: 500,
    timeout: 10000,
  }, opts))
);

export default LoadableWrapped;
