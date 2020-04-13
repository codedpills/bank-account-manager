import React, { Component } from "react";
import { connect } from "react-redux";
import { asyncEditAccount } from "../store/asyncAccountActions";

class EditAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountName: props.account.accountName,
      accountNumber: props.account.accountNumber,
      accountType: props.account.accountType,
      bankName: props.account.bankName,
      bankBranch: props.account.bankBranch,
    };
    this.id = props.match.params.id;
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.asyncEditAccount(this.id, this.state, () => {
      this.props.history.goBack();
    });
    this.setState({
      accountName: "",
      accountNumber: "",
      accountType: "",
      bankName: "",
      bankBranch: "",
    });
  };
  handleGoBack = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="container add-account-container">
        <div className="columns">
          <div className="column is-6 is-offset-3">
            <h4 className="has-text-centered is-size-4">
              UPDATE ACCOUNT INFORMATION
            </h4>
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Bank name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter bank name e.g. UniBank"
                    name="bankName"
                    onChange={this.handleChange}
                    value={this.state.bankName}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Bank branch</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter bank branch e.g. Accra main"
                    name="bankBranch"
                    onChange={this.handleChange}
                    value={this.state.bankBranch}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Account name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter account name e.g. Kwame Lewis"
                    name="accountName"
                    onChange={this.handleChange}
                    value={this.state.accountName}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Account number</label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    minLength={12}
                    maxLength={12}
                    placeholder="Enter account number e.g. 123456789102"
                    name="accountNumber"
                    onChange={this.handleChange}
                    value={this.state.accountNumber}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Account type</label>
                <div className="control">
                  <div className="select">
                    <select
                      name="accountType"
                      onChange={this.handleChange}
                      value={this.state.accountType}
                    >
                      <option value="Savings">Select account type</option>
                      <option value="Savings">Savings</option>
                      <option value="Current">Current</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control">
                  <button
                    onClick={this.handleSubmit}
                    type="submit"
                    className="button is-danger"
                  >
                    Update
                  </button>
                </div>
                <div className="control">
                  <button
                    onClick={this.handleGoBack}
                    className="button is-danger is-light"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  account: state.accounts.find(
    (account) => account._id === ownProps.match.params.id
  ),
});

const mapDispatchToProps = {
  asyncEditAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);
