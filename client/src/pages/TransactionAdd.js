import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTransactions } from '../store/actions/transcationAction';

import AddCommentIcon from '@material-ui/icons/AddComment';
import SendIcon from '@material-ui/icons/Send';
class TransactionAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      note: '',
      type: '',
      email: '',
      password: '',
      x: '---hhhhhh--'
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitTransButton = this.submitTransButton.bind(this);

    this.abc = this.abc.bind(this);

  }
  abc = (event) => {
    this.setState({ x: "modal" });
  }

  handleChange = (event) => {
    this.setState({ type: event.target.value });

  }


  changeHandler2 = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
    const user = JSON.parse(localStorage.getItem('userBackUp'));

    this.setState({
      email: user.email,
      password: user.password
    })
  }

  submitTransButton = (event) => {
    event.preventDefault();

    let email = this.state.email;
    let password = this.state.password;
    let amount = this.state.amount;
    let note = this.state.note;
    let type = this.state.type;

    console.log(this.props.history);

    this.props.addTransactions({ amount, note, type, email, password }, this.props.history);

  }

  render() {
    let { auth, transactions } = this.props;



    return (
      <div>

        <div>

          <p>

            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2">
              Add Expense<SendIcon />
            </button>
          </p>
          <div class="collapse" id="collapseExample2">
            <div class="card card-body">


              <form onSubmit={this.submitTransButton}>

                <div class="form-group">
                  <label for="exampleInputEmail1">Amount</label>
                  <input type="name" className="form-control" name='amount' id="amount"

                    onChange={this.changeHandler2}
                  />
                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>



                <div class="input-group mb-3">
                  <select value={this.state.value} onChange={this.handleChange} class="custom-select" id="inputGroupSelect01">
                    <option selected>Type</option>
                    <option value="income"
                      name='type'
                    >income</option>
                    <option value="expense"
                      name='type'
                    >expense</option>
                  </select>
                </div>

                <button type="submit" class="btn btn-primary"
                  onSubmit={this.submitTransButton}
                /* data-dismiss="modal" */
                >Add</button>
              </form>
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
export default connect(mapStateToProps, { addTransactions })(TransactionAdd);