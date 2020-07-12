

import React, { Component } from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
                 
                


<div class="jumbotron">
  <h1 class="display-4">Hello {this.props.auth.user.name}!</h1>
  <p class="lead">Welcome to money mexpense tracking app</p>
  <hr class="my-4"/>
  <p>It serves you to keep a view over your expense and income.</p>

  
  {
      this.props.auth.user.name ?
<div>
<p class="lead"> df</p>
<p class="lead">
  <Link class="btn btn-primary btn-lg" to="/dashboard" role="button">Your Dashboard</Link>
</p>

</div>
  :

  <div>

 <p class="lead">
  <Link class="btn btn-primary btn-lg" to="/register" role="button">Register Here</Link>
</p>

<p class="lead">
  <Link class="btn btn-primary btn-lg" to="/login" role="button">Login </Link>
</p>
</div>  



    }

</div>


                
            </div>
        );
    }
}


const mapStateToProps =state=>({
    auth: state.auth
  })
  
  export default connect(mapStateToProps)(Home);