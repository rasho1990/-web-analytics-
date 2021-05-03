import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import Pageview from './visitors/pages/Pageview.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

const App = () => {
  <Switch>
    <Route exact path='/' component={Pageview} />
    <Redirect to='/' />
  </Switch>
  return (
    <Router>
      <Pageview />
    </Router>
  );
}

export default App;
