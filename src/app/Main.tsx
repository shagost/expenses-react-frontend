import React, { useEffect, useState } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { getToday } from './helpers/dateHelper';
import Expenses from './Screens/Expenses';
import LoginScreen from './Screens/LoginScreen';
import { getUserEndpoint, IUser } from './services/backend';

export default function Main() {
  const [user, setUser] = useState<IUser | null>(null);
  const month = getToday().substring(0, 7);

  useEffect(() => {
    getUserEndpoint().then(setUser, signOut);
  }, []);

  function signOut() {
    setUser(null);
  }

  if (user) {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/despesas/:month">
              <Expenses user={user} onSignOut={signOut} />
            </Route>

            <Redirect to={{ pathname: '/despesas/' + month }}></Redirect>
          </Switch>
        </Router>
      </>
    );
  } else {
    return <LoginScreen onSignIn={setUser} />;
  }
}
