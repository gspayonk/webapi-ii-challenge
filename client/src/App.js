import React from 'react';
import { Route } from 'react-router-dom';
import Posts from './components/Posts';

export default () => {

  return (
    <div>
      {/* <Route exact path = '/' component = {Posts} /> */}
      <Route path = '/' render = {props => <Posts {...props} />} />
    </div>
  );
};