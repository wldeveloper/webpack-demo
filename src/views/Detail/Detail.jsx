import React from 'react';
import { LoadableWrapped } from 'cps';

const Dashboard = LoadableWrapped('cps/Dashboard/index.jsx');

const Detail = () => (
  <div>
    Detail
    <hr />
    <Dashboard />
  </div>
);

export default Detail;
