import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CompaniesList from './CompaniesList';

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <CompaniesList />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
