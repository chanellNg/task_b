import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../constants/routes';
import FirebaseContext, {withFirebase} from '../firebaseContext';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  role: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = async event => {
    event.preventDefault();
    console.log("signup");
    const { username, email, passwordOne, role } = this.state;

    const userCredentials = await this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne);
    

    this.setState({...INITIAL_STATE});
      /**then(function(authUser){
       
        const uid = authUser.uid;
        console.log(uid);
        this.setState({ user:uid});
        
      })
      .catch(error => {
        this.setState({ error });
      });
      **/
    
      console.log("user created");
    
    
    //new change
    
    
   
    const uid = this.props.firebase.auth.currentUser.uid;
    console.log(uid);
    const response = await fetch('/api/quotes/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid:uid, role:role }),
    });
    console.log(response.json());
    this.props.history.push(ROUTES.HOME);
   
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      role,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      role === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <input
          name="role"
          value={role}
          onChange={this.onChange}
          type="text"
          placeholder="Confirm role"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };