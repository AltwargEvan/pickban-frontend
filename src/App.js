//package imports
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
//pages
import Home from './pages/home.js'
import Match from './pages/match.js'
//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss'

const App = () => {
  return (
    <Router >
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route
            path="/:_id/:teamId"
            component={Match}
          />
          <Route
            path="/:_id"
            component={Match}
          />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App
