

import React, { Component } from 'react';
import {connect} from 'react-redux';



class Home extends Component {
    render() {
        return (
            <div>
                 
                {this.props.auth.isAuthenticated}
                {this.props.auth.user.name}
                Balance: ${this.props.auth.user.balance}
                
            </div>
        );
    }
}


const mapStateToProps =state=>({
    auth: state.auth
  })
  
  export default connect(mapStateToProps)(Home);