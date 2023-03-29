import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { getToday } from './helpers/dateHelper';
import Expenses from './Screens/Expenses';

export default function Main() {
  const month = getToday().substring(0, 7);
  return (
    <>
      <Router>
        <Switch>
          <Route path="/despesas/:month">
            <Expenses />
          </Route>

          <Redirect to={{ pathname: '/despesas/' + month }}></Redirect>
        </Switch>
      </Router>
    </>
  );
}
