import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../store/actions/authActions';

class Login extends Component {
  state = {

    email: '',
    password: ''

  }
  changeHandler = event => {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  submithandler = event => {
    event.preventDefault();
    let { email, password } = this.state;
    this.props.login({ email, password }, this.props.history);
  }

  render() {
    let { email, password, error } = this.state;

    return (
      <div>


        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Login here</h1>
          </div>
        </div>


        <form onSubmit={this.submithandler}>



          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="name" className="form-control" name="email" id="email" aria-describedby="emailHelp"

              onChange={this.changeHandler}
            />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1"
              name='password'
              onChange={this.changeHandler}
            />
          </div>

          <button type="submit" class="btn btn-primary" onSubmit={this.submithandler}>Submit</button>
        </form>


      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { login })(Login);
