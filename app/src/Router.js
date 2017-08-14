
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// Components and Pages
import Layout from './components/Layout'
// import Login from './routes/Login'
// import PrivateRoute from './auth/Auth'

const User = () => <div><h1>Users</h1></div>;
const NotFound = () => <Redirect to="/user" />;

export default (props) => (
  <Router>
    <Layout>
      <Switch>
        {/* <Route path="/login" component={Login} />
        <PrivateRoute path="/user" component={User} /> */}
        <Route path="/" component={NotFound} />
      </Switch>
    </Layout>
  </Router>
);
