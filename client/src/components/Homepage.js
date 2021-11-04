import Button from 'react-bootstrap/Button'
import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import { BrowserRouter as Router } from 'react-router-dom';
import FirebaseContext, { withFirebase } from '../firebaseContext';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';


class Homepage extends Component {
  constructor(props) {
    super(props);

  }

  state = {
    response: [],
    content: '',
    responseToPost: [],
  };

  /*componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.message }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/quotes');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  }; */
  
  createToken = async () => {
    const user = this.props.firebase.auth.currentUser;
    const token = user && (await user.getIdToken());
    const payloadHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
    return payloadHeader;
  }

  getRole = async () => {
    const user = this.props.firebase.auth.currentUser;
    const token = user && (await user.getIdTokenResult());
    return token;
  }

  handleGet = async e => {
    e.preventDefault();
    const header = await this.createToken();
    const response = await fetch('/api/quotes', {
      method: 'GET',
      headers: header,
    });
    const body = await response.json();
    console.log(header);
    console.log(response);
    console.log(response.status);
    console.log(body);
    if(this.props.authUser) {
      this.setState({ responseToPost: body.data.map(x=> x.content) });
    } else {
      this.setState({response: body.message });
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    const header = await this.createToken();
    const token = await this.getRole();
    console.log(token);
    
    const response = await fetch('/api/quotes', {
      method: 'POST',
      headers: header,
      body: JSON.stringify({  content: this.state.content }),
    });
    const body = await response.json();
    this.setState({ response: body.message });
  };
  
render() {
    return (
      <div className="App">
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.content}
            onChange={e => this.setState({ content: e.target.value })}
          />
          
          <Button variant="success" type="submit">Submit</Button>{' '}
        </form>
        <Button onClick={this.handleGet} variant="success">Get quotes</Button>{' '}
        <p></p>
        {this.state.responseToPost.map(response =>
          <ListGroup key={response} style={{ alignItems:'center',
          justifyContent:'center'}}>
          <ListGroup.Item variant="primary" style={{ width: '50%' }}>{response}</ListGroup.Item>
                            </ListGroup>
                    )}
      </div>
    );
  }
}

export default withFirebase(Homepage);