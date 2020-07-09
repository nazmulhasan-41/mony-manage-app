import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {register} from '../store/actions/authActions';


class Register extends Component {
    state={
        name:'',
        email: '',
        password:'',
        confirmedPassword:'',
        error:{}
    }
    changeHandler=event=>{
     
        this.setState({
            [event.target.name]:event.target.value
        })
        
    }
    submithandler=event=>{
        event.preventDefault();
        let {name,email,password,confirmedPassword}=this.state;
        this.props.register({name,email,password,confirmedPassword},this.props.history);
    }



    render() {
        let {name,email,password,confirmedPassword,error}=this.state;
       

        return (
            <div>


                
<div className="jumbotron jumbotron-fluid">
  <div className="container">
    <h1 className="display-4">Register Here</h1>
      </div>
</div>



<form onSubmit={this.submithandler}>

<div className="form-group">
    <label htmlFor="name">Name</label>
    <input 
    type="name" 
    className="form-control" 
    id="name" 
    aria-describedby="nameHelp" 
    placeholder="Enter name"
    name="name"
    onChange={this.changeHandler}
    
    />
    
  </div>


  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" 
    className="form-control" 
    id="exampleInputEmail1" 
    aria-describedby="emailHelp" 
    placeholder="Enter email"  
    name="email"
    onChange={this.changeHandler}
    />
    
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="password" 
    placeholder="Password"
    name="password"
    onChange={this.changeHandler}
    />
  </div>

  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Confiremd Password</label>
    <input type="password" className="form-control" id="confirmedPassword" 
    placeholder="Password"
    name="confirmedPassword" 
    onChange={this.changeHandler}
    />
  </div>

  <Link className="nav-link" to="/login">Have account? Login</Link>

  
  <button type="submit" className="btn btn-primary" onSubmit={this.submithandler} >Submit</button>
</form>



                
            </div>
        );
    }
}

const mapStateToProps =state=>({
  auth: state.auth
})

export default connect(mapStateToProps,{register})(Register);