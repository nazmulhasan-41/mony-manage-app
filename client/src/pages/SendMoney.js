import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTransactions,giftSend } from '../store/actions/transcationAction';


import SendIcon from '@material-ui/icons/Send';


class SendMoney extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            rec_email: '',
            send_email: JSON.parse(localStorage.getItem('userBackUp')).email
        };
        this.submitTransButton = this.submitTransButton.bind(this);
        this.changeHandler2 = this.changeHandler2.bind(this);

    }

    changeHandler2 = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitTransButton = (event) => {
        event.preventDefault();
        let rec_email = this.state.rec_email;
        let send_email = this.state.send_email;
        let balance = this.state.amount;
        this.props.giftSend({ balance,rec_email,send_email }, this.props.history);
    }

    render() {
        let { auth, transactions } = this.props;

        return (
            <div>

            <p>
                    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        Send Gift <SendIcon/>
                    </button>
                </p>
                <div class="collapse" id="collapseExample">
                    <div class="card card-body">


                        <form onSubmit={this.submitTransButton}>

                            <div class="form-group">
                                <label for="exampleInputEmail1">Amount</label>
                                <input type="name" className="form-control" name='amount' id="amount"

                                    onChange={this.changeHandler2}
                                />
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>


                            <div class="form-group">
                                <label for="exampleInputPassword1">receiver Email</label>
                                <input type="name" class="form-control" id="note"
                                    name='rec_email'
                                    onChange={this.changeHandler2}
                                />
                            </div>


                            <button type="submit" class="btn btn-primary"
                                onSubmit={this.submitTransButton}
                            /* data-dismiss="modal" */
                            >Send Gift </button>
                        </form>

                    </div>
                </div>



                {/* //--------------------------------------------------------- */}




            </div>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth,
    transactions: state.transactions
})
export default connect(mapStateToProps, { addTransactions ,giftSend})(SendMoney);