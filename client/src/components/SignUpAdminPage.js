import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../constants/routes';
import FirebaseContext, {withFirebase} from '../firebaseContext';

const SignUpAdminPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpAdminForm />
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

class SignUpAdminFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = async e => {
    const { username, email, passwordOne, role } = this.state;

    const response = await fetch('/api/quotes/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, email:email, passwordOne:passwordOne, role:role }),
      });
      const body = await response.json();
      this.setState({ ...INITIAL_STATE });
      this.props.history.push(ROUTES.HOME);
      console.log(body.message);

    e.preventDefault();
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
      role === '' || 
      email === '' ||
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

const SignUpAdminForm = compose(
  withRouter,
  withFirebase,
)(SignUpAdminFormBase);

export default SignUpAdminPage;

export { SignUpAdminForm, SignUpLink };