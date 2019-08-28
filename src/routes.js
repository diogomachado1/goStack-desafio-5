import { BrowserRouter, Switch, Route } from 'react-router-dom';

import React from 'react';
import Repository from './pages/Repository';
import Main from './pages/Main';

// import { Container } from './styles';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/Repository/:repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}
