import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/authActions';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logout2: false
    };
    this.submithandler = this.submithandler.bind(this);
  }

  submithandler = event => {
    event.preventDefault();
    this.setState({ logout2: true });

    let history= JSON.parse(localStorage.getItem('historyBackUp'));
    
    this.props.logout(history);
  }

  render() {
    return (
      <div>

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">Money Manage</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item ">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
              </li>

              {
                this.props.auth.user.name ?

                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li> :
                  <div> </div>
              }

              {
                this.props.auth.user.name ?

                  <li className="nav-item">
                    <Link className="nav-link" to="/gift">Gift</Link>
                  </li>
                  :
                  <div> </div>
              }

              {
                this.props.auth.user.name ?

                  <li className="nav-item">
                    <Link className="nav-link" onClick={this.submithandler} >Logout</Link>
                  </li>

                  :

                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
              }

              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>

            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  transactions: state.transactions
})

export default connect(mapStateToProps, { logout })(NavBar);