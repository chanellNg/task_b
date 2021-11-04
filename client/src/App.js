import Button from 'react-bootstrap/Button'
import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import LandingPage from './components/LandingPage';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import PasswordForgetPage from './components/PasswordForgetPage';
import HomePage from './components/Homepage';
import AccountPage from './components/AccountPage';
import AdminPage from './components/AdminPage';
 
import * as ROUTES from './constants/routes';
import Firebase from './firebase';
import FirebaseContext, {withFirebase} from './firebaseContext';

class App extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      },
    );
  }
 
  componentWillUnmount() {
    this.listener();
  }
  
render() {
    return (
      <Router>
    <div>
      <Navigation authUser={this.state.authUser} />
 
      <hr />
 
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={() => (<HomePage authUser={this.state.authUser} />)}/>
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </div>
  </Router>
    );
  }
}

export default withFirebase(App);