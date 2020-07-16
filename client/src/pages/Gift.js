import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../store/actions/authActions';
import { loadTransactions, deleteTransaction } from '../store/actions/transcationAction';
import SendMoney from './SendMoney';
import { Redirect } from 'react-router';

import Login from './Login';

class Gift extends Component {
  state = {
    email: '',
    password: '',
    show: false
  }

  componentDidMount() {

        this.props.loadTransactions();
      }

    

  render() {
    let { auth, transactions } = this.props
    return (
      <div>

        {
          JSON.parse(localStorage.getItem('logBackUp')) ?
          <Redirect to='/' />
          :



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

              <nav class="navbar navbar-dark bg-primary">
                Sent
              </nav>

              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Amount</th>
                    <th scope="col">To</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>

                  {transactions.length === undefined ?
                    <h1></h1>
                    :
                    transactions.map((t) => (
                      t.type === 'sent' ?
                        <tr>
                          <th scope="row"></th>
                          <td>{t.amount}</td>
                          <td>{t.to}</td>
                          <td>{t.updatedAt}</td>
                        </tr>

                        :
                        <h1></h1>
                    ))

                  }

                </tbody>
              </table>
            </div>




            <div class="col-sm">

              <nav class="navbar navbar-dark bg-primary">
                Received
</nav>

              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Amount</th>
                    <th scope="col">From</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>

                  {transactions.length !== undefined ?
                    transactions.map((t) => (
                      t.type === 'receive' ?
                        <tr>
                          <th scope="row"></th>
                          <td>{t.amount}</td>
                          <td>{t.from}</td>
                          <td>{t.updatedAt}</td>
                        </tr>

                        :
                        <h1></h1>
                    ))
                    :
                    <h1></h1>
                  }

                </tbody>
              </table>
            </div>


            <div class="col-sm">

              <SendMoney history={this.props.history} />
            </div>

          </div>
        </div>


</div>






          
          
        }

        


      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  transactions: state.transactions
})
export default connect(mapStateToProps, { loadTransactions, deleteTransaction, login })(Gift);