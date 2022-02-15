import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Tasks from './pages/Tasks';

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/login" component={ Login } />
        <Route path="/tasks" component={ Tasks } />
      </Switch>
    </Provider>
  );
}

export default App;
