import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class App extends Component {
  constructor() {
    super();
    this.state = {
      salario: '',
      aliquota: 0,
      parcela: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    axios.post('http://localhost:8000/api/calc', {salario: this.state.salario})
      .then((response) => {
        console.log(response);
        this.setState({ aliquota: response.data.aliquota });
        this.setState({ parcela: response.data.parcela });
        this.setState({salario: ''});
      })
      .catch(err => console.log(err));
  }

  handleChange(event) {
    this.setState({ salario: event.target.value })
  }

  render() {
    return (
      <div className="App">
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Salário</Form.Label>
              <Form.Control name="salario" type="text" placeholder="Insira o seu salário" value={this.state.salario} onChange={this.handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Calcular
            </Button>
          </Form>
        </div>
        <div className="Table">
          {/* <h4>Salário: {this.state.salario}</h4> */}
          <h4>Alíquota: {this.state.aliquota}%</h4>
          <h4>Parcela: {this.state.parcela}</h4>
        </div>
      </div>
    );
  }
}

export default App;
