import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../store/actions/authActions';

class NavBar extends Component {

  submithandler=event=>{
    event.preventDefault();  
    //console.log("+++++++++++++++++++++");

    this.props.logout(this.props.history);
  }

    render() {

        return (
            <div>



<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item ">
        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">Register</Link>
      </li>

      {
      this.props.auth.user.name ?

      <li className="nav-item">
<Link className="nav-link" to="/dashboard">Dashboard</Link>
</li>:
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

      

      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>


                
            </div>
        );
    }
}

const mapStateToProps =state=>({
  auth: state.auth
})

export default connect(mapStateToProps,{logout})(NavBar);