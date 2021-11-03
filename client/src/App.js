import Button from 'react-bootstrap/Button'
import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {
  state = {
    response: [],
    content: '',
    responseToPost: [],
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.message }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/quotes');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  
  handleGet = async e => {
    e.preventDefault();
    const response = await fetch('/api/quotes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
    console.log(response);
    console.log(body.data);
    this.setState({ responseToPost: body.data.map(x=> x.content) });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: this.state.content }),
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

export default App;