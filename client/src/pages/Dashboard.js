import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../store/actions/authActions';
import { loadTransactions,deleteTransaction } from '../store/actions/transcationAction';
import TransactionAdd from './TransactionAdd';

import history from './history'
import SendMoney from './SendMoney';


import DeleteIcon from '@material-ui/icons/Delete';

class Dashboard extends Component {
    state = {
        email: '',
        password: '',
        show:false
    }

    componentDidMount() {

        this.props.loadTransactions();
    }

    render() {
        let { auth, transactions } = this.props
        return (
            <div>

<div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">{auth.user.email}</h1>
    <p class="lead"> Balance: ${this.props.auth.user.balance}</p>
  </div>
</div>


            
<div class="container">
  <div class="row">
   
    <div class="col-sm">


    <TransactionAdd history={this.props.history}/>





    <table class="table table-hover table-dark">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Amount</th>
      <th scope="col">Date</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>

{ transactions.length!==0 ?
    transactions.map((t) => (


        <tr>
      <th scope="row">{t.type}</th>
      <td>{t.amount}</td>
      <td>{t.updatedAt}</td>
      <td>
          <button type="button" class="btn btn-primary" 
            onClick={()=> this.props.deleteTransaction(t._id)}
            >
                <DeleteIcon/>
                
              </button>
    </td>
    </tr>
    
 

      /*   <ul key={t._id} class="list-group list-group-horizontal">
            <li className="list-group-item">{t.type}</li>
            <li className="list-group-item">{t.amount}</li>
            <li className="list-group-item">{t.updatedAt}</li>
            
            <button type="button" class="btn btn-primary" 
            onClick={()=> this.props.deleteTransaction(t._id)}
            >delete</button>


        </ul> */
    ))
    :
    <div>no data </div>
}

</tbody>
</table>




    </div>


    <div class="col-sm">
      
    

    <SendMoney history={this.props.history}/> 


    </div>
    
  </div>
</div>

    
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    transactions: state.transactions
})
export default connect(mapStateToProps, { loadTransactions,deleteTransaction, login })(Dashboard);