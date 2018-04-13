import React from 'react';
import { Link } from 'react-router-dom';
import css from './Home.scss';

const Home = () => (
  <ul className={css.wrap}>
    <li>
      <Link to="home">Home</Link>
    </li>
    <li>
      <Link to="/detail">Detail</Link>
    </li>
  </ul>
);

export default Home;
