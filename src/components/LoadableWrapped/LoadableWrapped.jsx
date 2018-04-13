import Loadable from 'react-loadable';
import Loading from '../Loading';

const loadableWrapped = path => (
  Loadable({
    loader: () => import(path),
    loading: Loading,
    delay: 500,
    timeout: 10000,
  })
);

export default loadableWrapped;
