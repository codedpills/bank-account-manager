import React, { useEffect } from "react";
import { connect } from "react-redux";
import AccountInfo from "./AccountInfo";
import { deleteAccount } from "../store/accountActions";
import fetchAccounts from "../store/fetchAccounts";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const BankAccounts = ({
  accounts,
  pending,
  error,
  fetchAccounts,
  deleteAccount,
}) => {
  useEffect(() => {
    fetchAccounts();
  },[]);
  let bankAccounts;
  if (accounts.legnth === 0) {
    return (bankAccounts = <p>There are no accounts yet. Add some!</p>);
  }
  bankAccounts = accounts.map((account) => {
    return (
      <div className="column is-4" key={account._id}>
        <AccountInfo
          id={account._id}
          account_type={account.accountType}
          account_name={account.accountName}
          account_number={account.accountNumber}
          bank_name={account.bankName}
          bank_branch={account.bankBranch}
          deleteAccount={deleteAccount}
        />
      </div>
    );
  });
  const loader = (
    <div className="has-text-centered" style={{"marginTop": "3rem"}}>
      <Loader
        type="Oval"
        color="rgba(139, 137, 137, 0.7)"
        height={50}
        width={50}
      />
    </div>
  );
  if (pending === true) return loader;
  console.log(error);
  return (
    <div className="container bank-accounts-container">
      <div className="columns" style={{ flexWrap: "wrap" }}>
        {error && <div className="has-text-centered">{error}</div>}
        {bankAccounts}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  accounts: state.accounts,
  pending: state.pending,
  error: state.error,
});

const mapDispatchToProps = {
  deleteAccount,
  fetchAccounts,
};

export default connect(mapStateToProps, mapDispatchToProps)(BankAccounts);
