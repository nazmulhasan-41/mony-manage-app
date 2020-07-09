import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../store/actions/authActions';
import { loadTransactions,deleteTransaction } from '../store/actions/transcationAction';
import TransactionAdd from './TransactionAdd';

import history from './history'

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
                {auth.user.email}
                {auth.user.password}

                <TransactionAdd history={this.props.history}/>


                { transactions.length!==0 ?
                    transactions.map((t) => (

                        <ul key={t._id} class="list-group list-group-horizontal">
                            <li className="list-group-item">{t.type}</li>
                            <li className="list-group-item">{t.amount}</li>
                            <li className="list-group-item">{t.updatedAt}</li>
                            
                            <button type="button" class="btn btn-primary" 
                            onClick={()=> this.props.deleteTransaction(t._id)}
                            >delete</button>


                        </ul>
                    ))
                    :
                    <h1>no data added</h1>
                }

            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    transactions: state.transactions
})
export default connect(mapStateToProps, { loadTransactions,deleteTransaction, login })(Dashboard);